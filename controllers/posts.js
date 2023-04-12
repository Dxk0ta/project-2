const express = require("express");
const router = express();
const db = require("../models");
const axios = require("axios");

// Index - Get all posts
exports.index = async (req, res) => {
  try {
    const posts = await db.Post.findAll();
    res.render('posts/index', { posts });
  } catch (error) {
    res.status(500).send({ error: 'An error occurred while fetching posts' });
  }
};

// Show - Get a specific post
exports.show = async (req, res) => {
    try {
      const post = await db.Post.findByPk(req.params.id);
      if (!post) {
        res.status(404).send({ error: 'Post not found' });
      } else {
        res.render('posts/show', { post });
      }
    } catch (error) {
      res.status(500).send({ error: 'An error occurred while fetching the post' });
    }
  };
  
  // Create - Render create post form
  exports.create = async (req, res) => {
    res.render('create');
  };
  
  // Store - Create a new post
  exports.store = async (req, res) => {
    try {
      const { title, content } = req.body;
      const post = await db.Post.create({ title, content });
      res.redirect(`/posts/${post.id}`);
    } catch (error) {
      res.status(500).send({ error: 'An error occurred while creating the post' });
    }
  };
  
  // Edit - Render edit post form
  exports.edit = async (req, res) => {
    try {
      const post = await db.Post.findByPk(req.params.id);
      if (!post) {
        res.status(404).send({ error: 'Post not found' });
      } else {
        res.render('posts/edit', { post });
      }
    } catch (error) {
      res.status(500).send({ error: 'An error occurred while fetching the post' });
    }
  };
  
  // Update - Update a specific post
  exports.update = async (req, res) => {
    try {
      const { title, content } = req.body;
      const post = await db.Post.findByPk(req.params.id);
      if (!post) {
        res.status(404).send({ error: 'Post not found' });
      } else {
        await post.update({ title, content });
        res.redirect(`/posts/${post.id}`);
      }
    } catch (error) {
      res.status(500).send({ error: 'An error occurred while updating the post' });
    }
  };
  
  // Delete - Delete a specific post
  exports.destroy = async (req, res) => {
    try {
      const post = await db.Post.findByPk(req.params.id);
      if (!post) {
        res.status(404).send({ error: 'Post not found' });
    } else {
      await post.update({ title, content });
      res.redirect(`/posts/${post.id}`);
    }
  } catch (error) {
    res.status(500).send({ error: 'An error occurred while updating the post' });
  }
};
