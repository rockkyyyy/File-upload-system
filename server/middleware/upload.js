const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs');
const db = require('../models/users.js');

exports.upload = async (req, res, next) => {

  try {
    const resume = req.files.resume;
    const photo = req.files.photo;
   
    const userFolderPath = path.join(__dirname, `../uploads/${req.userId}`);

    const resumeFilePath = path.join(userFolderPath, resume.name);
    const photoFilePath = path.join(userFolderPath, photo.name);

    // Create the user folder if it doesn't exist
    if (!fs.existsSync(userFolderPath)) {
      fs.mkdirSync(userFolderPath);
    }

    // Move resume file to the user folder
    await new Promise((resolve, reject) => {
      resume.mv(resumeFilePath, (err) => {
        if (err) {
          console.error(err);
          return reject('Error uploading resume file.');
        }
        // Resume file uploaded successfully
        resolve();
      });
    });

    // Move photo file to the user folder
    await new Promise((resolve, reject) => {
      photo.mv(photoFilePath, (err) => {
        if (err) {
          console.error(err);
          return reject('Error uploading photo file.');
        }
        // Photo file uploaded successfully
        resolve();
      });
    });

    next();
  } catch (err) {
    console.error(err);
    return res.status(500).send('An error occurred during file upload.');
  }
};

