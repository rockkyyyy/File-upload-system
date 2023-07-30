const mime = require('mime-types');
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');
const db = require('../models/users.js');
const { user } = require('../config/config.js');

async function isDocument(filename) {
  const docMimetype = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
  const pdfMimetype = 'application/pdf';

  const fileExtension = path.extname(filename).toLowerCase();
  const fileMimetype = mime.lookup(fileExtension);

  return fileMimetype === docMimetype || fileMimetype === pdfMimetype;
}

async function isPNG(filename,userID) {
  const pngMimetype = 'image/png';
  const requiredWidth = 400;
  const requiredHeight = 300;

  const fileExtension = path.extname(filename).toLowerCase();
  const fileMimetype = mime.lookup(fileExtension);

  if (fileMimetype === pngMimetype) {

    const filePath = path.resolve(`uploads/${userID}`, filename);
    const dimensions = await getDimensions(filePath);
    // console.log(dimensions.width, dimensions.height);
    return dimensions.width <= requiredWidth && dimensions.height <= requiredHeight;
  }

  return false;
}

async function getDimensions(filePath) {
  const { width, height } = await sharp(filePath).metadata();
  return { width, height };
}

function isFileUnderSizeLimit(file) {
  return file.size <= 1000 * 1024;
}

exports.validate = async (req, res, next) => {
  const { resume, photo } = req.files;

  const flag1 = await isDocument(resume.name);
  const flag2 = await isPNG(photo.name,req.userId);
  const flag3 = isFileUnderSizeLimit(photo);

  if (flag1 && flag2 && flag3) {
    req.validfiles = true;
    next();
  } else {
    const errorMessages = [];

    if (!flag1) {
      errorMessages.push('* Uploading resume failed. The resume should be in .docx or .pdf format.<br><br>');
    }
    if (!flag2) {
      errorMessages.push('* Uploading photo failed. The photo should be in .png format and have dimensions 1600x1600.<br><br>');
    }
    if (!flag3) {
      errorMessages.push('* Uploading photo failed. The size of the photo should be less than 1000KB.<br><br>');
    }

    req.validfiles = false;
    req.errstr = errorMessages.join('');
    next();
  }
};
