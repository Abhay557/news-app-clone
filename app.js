require('dotenv').config();
const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
5
const NEWS_API_URL = `https://random-api-xyz.onrender.com/api/news/news?topic=`;

// Routes
app.get('/', async (req, res) => {
  try {
    const topic = req.query.topic ;
    const response = await axios.get( {
      params: {
        topic: topic,
      },
    });

    res.render('index', { articles: response.data.articles, country });
  } catch (error) {
    res.status(500).send('Error fetching news');
  }
});

// Server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
