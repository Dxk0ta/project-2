const express = require("express");
const router = express();
const db = require("../models");
const axios = require("axios");

// Index - Get all comments
exports.index = async (req, res) => {
    try {
      const comments = await db.comment.findAll();
  
      res.render('comments/comments', { comments });
    } catch (error) {
      res.status(500).send({ getAllcomments: 'An error occurred while fetching comments', error });
    }
  }
  
  // Show - Get a specific comment
  exports.show = async (req, res) => {
      try {
        const comment = await db.comment.findByPk(req.params.id);
        if (!comment) {
          res.status(404).send({ error: 'comment not found' });
        } else {
          res.render('comments/show', { comment });
        }
      } catch (error) {
        res.status(500).send({ error: 'An error occurred while fetching the comment' });
      }
    };
  
    
    // Create - Render create comment form
    exports.create = async (req, res) => {
      res.render('comments/create');
    };
    
    // Store - Create a new comment
    exports.store = async (req, res) => {
      try {
        const { title, content } = req.body;
  
        console.log({title, content})
        const comment = await db.comment.create({ title, content });
        console.log('I was called')
  
        res.redirect(`/comments`);
      } catch (error) {
          console.log('error:  ', error)
        res.status(500).send({ error: 'An error occurred while creating the comment' });
      }
    };
    
    // Delete - Delete a specific comment
    exports.destroy = async (req, res) => {
      console.log('blah')
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
  