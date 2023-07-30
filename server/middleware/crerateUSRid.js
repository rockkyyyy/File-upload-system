const express = require('express');
const app = express();
const db = require('../models/users.js');

exports.createUSR = async (req,res,next)=>{
  try {
      const userId = await new Promise((resolve, reject) => {
        db.USRID((err, userId) => {
          if (err) {
            reject(err);
          } else {
            resolve(userId);
          }
        });
      });
      req.userId = userId;
      next();
    } 
    catch (err) {
      console.error(err);
      // Handle the error, e.g., send an error response
      res.status(500).send('An error occurred while loading the page.');
    }
}