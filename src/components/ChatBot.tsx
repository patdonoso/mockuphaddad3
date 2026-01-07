import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: Date;
}

const botResponses: Record<string, string> = {
  hola: "¡Hola! Bienvenido a Haddad. ¿En qué puedo ayudarte hoy?",
  productos: "Tenemos una amplia variedad de productos reciclables: bidones, envases PET, artículos de jardinería, productos industriales y más. ¿Hay alguna categoría específica que te interese?",
  bidones: "Ofrecemos bidones de 5L, 10L, 20L y 25L en diferentes configuraciones. También tenemos bidones certificados para combustibles. ¿Necesitas más detalles?",
  precios: "Para ver los precios de nuestros productos, necesitas iniciar sesión o registrarte en nuestra plataforma. Es completamente gratis.",
  contacto: "Puedes contactarnos a través de nuestro formulario en línea o visitar nuestra página principal para más información de contacto.",
  envio: "Realizamos envíos a todo Chile. Los costos varían según la ubicación y cantidad. Contáctanos para una cotización personalizada.",
  default: "Gracias por tu mensaje. ¿Puedo ayudarte con información sobre nuestros productos, precios, o envíos? También puedo orientarte sobre categorías específicas como bidones, envases PET o artículos industriales."
};

const getResponse = (message: string): string => {
  const lowerMessage = message.toLowerCase();
  
  for (const [keyword, response] of Object.entries(botResponses)) {
    if (lowerMessage.includes(keyword)) {
      return response;
    }
  }
  
  return botResponses.default;
};

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: '¡Hola! Soy el asistente virtual de Haddad. ¿En qué puedo ayudarte hoy?',
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      content: inputValue,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot thinking
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const botMessage: Message = {
      id: crypto.randomUUID(),
      content: getResponse(inputValue),
      isBot: true,
      timestamp: new Date(),
    };

    setIsTyping(false);
    setMessages((prev) => [...prev, botMessage]);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-hover-haddad transition-all duration-300 ${
          isOpen ? 'rotate-0 scale-90 bg-muted' : 'gradient-haddad animate-float'
        }`}
        aria-label="Abrir chat"
      >
        {isOpen ? (
          <X className="h-6 w-6 text-foreground" />
        ) : (
          <MessageCircle className="h-6 w-6 text-primary-foreground" />
        )}
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-24 right-6 z-50 w-80 origin-bottom-right rounded-2xl border border-border/50 bg-card shadow-hover-haddad transition-all duration-300 sm:w-96 ${
          isOpen ? 'scale-100 opacity-100' : 'pointer-events-none scale-95 opacity-0'
        }`}
      >
        {/* Header */}
        <div className="gradient-haddad rounded-t-2xl p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground/20">
              <Bot className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-primary-foreground">Asistente Haddad</h3>
              <p className="text-xs text-primary-foreground/80">Siempre disponible</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="h-80 p-4" ref={scrollRef}>
          <div className="flex flex-col gap-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start gap-2 ${message.isBot ? '' : 'flex-row-reverse'}`}
              >
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                    message.isBot ? 'bg-primary/10' : 'bg-secondary'
                  }`}
                >
                  {message.isBot ? (
                    <Bot className="h-4 w-4 text-primary" />
                  ) : (
                    <User className="h-4 w-4 text-secondary-foreground" />
                  )}
                </div>
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-2 ${
                    message.isBot
                      ? 'rounded-tl-sm bg-secondary text-secondary-foreground'
                      : 'rounded-tr-sm gradient-haddad text-primary-foreground'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex items-start gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
                <div className="rounded-2xl rounded-tl-sm bg-secondary px-4 py-2">
                  <div className="flex gap-1">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-muted-foreground" />
                    <span className="h-2 w-2 animate-pulse rounded-full bg-muted-foreground" style={{ animationDelay: '0.2s' }} />
                    <span className="h-2 w-2 animate-pulse rounded-full bg-muted-foreground" style={{ animationDelay: '0.4s' }} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="border-t border-border/50 p-4">
          <div className="flex items-center gap-2">
            <Input
              ref={inputRef}
              type="text"
              placeholder="Escribe tu mensaje..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 rounded-xl border-border/50"
            />
            <Button
              size="icon"
              onClick={handleSend}
              disabled={!inputValue.trim() || isTyping}
              className="h-10 w-10 rounded-xl gradient-haddad text-primary-foreground shadow-haddad hover:opacity-90"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatBot;
