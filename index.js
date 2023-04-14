const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const db = require('./models')
const cryptoJS = require('crypto-js')
const postController = require('./controllers/posts')
const commentController = require('./controllers/comments')
require('dotenv').config()
// MIDDLEWAREs
app.set('view engine', 'ejs')
app.use("/styles", express.static(__dirname + '/styles'));
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

// CONTROLLERS
app.use('/users', require('./controllers/users'))
// app.use('/posts', require('./controllers/posts'))

// ROUTES
app.get('/', (req, res) => {
	res.render('home', { user: res.locals.user })
})

// Create
app.post('/posts', postController.store)

// Read
app.get('/posts', postController.index) 

app.get('/posts/:id',  postController.show) 

// Update
app.post('/posts/:id', postController.update) 

// Delete
app.post('/deletePost/:id',  postController.destroy) 


// Display create form
app.get('/create', postController.create) 

// Display create form
app.get('/createPost', postController.create) 

// Display update form
app.get('/posts/:id/edit',  postController.edit) 



// ------------ Comments -----------------

// Create
app.post('/comments/:id', commentController.store)

// Read
app.get('/comments', commentController.index) 

app.get('/comments/:id',  commentController.show) 

// Delete
app.post('/deleteComment/:id',  commentController.destroy) 


// Display create form
app.get('/createComment', commentController.create) 


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

    res.render('gifs/create', { gifs });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(process.env.PORT || 3030, () => {
    console.log('the server is running!')
})

