const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const db = require('./models')
const cryptoJS = require('crypto-js')
const Gif = db.Gif;
const postController = require('./controllers/posts')


require('dotenv').config()
// MIDDLEWARE
app.set('view engine', 'ejs')
app.use(cookieParser())
app.use(express.urlencoded({extended: false}))
// AUTHENTICATION MIDDLEWARE
app.use(async (req, res, next)=>{
  if(req.cookies.userId) {
    const decryptedId = cryptoJS.AES.decrypt(req.cookies.userId, process.env.SECRET)
    const decryptedIdString = decryptedId.toString(cryptoJS.enc.Utf8)
    const user = await db.user.findByPk(decryptedIdString)
    res.locals.user = user
  } else res.locals.user = null
  next()
})
app.use(express.static(__dirname + '/public'));

// CONTROLLERS
app.use('/users', require('./controllers/users'))
// app.use('/posts', require('./controllers/posts'))

// ROUTES
app.get('/', (req, res) => {
	res.render('home', { user: res.locals.user })
})


app.get('/getAllPosts', postController.getPosts)

app.get('/create',  postController.create) 

app.get('/posts/:id',  postController.show) 

app.post('/posts/:id',  postController.update) 

app.get('/index',  postController.index) 

app.get('/posts',  postController.index) 

app.post('/posts', postController.store)

app.get('/posts/:id/edit',  postController.edit) 

// app.get('/store',  postController.store) 

app.get('/update',  postController.update) 

app.get('/destroy',  postController.destroy) 

// Fetch trending GIFs from GIPHY API
app.get('/gifs', async (req, res) => {
  try {
    const response = await fetch('https://api.giphy.com/v1/gifs/trending?api_key=UJZdaoJgztUnBDxgMi1rbL2rka5wdq9c&limit=10');
    const data = await response.json();
    const gifs = data.data.map(gif => {
      return {
        title: gif.title,
        url: gif.images.fixed_height.url
      };
    });

    // Store retrieved GIFs in database
    await Gif.bulkCreate(gifs);

    res.render('gifs', { gifs });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(3030, () => {
    console.log('the server is running!')
})

