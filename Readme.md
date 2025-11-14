# 💬 Simplified Chat Application (Frontend + Backend)

This project is a simplified version of a conversational AI interface, featuring session management, light/dark theme toggling, and structured (tabular) data responses. It uses a mock API backend, requiring no external database setup.

🚀 Tech Stack  
Frontend: React (JavaScript) for UI and routing, CSS Modules for component styling  
Backend: Node.js (Express.js) as a mock REST API server  
Tools: npm for package management

📋 Features  

Frontend (React)  
• Two-Pane Layout: Collapsible sidebar for sessions and a main chat window  
• Session Management: Lists past sessions and loads conversation history upon clicking  
• Structured Responses: Displays AI answers in an easy-to-read table view along with a text description  
• Theming: Toggle switch for Dark/Light Mode applied globally  
• Feedback: Like (👍) and Dislike (👎) buttons for each AI response  

Backend (Node.js/Express)  
• Provides mock endpoints for:  
  - Starting a new chat (/api/new-chat)  
  - Fetching session history (/api/session/:id)  
  - Generating a new response (/api/chat/:id)  
  - Updating feedback (/api/feedback/:sessionId)  
• No Database: All data is served from static JSON objects (mockData.js)

⚙️ Installation and Setup  

Prerequisites  
• Node.js (LTS recommended)  
• npm  

Step 1: Clone the Repository  
git clone [YOUR_REPOSITORY_LINK] chat-app-project  
cd chat-app-project  

Step 2: Set Up and Run the Backend (http://localhost:5000)  
cd backend  
npm install  
node server.js  
# Server running on http://localhost:5000  

Step 3: Set Up and Run the Frontend (http://localhost:3000)  
Open a new terminal:  
cd ../frontend  
npm install  
npm start  

 Usage  
1. Open http://localhost:3000  
2. Click "Start New Chat" on the landing page  
3. URL will change to /chat/sess_xxxx  
4. Type a question (e.g., "Show me the product inventory") and send  
5. Response will show descriptive text + structured table  
6. Use the top-right toggle to switch between Light and Dark mode  
7. Click any session in the sidebar to load previous chats
