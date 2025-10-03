import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Upload, Loader2, CheckCircle2, Camera } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface PrescriptionScannerProps {
  onExtracted: (text: string) => void;
}

const PrescriptionScanner = ({ onExtracted }: PrescriptionScannerProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid File",
        description: "Please upload an image file (JPG, PNG, etc.)",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File Too Large",
        description: "Please upload an image smaller than 10MB",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsProcessing(true);

      // Create preview
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);

      // Convert to base64
      const base64Image = await convertToBase64(file);

      // Extract text using AI
      const { data, error } = await supabase.functions.invoke('extract-prescription', {
        body: { imageBase64: base64Image }
      });

      if (error) {
        if (error.message?.includes('429')) {
          toast({
            title: "Rate Limit Reached",
            description: "Please wait a moment before trying again.",
            variant: "destructive",
          });
        } else if (error.message?.includes('402')) {
          toast({
            title: "Credits Required",
            description: "Please add credits to continue using AI features.",
            variant: "destructive",
          });
        } else {
          throw error;
        }
        setPreview(null);
        return;
      }

      const extractedText = data.extractedText;
      if (extractedText) {
        toast({
          title: "Success",
          description: "Prescription scanned successfully!",
        });
        onExtracted(extractedText);
      } else {
        throw new Error('No text extracted');
      }

    } catch (error) {
      console.error('Error processing prescription:', error);
      toast({
        title: "Error",
        description: "Failed to process prescription. Please try again.",
        variant: "destructive",
      });
      setPreview(null);
    } finally {
      setIsProcessing(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <Card className="p-6 space-y-4">
      <div className="text-center space-y-2">
        <Camera className="h-12 w-12 mx-auto text-primary" />
        <h3 className="text-lg font-semibold">Prescription Scanner</h3>
        <p className="text-sm text-muted-foreground">
          Upload a clear photo of your prescription
        </p>
      </div>

      {preview && (
        <div className="relative">
          <img 
            src={preview} 
            alt="Prescription preview" 
            className="w-full rounded-lg max-h-64 object-contain"
          />
          {isProcessing && (
            <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
              <Loader2 className="h-8 w-8 text-white animate-spin" />
            </div>
          )}
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
        disabled={isProcessing}
      />

      <Button
        onClick={() => fileInputRef.current?.click()}
        disabled={isProcessing}
        className="w-full"
        size="lg"
      >
        {isProcessing ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <Upload className="mr-2 h-4 w-4" />
            Upload Prescription
          </>
        )}
      </Button>

      <p className="text-xs text-center text-muted-foreground">
        Supported formats: JPG, PNG, HEIC • Max size: 10MB
      </p>
    </Card>
  );
};

export default PrescriptionScanner;
