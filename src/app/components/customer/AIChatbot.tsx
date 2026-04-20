import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Sparkles, Package, Wrench, AlertCircle, ChevronRight, Plus } from 'lucide-react';
import { useNavigate } from 'react-router';

interface Message {
  id: string;
  type: 'bot' | 'user';
  content: string;
  timestamp: Date;
  actions?: { label: string; onClick: () => void }[];
  data?: any;
}

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: 'Hi! I\'m your Dynapac AI Assistant. I can help you track orders, find spare parts, or troubleshoot equipment issues. What can I help you with today?',
      timestamp: new Date(),
      actions: [
        { label: 'Track an Order', onClick: () => handleQuickAction('track order') },
        { label: 'Parts Support', onClick: () => handleQuickAction('parts') },
        { label: 'Report an Issue', onClick: () => handleQuickAction('report') },
      ]
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleQuickAction = (action: string) => {
    let userMsg = '';
    if (action === 'track order') userMsg = 'I want to track my order';
    if (action === 'parts') userMsg = 'I need help with spare parts';
    if (action === 'report') userMsg = 'I want to report a technical issue';
    
    handleSend(userMsg);
  };

  const simulateResponse = (query: string) => {
    setIsTyping(true);
    
    setTimeout(() => {
      let response: Partial<Message> = {
        type: 'bot',
        timestamp: new Date(),
      };

      const q = query.toLowerCase();

      if (q.includes('order') || q.includes('track')) {
        if (q.match(/\d+/)) {
          const orderNum = q.match(/\d+/)?.[0];
          response.content = `I found order #${orderNum} in our system. Here is the current status:`;
          response.data = {
            status: 'Shipped',
            eta: 'March 24, 2026',
            carrier: 'DHL Express',
            location: 'Mainz, Germany'
          };
        } else {
          response.content = 'Please provide your 10-digit order number (e.g., 1234567890) so I can fetch the real-time status for you.';
        }
      } else if (q.includes('part') || q.includes('spare')) {
        response.content = 'I can help identify the correct part for your machine. Are you looking for a specific part number, or do you need to browse the parts catalog?';
        response.actions = [
          { label: 'Browse Catalog', onClick: () => navigate('/customer/parts-catalog') },
          { label: 'Identify via Serial #', onClick: () => {} }
        ];
      } else if (q.includes('install') || q.includes('how to')) {
        response.content = 'Based on your query, I recommend checking our "Installation & Setup" guides. This article might be exactly what you need:';
        response.actions = [
          { label: 'View Installation Guide', onClick: () => navigate('/customer/knowledge-base') }
        ];
      } else {
        response.content = 'I\'m still learning, but I can certainly help you get in touch with our support team or find a relevant guide in our Knowledge Base.';
        response.actions = [
          { label: 'Create Support Ticket', onClick: () => navigate('/customer/create-ticket') },
          { label: 'Search Knowledge Base', onClick: () => navigate('/customer/knowledge-base') }
        ];
      }

      setMessages(prev => [...prev, { id: Date.now().toString(), ...response } as Message]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSend = (text: string = input) => {
    if (!text.trim()) return;
    
    const newMsg: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: text,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMsg]);
    setInput('');
    simulateResponse(text);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-8 right-8 w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 z-50 ${
          isOpen ? 'bg-gray-900 rotate-90' : 'bg-[#C8102E] hover:scale-110 active:scale-95'
        }`}
      >
        {isOpen ? <X className="w-8 h-8 text-white" /> : <MessageCircle className="w-8 h-8 text-white" />}
        {!isOpen && (
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 border-2 border-white rounded-full"></div>
        )}
      </button>

      {/* Chat Window */}
      <div className={`fixed bottom-28 right-8 w-[420px] h-[600px] bg-white rounded-3xl shadow-2xl border border-gray-100 flex flex-col transition-all duration-500 transform z-50 origin-bottom-right ${
        isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-0 opacity-0 translate-y-20 pointer-events-none'
      }`}>
        {/* Header */}
        <div className="p-6 bg-gray-900 rounded-t-3xl text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#C8102E] rounded-xl flex items-center justify-center shadow-lg shadow-red-900/20">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold">Dynapac AI</h3>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Always Online</span>
              </div>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages Space */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth bg-gray-50/30">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] flex flex-col ${msg.type === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`p-4 rounded-2xl text-sm font-medium leading-relaxed ${
                  msg.type === 'user' 
                    ? 'bg-[#C8102E] text-white rounded-tr-none shadow-lg shadow-red-100' 
                    : 'bg-white text-gray-800 rounded-tl-none border border-gray-100 shadow-sm'
                }`}>
                  {msg.content}
                </div>
                
                {/* Embedded Data (e.g. Order Status) */}
                {msg.data && (
                  <div className="mt-3 w-full bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">
                    <div className="p-3 bg-gray-50 border-b border-gray-100 flex items-center gap-2">
                       <Package className="w-4 h-4 text-[#C8102E]" />
                       <span className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Live Integration</span>
                    </div>
                    <div className="p-4 space-y-2">
                       <div className="flex justify-between text-xs font-bold">
                         <span className="text-gray-400">STATUS</span>
                         <span className="text-green-600 uppercase tracking-tighter bg-green-50 px-1.5 rounded">{msg.data.status}</span>
                       </div>
                       <div className="flex justify-between text-xs font-bold">
                         <span className="text-gray-400">ETA</span>
                         <span className="text-gray-900">{msg.data.eta}</span>
                       </div>
                       <div className="flex justify-between text-xs font-bold">
                         <span className="text-gray-400">CARRIER</span>
                         <span className="text-blue-600 underline">{msg.data.carrier}</span>
                       </div>
                    </div>
                  </div>
                )}

                {/* Actions */}
                {msg.actions && msg.actions.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {msg.actions.map((action, i) => (
                      <button
                        key={i}
                        onClick={action.onClick}
                        className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-700 hover:border-[#C8102E] hover:text-[#C8102E] transition-all shadow-sm"
                      >
                        {action.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-100 p-4 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce delay-100"></div>
                <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-6 border-t border-gray-100 bg-white rounded-b-3xl">
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Ask me anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              className="w-full pl-4 pr-14 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-[#C8102E] transition-all"
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim()}
              className="absolute right-2 p-3 bg-[#C8102E] text-white rounded-xl hover:bg-[#A00D25] disabled:bg-gray-200 disabled:cursor-not-allowed transition-all shadow-lg shadow-red-100"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <div className="mt-4 flex items-center justify-center gap-1 opacity-50">
            <Bot className="w-3 h-3" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Powered by Dynapac Intelligence</span>
          </div>
        </div>
      </div>
    </>
  );
}
