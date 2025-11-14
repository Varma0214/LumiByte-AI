import React from 'react';
import { User, Cpu } from 'lucide-react';


import TableResponse from './TableResponse';
import AnswerFeedback from './AnswerFeedback';

import './ChatMessage.css'; 

const ChatMessage = ({ message, sessionId, messageIndex, onFeedbackChange }) => {
  if (message.type === 'user') {
    return (
      <div className="message-container user-message-container">
        <div className="message-bubble user-message-bubble">
            <p>{message.text}</p>
        </div>
        <User size={24} className="message-icon user-icon" />
      </div>
    );
  }

  
  return (
    <div className="message-container ai-message-container">
      <Cpu size={24} className="message-icon ai-icon" />
      <div className="message-bubble ai-message-bubble">
        
        
        <p className="ai-description">{message.description}</p>
        
       
        {message.data && <TableResponse data={message.data} />}
        
        
        <AnswerFeedback 
          sessionId={sessionId}
          messageIndex={messageIndex}
          currentFeedback={message.feedback} 
          onFeedbackChange={onFeedbackChange}
        />
      </div>
    </div>
  );
};

export default ChatMessage;