const express = require('express')
const db = require('../models')
// const user = require('../models/user')
const router = express.Router();
const cryptojs = require('crypto-js');
require('dotenv').config();
const { Sequelize } = require('sequelize');

// Search GIFs
router.get('/search', async (req, res) => {
    try {
      const { query } = req.query;
      const apiKey = "UJZdaoJgztUnBDxgMi1rbL2rka5wdq9c";
  
      // Make API request to Giphy
      const response = await axios.get(`https://api.giphy.com/v1/gifs/search`, {
        params: {
          api_key: apiKey,
          q: query,
        },
      });
  
      // Extract relevant data from API response
      const gifs = response.data.data.map((gif) => {
        return {
          title: gif.title,
          url: gif.images.fixed_height.url,
        };
      });
      // Store the search results in the database
      await db.gif.bulkCreate(gifs);
  
      res.render('gifs/search', { gifs });
    } catch (error) {
      console.error(error);
      res.status(500).render({ message: 'Internal server error' });
    }
  });
  

  module.exports = router