"use client";

import { useState, useRef, useEffect } from "react";
import { 
  MessageCircle, 
  X, 
  Send, 
  Brain, 
  User, 
  Sparkles,
  Minimize2,
  Maximize2
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your AI Career Counselor. I can help you with career guidance, college selection, and course recommendations. What would you like to know?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const predefinedResponses = {
    greeting: [
      "Hello! I'm here to help you with your career decisions. What's on your mind?",
      "Hi there! Ready to explore your career options with AI-powered insights?",
      "Welcome! I'm your AI counselor. How can I assist you today?"
    ],
    career: [
      "Great question! Based on AI analysis, I can help you discover careers that match your interests and skills. Would you like to take our quick assessment?",
      "Career selection is crucial! Our AI considers your personality, skills, and market trends. What field interests you most?",
      "I'd love to help you find the perfect career path! Tell me about your interests and strengths."
    ],
    college: [
      "College selection made smart! Our AI analyzes 500+ colleges to find your perfect match. What's your preferred field of study?",
      "Finding the right college is important! I can help match you with institutions based on your profile. What are you looking for?",
      "Let me help you discover colleges that align with your goals! What subjects interest you most?"
    ],
    assessment: [
      "Our AI assessment is comprehensive and takes just 15 minutes! It analyzes your personality, interests, and aptitude. Ready to start?",
      "The AI assessment provides 95% accurate career recommendations! Would you like to begin your personalized evaluation?",
      "Perfect! Our assessment uses advanced AI to understand your unique profile. Shall we get started?"
    ],
    default: [
      "That's an interesting question! Our AI counselors can provide detailed guidance. Would you like to speak with a human expert?",
      "I'd be happy to help! For complex queries, I recommend our comprehensive AI assessment or speaking with our counselors.",
      "Great question! Let me connect you with the right resources. Would you prefer to take our AI assessment or schedule a consultation?"
    ]
  };

  const getAIResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return predefinedResponses.greeting[Math.floor(Math.random() * predefinedResponses.greeting.length)];
    }
    
    if (message.includes('career') || message.includes('job') || message.includes('profession')) {
      return predefinedResponses.career[Math.floor(Math.random() * predefinedResponses.career.length)];
    }
    
    if (message.includes('college') || message.includes('university') || message.includes('admission')) {
      return predefinedResponses.college[Math.floor(Math.random() * predefinedResponses.college.length)];
    }
    
    if (message.includes('assessment') || message.includes('test') || message.includes('evaluation')) {
      return predefinedResponses.assessment[Math.floor(Math.random() * predefinedResponses.assessment.length)];
    }
    
    return predefinedResponses.default[Math.floor(Math.random() * predefinedResponses.default.length)];
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(inputText),
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickActions = [
    "Take AI Assessment",
    "Find Colleges",
    "Career Guidance",
    "Talk to Expert"
  ];

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 group"
        >
          <div className="relative">
            <MessageCircle className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
              <Sparkles className="w-2 h-2 text-white" />
            </div>
          </div>
        </Button>
        
        {/* Floating tooltip */}
        <div className="absolute bottom-20 right-0 bg-white rounded-lg shadow-lg p-3 max-w-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <p className="text-sm text-gray-700 font-medium">Ask AI Counselor</p>
          <p className="text-xs text-gray-500">Get instant career guidance</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
      isMinimized ? 'w-80 h-16' : 'w-96 h-[500px]'
    }`}>
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 h-full flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-500 to-blue-600 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-white font-semibold">AI Career Counselor</h3>
              <p className="text-purple-100 text-xs">Online • Instant responses</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMinimized(!isMinimized)}
              className="text-white hover:bg-white/20 p-1 h-8 w-8"
            >
              {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 p-1 h-8 w-8"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start gap-2 max-w-[80%] ${
                    message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                  }`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.sender === 'user' 
                        ? 'bg-blue-500' 
                        : 'bg-gradient-to-r from-purple-500 to-blue-600'
                    }`}>
                      {message.sender === 'user' ? (
                        <User className="w-4 h-4 text-white" />
                      ) : (
                        <Brain className="w-4 h-4 text-white" />
                      )}
                    </div>
                    
                    <div className={`rounded-2xl p-3 ${
                      message.sender === 'user'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      <p className="text-sm">{message.text}</p>
                      <p className={`text-xs mt-1 ${
                        message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start gap-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full flex items-center justify-center">
                      <Brain className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-gray-100 rounded-2xl p-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            {messages.length === 1 && (
              <div className="px-4 pb-2">
                <p className="text-xs text-gray-500 mb-2">Quick actions:</p>
                <div className="flex flex-wrap gap-2">
                  {quickActions.map((action, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => setInputText(action)}
                      className="text-xs h-7 px-3 border-purple-200 text-purple-600 hover:bg-purple-50"
                    >
                      {action}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about careers..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputText.trim() || isTyping}
                  className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 p-0"
                >
                  <Send className="w-4 h-4 text-white" />
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};