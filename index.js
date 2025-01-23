require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

const axios = require('axios'); // Ensure axios is imported
const NEWS_API_URL = `https://random-api-xyz.onrender.com/api/news/news?topic=`;

// Routes
app.get('/', async (req, res) => {
  try {
    const topic = req.query.topic || 'sports'; // Default topic
    const response = await axios.get(`${NEWS_API_URL}${topic}`);

    res.render('index', { articles: response.data, topic });
  } catch (error) {
    console.error('Error fetching news:', error.message); // Log the error message
    res.status(500).send('Error fetching news');
  }
});

// Server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
