const express = require('express');
const cors = require('cors');
const { getMockSessions, getNewSessionId, getSessionHistory, getMockResponse, mockSessions, mockHistory } = require('./mockData');

const app = express();
const port = 5000;

app.use(cors()); 
app.use(express.json()); 

app.get('/api/sessions', (req, res) => {
  res.json(getMockSessions());
});

app.get('/api/new-chat', (req, res) => {
  const newId = getNewSessionId();
  mockSessions.unshift({ id: newId, title: 'New Chat' });
  mockHistory[newId] = [];
  res.json({ sessionId: newId });
});

app.get('/api/session/:id', (req, res) => {
  const sessionId = req.params.id;
  const history = getSessionHistory(sessionId);
  if (history) {
    res.json(history);
  } else {
    res.status(404).json({ error: 'Session not found' });
  }
});

app.post('/api/chat/:id', (req, res) => {
  const sessionId = req.params.id;
  const userQuestion = req.body.question;

  if (!userQuestion) {
    return res.status(400).json({ error: 'Question is required' });
  }

  const aiResponse = getMockResponse(userQuestion);

  
  if (!mockHistory[sessionId]) {
    mockHistory[sessionId] = [];
  }

  
  mockHistory[sessionId].push({
    type: 'user',
    text: userQuestion,
  });


  const aiMessage = {
    type: 'ai',
    ...aiResponse,
  };
  mockHistory[sessionId].push(aiMessage);

  
  const session = mockSessions.find(s => s.id === sessionId);
  if (session && session.title === 'New Chat') {
    session.title = userQuestion.substring(0, 30) + '...';
  }

  
  res.json(aiMessage);
});


app.post('/api/feedback/:sessionId', (req, res) => {
    const { sessionId } = req.params;
    const { messageIndex, feedback } = req.body; 

    if (mockHistory[sessionId] && mockHistory[sessionId][messageIndex] && mockHistory[sessionId][messageIndex].type === 'ai') {
        mockHistory[sessionId][messageIndex].feedback = feedback;
        return res.json({ success: true, message: 'Feedback updated' });
    }

    return res.status(404).json({ success: false, message: 'Message not found' });
});

app.listen(port, () => {
  console.log(`Backend mock server listening at http://localhost:${port}`);
});