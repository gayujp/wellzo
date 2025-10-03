import { Bot } from 'lucide-react';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';

const FloatingChatbot = () => {
  const navigate = useNavigate();

  return (
    <Button
      size="icon"
      className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50"
      onClick={() => navigate('/chatbot')}
    >
      <Bot className="h-6 w-6" />
    </Button>
  );
};

export default FloatingChatbot;
