import { useState, useEffect, useRef } from 'react';
import { MessageCircle, Send, Paperclip, Phone, Mail, Clock, Users, HelpCircle, X, Check, Image as ImageIcon, FileText as FileTextIcon, Loader2 } from 'lucide-react';

interface Message {
  id: number;
  sender: 'agent' | 'customer';
  name?: string;
  message: string;
  timestamp: string;
  attachment?: {
    name: string;
    type: string;
    size: string;
  };
}

const initialMessages: Message[] = [
  {
    id: 1,
    sender: 'agent',
    name: 'Sarah Johnson',
    message: 'Hello! I\'m Sarah from the Aftermarket Support Team. How can I help you today?',
    timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
  },
];

const agentResponses = [
  "I'd be happy to help with that! Could you provide me with more details?",
  "Let me check that information for you. One moment please.",
  "I've found your account information. What specific question do you have?",
  "That's a great question! Here's what I can tell you...",
  "I've escalated this to our technical team. They'll get back to you within 2 hours.",
  "Is there anything else I can help you with today?",
  "I understand your concern. Let me look into that for you right away.",
  "Thank you for your patience! I have the information you requested.",
];

const faqs = [
  {
    id: 1,
    question: 'How do I track my order?',
    answer: 'You can track your order by going to "My Orders" section and clicking on the order number. You\'ll see real-time tracking information.',
  },
  {
    id: 2,
    question: 'What is the warranty period for parts?',
    answer: 'Standard parts come with a 12-month warranty. Extended warranty options are available for purchase.',
  },
  {
    id: 3,
    question: 'How quickly can I get emergency service?',
    answer: 'Emergency service response times vary by your service agreement. Platinum members receive 4-hour response, Gold members 8-hour response.',
  },
  {
    id: 4,
    question: 'Can I reschedule a maintenance appointment?',
    answer: 'Yes, you can reschedule appointments up to 24 hours before the scheduled time through the customer portal or by contacting support.',
  },
];

export default function CustomerSupport() {
  const [chatActive, setChatActive] = useState(false);
  const [messageInput, setMessageInput] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [loading, setLoading] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  const sendMessage = () => {
    if (messageInput.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        sender: 'customer',
        message: messageInput,
        timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
      };
      setMessages([...messages, newMessage]);
      setMessageInput('');
      setLoading(true);
      setTimeout(() => {
        const agentResponse = agentResponses[Math.floor(Math.random() * agentResponses.length)];
        const agentMessage: Message = {
          id: messages.length + 2,
          sender: 'agent',
          name: 'Sarah Johnson',
          message: agentResponse,
          timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
        };
        setMessages([...messages, newMessage, agentMessage]);
        setLoading(false);
      }, 1000);
    }
  };

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="h-[calc(100vh-64px)] overflow-y-auto bg-[#F5F6F8]">
      <div className="max-w-[1600px] mx-auto px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-1">
            Live Support
          </h1>
          <p className="text-sm text-gray-500">
            Get instant help from our support team
          </p>
        </div>

        {/* Support Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <MessageCircle className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Live Chat</h3>
            <p className="text-sm text-gray-600 mb-4">
              Chat with our support team in real-time
            </p>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-green-600 font-medium">Available Now</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Phone className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Phone Support</h3>
            <p className="text-sm text-gray-600 mb-2">
              Call us at: <span className="font-semibold">1-800-SERVICE</span>
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              <span>24/7 Available</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <Mail className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Email Support</h3>
            <p className="text-sm text-gray-600 mb-2">
              <span className="font-medium">support@aftermarket.com</span>
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              <span>Response in 2-4 hours</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Live Chat */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden" style={{ height: '600px' }}>
              {!chatActive ? (
                <div className="h-full flex flex-col items-center justify-center p-8 text-center">
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                    <MessageCircle className="w-10 h-10 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Start a Conversation</h3>
                  <p className="text-sm text-gray-600 mb-6 max-w-md">
                    Our support team is online and ready to help you with any questions
                  </p>
                  <button
                    onClick={() => setChatActive(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-[#C8102E] text-white rounded-lg hover:bg-[#A00D25] transition-colors font-medium"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Start Chat
                  </button>
                  <div className="mt-8 flex items-center gap-6 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>5 agents online</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>Avg wait: &lt; 1 min</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col">
                  {/* Chat Header */}
                  <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#C8102E] rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold text-sm">SJ</span>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">Sarah Johnson</p>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-xs text-gray-600">Online</span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => setChatActive(false)}
                        className="text-sm font-medium text-gray-600 hover:text-gray-900"
                      >
                        End Chat
                      </button>
                    </div>
                  </div>

                  {/* Chat Messages */}
                  <div className="flex-1 overflow-y-auto p-6 space-y-4" ref={chatRef}>
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.sender === 'customer' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-[70%] ${msg.sender === 'customer' ? 'order-2' : 'order-1'}`}>
                          {msg.sender === 'agent' && (
                            <p className="text-xs text-gray-600 mb-1">{msg.name}</p>
                          )}
                          <div
                            className={`rounded-lg px-4 py-3 ${
                              msg.sender === 'customer'
                                ? 'bg-[#C8102E] text-white'
                                : 'bg-gray-100 text-gray-900'
                            }`}
                          >
                            <p className="text-sm">{msg.message}</p>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">{msg.timestamp}</p>
                        </div>
                      </div>
                    ))}
                    {loading && (
                      <div className="flex justify-start">
                        <div className="max-w-[70%] order-1">
                          <div className="rounded-lg px-4 py-3 bg-gray-100 text-gray-900">
                            <p className="text-sm flex items-center">
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              Sarah Johnson is typing...
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Chat Input */}
                  <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                    <div className="flex items-end gap-3">
                      <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded-lg transition-colors">
                        <Paperclip className="w-5 h-5" />
                      </button>
                      <div className="flex-1">
                        <textarea
                          value={messageInput}
                          onChange={(e) => setMessageInput(e.target.value)}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault();
                              sendMessage();
                            }
                          }}
                          placeholder="Type your message..."
                          rows={1}
                          className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent resize-none"
                        />
                      </div>
                      <button
                        onClick={sendMessage}
                        className="p-2.5 bg-[#C8102E] text-white rounded-lg hover:bg-[#A00D25] transition-colors"
                      >
                        <Send className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* FAQ Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-6">
                <HelpCircle className="w-5 h-5 text-[#C8102E]" />
                <h2 className="text-lg font-semibold text-gray-900">Frequently Asked</h2>
              </div>
              
              <div className="space-y-3">
                {faqs.map((faq) => (
                  <div key={faq.id} className="border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors"
                    >
                      <p className="font-medium text-gray-900 text-sm">{faq.question}</p>
                    </button>
                    {expandedFaq === faq.id && (
                      <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
                        <p className="text-sm text-gray-700 leading-relaxed">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <button className="w-full mt-6 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium text-sm">
                View All FAQs
              </button>
            </div>

            {/* Support Hours */}
            <div className="bg-gradient-to-br from-[#C8102E] to-[#A00D25] rounded-xl shadow-sm p-6 mt-6 text-white">
              <h3 className="font-semibold mb-3">Support Hours</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-white/90">Live Chat:</span>
                  <span className="font-medium">24/7</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/90">Phone:</span>
                  <span className="font-medium">24/7</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/90">Email:</span>
                  <span className="font-medium">24/7</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-white/20">
                <p className="text-xs text-white/80">
                  Premium support members get priority responses
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}