import { useState } from 'react';
import { Menu, Phone } from 'lucide-react';
import { Button } from './ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface TopNavProps {
  onMenuClick: () => void;
}

const TopNav = ({ onMenuClick }: TopNavProps) => {
  const [language, setLanguage] = useState('en');

  const handleSOS = () => {
    window.location.href = 'tel:112';
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-card border-b border-border z-30 px-4">
      <div className="h-full max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Menu Button */}
        <Button variant="ghost" size="icon" onClick={onMenuClick}>
          <Menu className="h-6 w-6" />
        </Button>

        {/* Center: Logo */}
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-xl">H+</span>
          </div>
          <span className="font-bold text-lg hidden sm:block">HealthCare MVP</span>
        </div>

        {/* Right: Language & SOS */}
        <div className="flex items-center gap-2">
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="w-28">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="ml">മലയാളം</SelectItem>
            </SelectContent>
          </Select>

          <Button 
            variant="destructive" 
            size="sm"
            onClick={handleSOS}
            className="gap-2"
          >
            <Phone className="h-4 w-4" />
            <span className="hidden sm:inline">SOS</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default TopNav;
