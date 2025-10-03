import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Calendar, 
  MessageCircle, 
  ClipboardList, 
  Stethoscope,
  FileText,
  Pill,
  Upload,
  Send,
  Loader2
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import PrescriptionScanner from './PrescriptionScanner';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const menuOptions = [
  { id: 'appointments', label: 'Book Appointments', icon: Calendar, type: 'appointment' },
  { id: 'doubts', label: 'Any Doubts', icon: MessageCircle, type: 'general' },
  { id: 'details', label: 'Appointment Details', icon: ClipboardList, type: 'general' },
  { id: 'doctors', label: 'Questions About Doctors', icon: Stethoscope, type: 'general' },
  { id: 'scanner', label: 'Prescription Scanner', icon: FileText, type: 'prescription' },
  { id: 'medicines', label: 'Medicine Uses', icon: Pill, type: 'general' },
];

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hello! May I help you? Please select an option or type your question:' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showMenu, setShowMenu] = useState(true);
  const [showScanner, setShowScanner] = useState(false);
  const [currentType, setCurrentType] = useState<string>('general');
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleMenuOption = (option: typeof menuOptions[0]) => {
    if (option.id === 'scanner') {
      setShowScanner(true);
      setShowMenu(false);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Please upload a photo of your prescription, and I\'ll extract the text for you.'
      }]);
    } else {
      setCurrentType(option.type);
      setShowMenu(false);
      const userMessage = `I want to: ${option.label}`;
      setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
      handleAIResponse([{ role: 'user', content: userMessage }], option.type);
    }
  };

  const handleAIResponse = async (chatMessages: Message[], type: string = currentType) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('health-chat', {
        body: { messages: chatMessages, type }
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
        return;
      }

      const aiMessage = data.choices?.[0]?.message?.content;
      if (aiMessage) {
        setMessages(prev => [...prev, { role: 'assistant', content: aiMessage }]);
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to get response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user' as const, content: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');

    await handleAIResponse(updatedMessages);
  };

  const handlePrescriptionExtracted = (extractedText: string) => {
    setShowScanner(false);
    const prescriptionMessage = { 
      role: 'user' as const, 
      content: `Here's my prescription:\n\n${extractedText}` 
    };
    const updatedMessages = [...messages, prescriptionMessage];
    setMessages(updatedMessages);
    setCurrentType('prescription');
    handleAIResponse(updatedMessages, 'prescription');
  };

  const resetChat = () => {
    setMessages([
      { role: 'assistant', content: 'Hello! May I help you? Please select an option or type your question:' }
    ]);
    setShowMenu(true);
    setShowScanner(false);
    setCurrentType('general');
  };

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto p-4">
      <Card className="flex-1 flex flex-col overflow-hidden shadow-lg">
        <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground p-6">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Stethoscope className="h-6 w-6" />
            Health Buddy AI
          </h1>
          <p className="text-sm opacity-90 mt-1">Your personal health assistant</p>
        </div>

        <ScrollArea className="flex-1 p-6" ref={scrollRef}>
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            ))}

            {showMenu && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
                {menuOptions.map((option) => (
                  <Button
                    key={option.id}
                    variant="outline"
                    className="h-auto py-4 px-6 justify-start hover:bg-accent hover:shadow-md transition-all"
                    onClick={() => handleMenuOption(option)}
                  >
                    <option.icon className="h-5 w-5 mr-3 text-primary" />
                    <span className="text-left">{option.label}</span>
                  </Button>
                ))}
              </div>
            )}

            {showScanner && (
              <PrescriptionScanner onExtracted={handlePrescriptionExtracted} />
            )}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-2xl px-4 py-3">
                  <Loader2 className="h-5 w-5 animate-spin text-primary" />
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="border-t p-4">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your message..."
              disabled={isLoading || showScanner}
              className="flex-1"
            />
            <Button
              onClick={handleSend}
              disabled={isLoading || !input.trim() || showScanner}
              size="icon"
              className="shrink-0"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={resetChat}
            className="w-full mt-2 text-muted-foreground"
          >
            Start New Conversation
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ChatInterface;
