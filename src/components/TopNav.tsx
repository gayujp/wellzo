import { useState } from 'react';
import { Menu, Phone, User, LogOut } from 'lucide-react';
import { Button } from './ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Avatar, AvatarFallback } from './ui/avatar';

interface User {
  username: string;
  isAuthenticated: boolean;
}

interface TopNavProps {
  onMenuClick: () => void;
  user: User | null;
  onLogout: () => void;
}

const TopNav = ({ onMenuClick, user, onLogout }: TopNavProps) => {
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
          <div className="h-10 w-10 rounded-full overflow-hidden">
            <img 
              src="/assets/logo.png" 
              alt="Wellzo Logo" 
              className="w-full h-full object-cover"
            />
          </div>
          <span className="font-bold text-lg hidden sm:block">Wellzo</span>
        </div>

        {/* Right: User Menu, Language & SOS */}
        <div className="flex items-center gap-2">
          {/* User Menu */}
          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {user.username.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium">{user.username}</p>
                    <p className="w-[200px] truncate text-sm text-muted-foreground">
                      Healthcare User
                    </p>
                  </div>
                </div>
                <DropdownMenuItem onClick={onLogout} className="cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

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
