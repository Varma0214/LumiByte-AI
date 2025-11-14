import React from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import './AnswerFeedback.css';

const API_BASE_URL = 'http://localhost:5000/api';

const AnswerFeedback = ({ sessionId, messageIndex, currentFeedback, onFeedbackChange }) => {
    
    const handleFeedback = async (feedbackType) => {
        const newFeedback = currentFeedback === feedbackType ? 0 : feedbackType; 
        
        try {
            
            await fetch(`${API_BASE_URL}/feedback/${sessionId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messageIndex, feedback: newFeedback }),
            });
            onFeedbackChange(messageIndex, newFeedback); 
        } catch (error) {
            console.error('Error submitting feedback:', error);
        }
    };

    return (
        <div className="feedback-controls">
            <button 
                onClick={() => handleFeedback(1)}
                className={`feedback-button like-button ${currentFeedback === 1 ? 'active-like' : ''}`}
                title="Like"
                aria-label="Like answer"
            >
                <ThumbsUp size={16} />
            </button>
            <button 
                onClick={() => handleFeedback(-1)}
                className={`feedback-button dislike-button ${currentFeedback === -1 ? 'active-dislike' : ''}`}
                title="Dislike"
                aria-label="Dislike answer"
            >
                <ThumbsDown size={16} />
            </button>
        </div>
    );
};

export default AnswerFeedback;