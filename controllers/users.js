const express = require('express')
const db = require('../models')
// const user = require('../models/user')
const router = express.Router()
const cryptojs = require('crypto-js')
require('dotenv').config()
const bcrypt = require('bcrypt')
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
		// otherwise, show them their profile
        try {
            // Fetch posts data from the database using Sequelize
            const posts = await db.post.findAll();
            // Render the "posts.ejs" template with the fetched posts data
            res.render('users/profile.ejs', { user: res.locals.user, posts })
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
          }
	}
})

module.exports = router