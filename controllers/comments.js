const express = require("express");
const router = express();
const db = require("../models");
const axios = require("axios");
const comment = require('../models/comment')

// Index - Get all comments
exports.index = async (req, res) => {
    console.log('indexing!!!!!!!!!!')
    try {
      const comments = await db.comment.findAll();
  
      res.render('comments/comments', { comments });
    } catch (error) {
      res.status(500).send({error: 'An error occurred while fetching comments'});
    }
  }
  // Show - Get a specific comment
  exports.show = async (req, res) => {
    console.log('showing!!!!!!!!')
      try {
        const comments = await db.comment.findByPk(req.params.id);
        if (!comments) {
          res.status(404).send({ error: 'comment not found' });
        } else {
          res.render('comments/show', { comments });
        }
      } catch (error) {
        res.status(500).send({ error: 'An error occurred while fetching the comment' });
      }
    };
  
  // Update - Update a specific comment
  exports.update = async (req, res) => {
    try {
      const { content } = req.body;
      const comment = await db.comment.findByPk(req.params.id);
      if (!comment) {
        res.status(404).send({ error: 'comment not found' });
      } else {
        await db.comment.update({ content });
        res.redirect(`/comments`);
      }
    } catch (error) {
      res.status(500).send({ error: 'An error occurred while updating the comment' });
    }
  };

  
    
    // Create - Render create comment form
    exports.create = async (req, res) => {
      res.render('comments/create');
    };
    
    // Store - Create a new comment
    exports.store = async (req, res) => {
      try {
        console.log(0)
        // const post = await db.post.findByPk(req.params.id);
        const { content } = req.body;

        console.log(1)

        const comment = await db.comment.create({ content });
        console.log(2)
        // post.addItem(comment)
        console.log(3)
  
        res.redirect(`/comments`);
      } catch (error) {
          console.log('error:  ', error.message)
        res.status(500).send({ error: 'An error occurred while creating the comment' });
      }
    };
    
    // Delete - Delete a specific comment
    exports.destroy = async (req, res) => {
      console.log('random')
      try {
        const comment = await db.comment.destroy({
          where: {
              id: req.params.id
            }
          });
        
        res.redirect(`/comments`);
      
    } catch (error) {
      res.status(500).send({ error: 'An error occurred while updating the comment' });
    }
  };
  