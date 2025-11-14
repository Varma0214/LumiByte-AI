import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from 'lucide-react';


import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';

import './ChatMessage.css'; 

const API_BASE_URL = 'http://localhost:5000/api';

const ChatWindow = () => {
  const { sessionId } = useParams();
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);

  const fetchHistory = async (id) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/session/${id}`);
      
      if (!response.ok) {
        throw new Error(`Failed to load history: HTTP status ${response.status}`);
      }

      const history = await response.json();
      setMessages(history);
    } catch (error) {
      console.error('Error fetching chat history:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (sessionId) {
      fetchHistory(sessionId);
    }
  }, [sessionId]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);


  const handleSend = async (question) => {
    const newUserMessage = { type: 'user', text: question };
    const newMessages = [...messages, newUserMessage];
    setMessages(newMessages);

    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/chat/${sessionId}`, { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
      });
      
      if (!response.ok) {
         throw new Error(`API call failed with status ${response.status}. Check backend routing.`);
      }

      const aiResponse = await response.json();
      
      
      setMessages([...newMessages, aiResponse]); 

    } catch (error) {
      console.error('Error sending message:', error);
      
      const failureMessage = error.message.includes('404') 
          ? 'Error: Server route not found. Check your backend/Express server.'
          : `Error connecting to the AI service: ${error.message}`;

      setMessages([...newMessages, { type: 'ai', description: failureMessage, data: null, feedback: 0 }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFeedbackChange = (messageIndex, newFeedback) => {
    setMessages(prevMessages => 
        prevMessages.map((msg, index) => 
            index === messageIndex ? { ...msg, feedback: newFeedback } : msg
        )
    );
  };

  return (
    <div className="chat-window-container">
      
      <div 
        ref={scrollRef} 
        className="messages-display-area"
      >
        {messages.map((message, index) => (
          <ChatMessage 
            key={index} 
            message={message} 
            sessionId={sessionId}
            messageIndex={index} 
            onFeedbackChange={handleFeedbackChange}
          />
        ))}
        {isLoading && (
          <div className="loading-state">
            <Loader size={24} />
            <span className="ml-2 opacity-75">Thinking...</span>
          </div>
        )}
      </div>

      
      <ChatInput onSend={handleSend} isLoading={isLoading} />
    </div>
  );
};

export default ChatWindow;