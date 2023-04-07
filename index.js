const express = require('express');
const axios = require("axios");
const ejsLayouts = require('express-ejs-layouts');

const app = express();
const port = 8000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(ejsLayouts);

// GET / - main index of site
const options = {
    method: 'GET',
    url: 'https://workout-planner1.p.rapidapi.com/',
    params: {time: '30', muscle: 'biceps', location: 'gym', equipment: 'dumbbells'},
    headers: {
      'X-RapidAPI-Key': '8e975978damshf8798ff06478691p12c030jsn31c51d51e29c',
      'X-RapidAPI-Host': 'workout-planner1.p.rapidapi.com'
    }
  };
  
  axios.request(options).then(function (response) {
      console.log(response.data);
  }).catch(function (error) {
      console.error(error);
  });

// Imports all routes from the pokemon routes file
app.use('/pokemon', require('./controllers/pokemon'));

app.listen(port, () => {
  console.log('...listening on', port );
});



