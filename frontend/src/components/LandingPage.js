import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import './LandingPage.css';

const API_BASE_URL = 'http://localhost:5000/api';

const LandingPage = () => {
    const navigate = useNavigate();

    const handleNewChat = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/new-chat`);
            const data = await response.json();
            if (data.sessionId) {
                navigate(`/chat/${data.sessionId}`);
            }
        } catch (error) {
            console.error('Error starting new chat:', error);
            alert('Could not start a new chat. Check backend status.');
        }
    };

    return (
        <div className="landing-page-container">
            <MessageCircle className="landing-icon" />
            <h2 className="landing-title">Welcome to ChatApp</h2>
            <p className="landing-subtitle">Your simplified AI assistant for structured data.</p>
            <button
                onClick={handleNewChat}
                className="new-chat-button"
            >
                <MessageCircle size={20} />
                <span>Start New Chat</span>
            </button>
        </div>
    );
};

export default LandingPage;