const express = require("express");
const router = express();
const db = require("../models");
const axios = require("axios");

// Index - Get all comments
exports.index = async (req, res) => {
  try {
    const comments = await db.Comment.findAll();
    res.render('comments/index', { comments });
  } catch (error) {
    res.status(500).send({ error: 'An error occurred while fetching comments' });
  }
};jk677

  
  // Create - Render create comment form
  exports.create = async (req, res) => {
    res.render('comments/create');
  };
  
  // Store - Create a new post
  exports.store = async (req, res) => {
    try {
      const { content } = req.body;
      const comment = await db.Comment.create({ content });
      res.redirect(`/comments/${comment.id}`);
    } catch (error) {
      res.status(500).send({ error: 'An error occurred while creating the comment' });
    }
  };
  
  // Edit - Render edit comment form
  exports.edit = async (req, res) => {
    try {
      const post = await db.Post.findByPk(req.params.id);
      if (!post) {
        res.status(404).send({ error: 'Comment not found' });
      } else {
        res.render('comments/edit', { comment });
      }
    } catch (error) {
      res.status(500).send({ error: 'An error occurred while fetching the comment' });
    }
  };
  
  // Update - Update a specific comment
  exports.update = async (req, res) => {
    try {
      const { content } = req.body;
      const comment = await db.Comment.findByPk(req.params.id);
      if (!comment) {
        res.status(404).send({ error: 'Comment not found' });
      } else {
        await comment.update({ content });
        res.redirect(`/comments/${comment.id}`);
      }
    } catch (error) {
      res.status(500).send({ error: 'An error occurred while updating the comment' });
    }
  };
  
  // Delete - Delete a specific comment
  exports.destroy = async (req, res) => {
    try {
      const comment = await db.Comment.findByPk(req.params.id);
      if (!comment) {
        res.status(404).send({ error: 'Comment not found' });
    } else {
      await comment.update({ content });
      res.redirect(`/comments/${comment.id}`);
    }
  } catch (error) {
    res.status(500).send({ error: 'An error occurred while updating the comment' });
  }
};
