const express = require('express');
const app = express();
const PORT = 8080;

// Main endpoint
app.get('/', (req, res) => {
    res.send('Hello World from DS2 (Node.js)! - Testing the CI/CD changes');
});

// Health check endpoint for Docker/CI-CD
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});