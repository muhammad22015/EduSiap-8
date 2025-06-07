// server.js

const express = require('express');
const cors = require('cors');
const router = require('./routes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to EduSiap API 👋');
});

// API routes
app.use('/', router);

// Port config for Cloud Run
const PORT = process.env.PORT || 8080; // Cloud Run default = 8080
app.listen(PORT, () => {
  console.log(`✅ EduSiap API is running at http://localhost:${PORT}`);
});
