import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Era } from '../types';
import { sendMessageToGemini } from '../services/geminiService';

interface ChatInterfaceProps {
  currentEra: Era;
}

interface Message {
  text: string;
  sender: 'user' | 'ai';
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ currentEra }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { text: "Greetings! Ask me anything about Seeron's work.", sender: 'ai' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setMessages(prev => [...prev, { text: userMsg, sender: 'user' }]);
    setInput('');
    setIsLoading(true);

    const aiResponse = await sendMessageToGemini(userMsg, currentEra);

    setMessages(prev => [...prev, { text: aiResponse, sender: 'ai' }]);
    setIsLoading(false);
  };

  const getThemeClasses = () => {
    switch (currentEra) {
      case Era.RETRO:
        return {
          btn: 'bg-pink-500 hover:bg-pink-600 font-[VT323] text-xl border-b-4 border-pink-800 hover:border-b-0 hover:translate-y-1',
          container: 'bg-[#5D4037] border-4 border-yellow-400 font-[VT323]',
          msgUser: 'bg-pink-500 text-white',
          msgAi: 'bg-green-600 text-white'
        };
      case Era.MODERN:
        return {
          btn: 'bg-emerald-700 hover:bg-emerald-600 font-sans border border-emerald-500 shadow-md',
          container: 'bg-zinc-900 border border-zinc-700 shadow-2xl font-sans',
          msgUser: 'bg-zinc-700 text-white',
          msgAi: 'bg-emerald-700 text-white'
        };
      case Era.FUTURE:
        return {
          btn: 'bg-cyan-900/50 hover:bg-cyan-800 border border-cyan-500 font-[Orbitron] shadow-[0_0_10px_#06b6d4]',
          container: 'bg-black/90 border border-cyan-500 shadow-[0_0_20px_rgba(0,255,255,0.2)] font-mono',
          msgUser: 'bg-cyan-900/40 text-cyan-200 border border-cyan-500/30',
          msgAi: 'bg-purple-900/40 text-purple-200 border border-purple-500/30'
        };
    }
  };

  const theme = getThemeClasses();

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 p-3 rounded-full text-white transition-all shadow-lg flex items-center gap-2 ${theme.btn}`}
      >
        {isOpen ? <X size={20} /> : <MessageSquare size={20} />}
        {!isOpen && <span className="hidden md:inline text-sm font-bold ml-1">AI Assistant</span>}
      </button>

      {/* @ts-ignore */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className={`fixed bottom-20 right-6 w-80 md:w-96 h-[400px] rounded-xl flex flex-col overflow-hidden z-50 ${theme.container}`}
          >
            {/* Header */}
            <div className="p-3 border-b border-white/10 flex items-center gap-2">
              <Bot size={18} className={currentEra === Era.RETRO ? 'text-yellow-300' : 'text-current'} />
              <span className="font-bold">SeeronAI</span>
              <div className="ml-auto text-xs opacity-70 cursor-pointer" onClick={() => setIsOpen(false)}>
                 <X size={16}/>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-2 rounded-lg text-sm ${msg.sender === 'user' ? theme.msgUser : theme.msgAi}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className={`p-2 rounded-lg text-xs opacity-70 ${theme.msgAi}`}>Thinking...</div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t border-white/10 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about my projects..."
                className="flex-1 bg-white/10 rounded px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-white/30 text-sm"
              />
              <button
                onClick={handleSend}
                disabled={isLoading}
                className="p-2 bg-white/10 hover:bg-white/20 rounded text-white transition-colors"
              >
                <Send size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatInterface;