import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Menu, X } from 'lucide-react';


import Sidebar from './components/Sidebar';
import ThemeToggle from './components/ThemeToggle';
import ChatWindow from './components/ChatWindow';
import LandingPage from './components/LandingPage';


import { ThemeProvider, useTheme } from './context/ThemeContext';
import './index.css'; 
import './App.css'; 

const BaseLayout = () => {
  const { theme } = useTheme();
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 768); 

  return (
    
    <div className={`app-container ${theme}`}> 
      
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      
      <div className="main-content-area">
        
        
        <header className="top-bar">
          <div className="header-left">
             <button 
                className="menu-button"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
                {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <h1 className="app-title">ChatApp 📝</h1>
          </div>
          <ThemeToggle />
        </header>
        
        
        <main className="main-view-container">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/chat/:sessionId" element={<ChatWindow />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <ThemeProvider>
        <BaseLayout />
      </ThemeProvider>
    </Router>
  );
};

export default App;