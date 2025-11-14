import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { MessageCircle, PlusCircle, User, LogOut, X } from 'lucide-react';
import './Sidebar.css'; 

const API_BASE_URL = 'http://localhost:5000/api';

const Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { sessionId } = useParams();
  const [sessions, setSessions] = useState([]);

  const fetchSessions = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/sessions`);
      const data = await response.json();
      setSessions(data);
    } catch (error) {
      console.error('Error fetching sessions:', error);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, [sessionId]); 

  const handleNewChat = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/new-chat`);
      const data = await response.json();
      if (data.sessionId) {
        navigate(`/chat/${data.sessionId}`);
        if(window.innerWidth < 768) {
             onClose(); 
        }
        fetchSessions(); 
      }
    } catch (error) {
      console.error('Error starting new chat:', error);
    }
  };

  const baseClasses = `sidebar-panel`;
  const mobileClasses = isOpen ? 'sidebar-open' : 'sidebar-closed';

  return (
    <div className={`${baseClasses} ${mobileClasses}`}>
      <div className="sidebar-header">
        <h2 className="sidebar-title">Sessions</h2>
        <button className="sidebar-close-button" onClick={onClose}>
            <X size={20} />
        </button>
      </div>

      
      <button onClick={handleNewChat} className="sidebar-new-chat-btn">
        <PlusCircle size={20} />
        <span className="font-semibold">New Chat</span>
      </button>

      
      <div className="session-list">
        {sessions.length > 0 ? (
          sessions.map((session) => (
            <Link
              key={session.id}
              to={`/chat/${session.id}`}
              className={`session-item ${session.id === sessionId ? 'session-active' : ''}`}
              onClick={onClose} 
            >
              <MessageCircle size={16} />
              <span title={session.title}>{session.title}</span>
            </Link>
          ))
        ) : (
          <p className="no-sessions">No sessions yet.</p>
        )}
      </div>

      
      <div className="user-info-section">
        <div className="user-details">
          <User size={24} className="user-icon" />
          <div>
            <p className="user-name">User Name</p>
            <p className="user-email">user@example.com</p>
          </div>
        </div>
        <button className="sign-out-btn">
            <LogOut size={16} />
            <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;