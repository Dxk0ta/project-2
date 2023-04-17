const express = require("express");
const router = express();
const db = require("../models");
const axios = require("axios");
// Index - Get all posts
exports.index = async (req, res) => {
  try {
    const posts = await db.post.findAll();

    res.render('posts/posts', { posts });
  } catch (error) {
    res.status(500).send({ getAllPosts: 'An error occurred while fetching posts', error });
  }
}

// Show - Get a specific comment
exports.show = async (req, res) => {
    try {
      const post = await db.post.findByPk(req.params.id);
      const comments = await db.comment.findAll();
      // console.log(post)
      // console.log(comments)
      res.render('posts/show', { comments, post });
      
    } catch (error) {
      res.status(500).send({ error: 'An error occurred while fetching the post' });
    }
  };

  
  // Create - Render create post form
  exports.create = async (req, res) => {
    try {
      const response = await fetch(`https://api.giphy.com/v1/gifs/${process.env.API_KEY}&limit=10`);
      const data = await response.json();
      const gifs = data.data.map(gif => {
        return {
          title: gif.title,
          url: gif.images.fixed_height.url
        };
      });
      res.render('posts/create', { gifs });
    } catch(err) {
      res.send(err)
    }
  };
  
  // Store - Create a new post
  exports.store = async (req, res) => {
    try {
      const { title, content } = req.body;
      console.log({title, content})
      const posts = await db.post.create({ title, content });
      console.log('I was called')
      res.redirect(`/posts`);
    } catch (error) {
        console.log('error:  ', error)
      res.status(500).send({ error: 'An error occurred while creating the post' });
    }
  };
  
  // Edit - Render edit post form
  exports.edit = async (req, res) => {
    try {
      const posts = await db.post.findByPk(req.params.id);
      if (!posts) {
        res.status(404).send({ error: 'Post not found' });
      } else {
        res.render('posts/edit', { posts });
      }
    } catch (error) {
      res.status(500).send({ error: 'An error occurred while fetching the post' });
    }
  };
  
  // Update - Update a specific post
  exports.update = async (req, res) => {
    try {
      const { title, content } = req.body;
      const posts = await db.post.findByPk(req.params.id);
      if (!posts) {
        res.status(404).send({ error: 'Post not found' });
      } else {
        await posts.update({ title, content });
        res.redirect(`/posts`);
      }
    } catch (error) {
      res.status(500).send({ error: 'An error occurred while updating the post' });
    }
  };
  
  // Delete - Delete a specific post
  exports.destroy = async (req, res) => {
    try {
      const posts = await db.post.destroy({
        where: {
            id: req.params.id
          }
        });
      
      res.redirect(`/posts`);
    
  } catch (error) {
    res.status(500).send({ error: 'An error occurred while updating the post' });
  }
};
