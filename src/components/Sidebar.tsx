import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  Home, 
  User, 
  Stethoscope, 
  Bot, 
  HelpCircle, 
  Info,
  X
} from 'lucide-react';
import { Button } from './ui/button';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MenuItem {
  type: 'scroll' | 'route';
  target?: string;
  path?: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}

const menuItems: MenuItem[] = [
  { type: 'scroll', target: 'hero', icon: Home, label: 'Home' },
  { type: 'route', path: '/profile', icon: User, label: 'Profile' },
  { type: 'scroll', target: 'services', icon: Stethoscope, label: 'Services' },
  { type: 'route', path: '/chatbot', icon: Bot, label: 'AI Chatbot' },
  { type: 'scroll', target: 'faqs', icon: HelpCircle, label: 'FAQs' },
  { type: 'scroll', target: 'about', icon: Info, label: 'About' },
];

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const navigate = useNavigate();

  const handleMenuClick = (item: MenuItem) => {
    onClose();
    
    if (item.type === 'scroll') {
      // For scroll items, first navigate to home page, then scroll to section
      navigate('/');
      // Use setTimeout to ensure the page loads before scrolling
      setTimeout(() => {
        const element = document.getElementById(item.target!);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else if (item.type === 'route') {
      // Navigate to different page
      navigate(item.path!);
    }
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside 
        className={`fixed left-0 top-0 h-full w-64 bg-card border-r border-border z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold text-primary">Menu</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <nav className="p-4 space-y-2">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => handleMenuClick(item)}
              className="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors hover:bg-accent w-full text-left"
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
