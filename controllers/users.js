const express = require('express')
const db = require('../models')
// const user = require('../models/user')
const router = express.Router()
const cryptojs = require('crypto-js')
require('dotenv').config()
const bcrypt = require('bcrypt')
const posts = require('../models/post')
const { Sequelize } = require('sequelize');
db.sequelize.sync()

router.get('/new', (req, res)=>{
    res.render('users/new.ejs', { user: res.locals.user })
})

router.post('/', async (req, res)=>{
    const [newUser, created] = await db.user.findOrCreate({where:{email: req.body.email}})
    if(!created){
        console.log('user already exists')
		res.redirect('/users/login?message=Please log into your account to continue.')
    } else {
        const hashedPassword = bcrypt.hashSync(req.body.password, 10)
        newUser.password = hashedPassword
        await newUser.save()
        const encryptedUserId = cryptojs.AES.encrypt(newUser.id.toString(), process.env.SECRET)
        const encryptedUserIdString = encryptedUserId.toString()
        res.cookie('userId', encryptedUserIdString)
        res.redirect('/')
    }
})

router.get('/login', (req, res)=>{
	res.render('users/login.ejs', { 
		user: res.locals.user,
		message: req.query.message ? req.query.message : null
	})
})

router.get('/getAllUsers', async (req, res) => {
    const users = await db.user.findAll()
    
	res.send(users)
})


router.post('/login', async (req, res)=>{
    const user = await db.user.findOne({where: {email: req.body.email}})
	const noLoginMessage = 'Incorrect username or password'
    if(!user){
        console.log('user not found')	
		res.redirect('/users/login?message=' + noLoginMessage)
    } else if(!bcrypt.compareSync(req.body.password, user.password)) {
        console.log('password incorrect')
        res.render('users/login', { error: "Invalid email/password" })
    } else {
        console.log('logging in the user!!!')
        const encryptedUserId = cryptojs.AES.encrypt(user.id.toString(), process.env.SECRET)
        const encryptedUserIdString = encryptedUserId.toString()
        res.cookie('userId', encryptedUserIdString)
        res.redirect('/')
    }
})

router.get('/logout', (req, res)=>{
    console.log('logging out')
    res.clearCookie('userId')
    res.redirect('/')
})

router.get('/profile', async (req, res)=>{
	// if the user is not logged ... we need to redirect to the login form
    if (!res.locals.user) {
        res.redirect('/users/login?message=You must authenticate before you are authorized to view this resource.')
	} else {
        const { keywords } = req.query;
		// otherwise, show them their profile
        try {
        // Query database to search for GIFs based on keywords
            const gifs = await db.gif.findAll({
            where: {
            title: {
            [Sequelize.Op.like]: `%${keywords}%`,
            },
            },
        });
            // Fetch posts data from the database using Sequelize
            const posts = await db.post.findAll();
            // Render the "posts.ejs" template with the fetched posts data
            // Render search results in a view
            // res.render('users/profile.ejs', { gifs });
            res.render('posts/posts.ejs', { posts });
            res.render('users/profile.ejs', { user: res.locals.user })
        } catch (error) {
             // Handle error
            console.error('Error searching for GIFs:', error);
            res.status(500).json({ error: 'Internal server error' });
          }
	}
})

module.exports = router