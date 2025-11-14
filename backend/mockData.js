const { v4: uuidv4 } = require('uuid');

const mockSessions = [
  { id: 'sess_abc123', title: 'Q1 Sales Data' },
  { id: 'sess_def456', title: 'Hiring Metrics' },
  { id: 'sess_ghi789', title: 'Product Inventory Report' },
];

const mockHistory = {
  'sess_abc123': [
    { type: 'user', text: 'What were the top 3 best-selling products in Q1?' },
    {
      type: 'ai',
      description: 'Based on Q1 sales data, here is the performance of the top three products. The analysis indicates strong performance in the electronics category.',
      data: {
        headers: ['Rank', 'Product Name', 'Total Revenue', 'Units Sold'],
        rows: [
          [1, 'Quantum Laptop', '$1,200,000', '1000'],
          [2, 'Aura Headphones', '$750,000', '5000'],
          [3, 'Neo Smartwatch', '$400,000', '8000'],
        ],
      },
      feedback: 0, 
    },
    { type: 'user', text: 'Can I see the total sales by region?' },
    {
      type: 'ai',
      description: 'The regional breakdown shows North America leading in sales, followed closely by Europe. Asia-Pacific is an emerging market.',
      data: {
        headers: ['Region', 'Total Sales ($)', 'Growth Rate (%)'],
        rows: [
          ['North America', '5,500,000', '15.2'],
          ['Europe', '4,800,000', '12.1'],
          ['Asia-Pacific', '3,100,000', '25.9'],
        ],
      },
      feedback: 1,
    },
  ],
  'sess_def456': [
    { type: 'user', text: 'Compare hiring rates for engineering vs marketing.' },
    {
      type: 'ai',
      description: 'Here is the comparative hiring data for the last six months. The Engineering department had a higher number of hires but a slightly longer time-to-hire.',
      data: {
        headers: ['Department', 'Hires (6 mos)', 'Time-to-Hire (days)'],
        rows: [
          ['Engineering', '25', '45'],
          ['Marketing', '18', '32'],
          ['Sales', '12', '40'],
        ],
      },
      feedback: -1,
    },
  ],
};

const getNewSessionId = () => `sess_${uuidv4().substring(0, 8)}`;

const getMockSessions = () => mockSessions;

const getSessionHistory = (id) => {
  return mockHistory[id] || [];
};

const getMockResponse = (question) => {
  
  if (question.toLowerCase().includes('product') || question.toLowerCase().includes('sales')) {
    return {
      description: 'Here is the sales performance report for the top 5 requested items. The data is up-to-date as of this week.',
      data: {
        headers: ['Item Code', 'Item Name', 'Stock Level', 'Price ($)', 'Last 7 Day Sales'],
        rows: [
          ['P001', 'Ergonomic Mouse', '450', '25.99', '120'],
          ['P002', '4K Monitor', '120', '399.99', '55'],
          ['P003', 'Mechanical Keyboard', '300', '110.50', '80'],
          ['P004', 'Webcam Pro', '600', '79.99', '150'],
          ['P005', 'USB Hub 3.0', '900', '19.99', '210'],
        ],
      },
      feedback: 0,
    };
  } else if (question.toLowerCase().includes('team') || question.toLowerCase().includes('hr')) {
    return {
      description: 'The HR system returned the following employee breakdown by team and location. The total headcount is 250.',
      data: {
        headers: ['Team', 'Headcount', 'Avg. Tenure (Yrs)', 'Location'],
        rows: [
          ['Development', '100', '3.5', 'Remote'],
          ['Design', '30', '4.1', 'HQ'],
          ['Support', '70', '2.8', 'Remote'],
          ['Finance', '50', '5.0', 'HQ'],
        ],
      },
      feedback: 0,
    };
  } else {
    return {
      description: 'I found the following general data related to your query. This table outlines standard project management metrics.',
      data: {
        headers: ['Project Name', 'Status', 'Start Date', 'Budget ($)'],
        rows: [
          ['Project Alpha', 'In Progress', '2025-01-15', '150,000'],
          ['Project Beta', 'Completed', '2024-11-01', '80,000'],
          ['Project Gamma', 'On Hold', '2025-05-20', '200,000'],
        ],
      },
      feedback: 0,
    };
  }
};

module.exports = {
  getMockSessions,
  getNewSessionId,
  getSessionHistory,
  getMockResponse,
  mockSessions,
  mockHistory,
};