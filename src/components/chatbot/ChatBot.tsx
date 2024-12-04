import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { MessageSquare, Send } from 'lucide-react';


const genAI = new GoogleGenerativeAI('AIzaSyCoePd4WtlyOjQ9iGndu60ol7qzqIfQ4BM'); // Replace with your API key

export const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ text: string; isBot: boolean }>>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { text: userMessage, isBot: false }]);
    setIsLoading(true);

    // Handling predefined simple responses
    const simpleResponses = {
      "hi": "Hello there!",
      "hello": "Hi! How can I assist you today?",
      "bye": "Goodbye! Feel free to ask more questions anytime.",
      "thank you": "You're welcome!",
      "sorry": "No worries at all!"
    };

    if (simpleResponses[userMessage.toLowerCase() as keyof typeof simpleResponses]) {
      setMessages(prev => [...prev, { text: simpleResponses[userMessage.toLowerCase() as keyof typeof simpleResponses], isBot: true }]);
      setIsLoading(false);
      return;
    }

    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const prompt = `Answer this medical question in 15-20 words only. Only answer if it's about medicines or diseases: ${userMessage}`;
      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();
      
      setMessages(prev => [...prev, { text, isBot: true }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        text: "I can only answer questions about medicines and diseases.", 
        isBot: true 
      }]);
    }

    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div className="bg-white rounded-lg shadow-xl w-80 h-96 flex flex-col">
          <div className="bg-primary text-white p-4 rounded-t-lg flex justify-between items-center">
            <h3 className="font-semibold">Medical Assistant</h3>
            <button onClick={() => setIsOpen(false)} className="text-white">
              ✕
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`${
                  msg.isBot
                    ? 'bg-gray-100 rounded-br-lg'
                    : 'bg-primary text-white rounded-bl-lg'
                } p-3 rounded-tl-lg rounded-tr-lg max-w-[80%] ${
                  msg.isBot ? 'mr-auto' : 'ml-auto'
                }`}
              >
                {msg.text}
              </div>
            ))}
            {isLoading && (
              <div className="bg-gray-100 p-3 rounded-lg max-w-[80%] mr-auto">
                Typing...
              </div>
            )}
          </div>

          <form onSubmit={sendMessage} className="p-4 border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about medicines..."
                className="flex-1 border rounded-md px-3 py-2 focus:outline-none focus:border-primary"
              />
              <button
                type="submit"
                className="bg-primary text-white p-2 rounded-md hover:bg-primary/80"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </form>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-primary text-white p-4 rounded-full shadow-lg hover:bg-primary/80"
        >
          <MessageSquare className="h-6 w-6" />
        </button>
      )}
    </div>
  );
};