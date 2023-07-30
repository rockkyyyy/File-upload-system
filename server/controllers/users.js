const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs')
const db = require('../models/users.js');

exports.loadpage = async (req,res)=>{
    const filePath = path.join(__dirname, '../client/index.html');
      res.sendFile(filePath);
}

exports.validateFiles = (req,res,next) =>{
    if(req.validfiles==true){
      console.log(req.files);
    res.status(200).send('uploaded successfully !');
    next();
  }
  else{
    const folderPath = path.resolve(`uploads/${req.userId}`);

    fs.rmSync(folderPath, { recursive: true }, (err) => {
      if (err) {
        console.error('Error deleting folder:', err);
        return res.status(500).send('Error deleting folder');
      }
      return res.status(401).send('Validation failed. Files not uploaded successfully.');
    });
    res.status(401).send(req.errstr);
  }
}

exports.saveData = (req,res,next)=>{
  const data = req.body;
  db.insertData(data,(err)=>{
    if(err){
      console.log(err);
      return;
    }
  })
} 
