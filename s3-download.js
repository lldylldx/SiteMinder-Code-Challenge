'use strict';

/**
 * Dependencies
 */
const
  AWS = require('aws-sdk'),
  fs = require('fs'),
  path = require('path'),
  bucketRegion = 'ap-southeast-2',
  bucketName = 'secret-configs-678',
  key = 'config/local.js';

  AWS.config.update(
   {
     accessKeyId: process.env.ACCESS_KEY_ID,
     secretAccessKey: process.env.SECRET_ACCESS_KEY,
     region: bucketRegion
   }
  );

  console.log(process.cwd());
  const  filePath = path.join(process.cwd()+'/configs/', 'local.js');



  const file = fs.createWriteStream(filePath, 'utf8');

  file.on('finish', () => {
     console.log("Config File Downloaded from AWS S3!");
  });

  file.on('error', (e) => {
     console.log("Error downloading file", e);
  });

  const s3 = new AWS.S3();
  const options = {
     Bucket : bucketName,
     Key : key
  };

  //res.attachment(fileKey);
  s3.getObject(options).createReadStream().pipe(file);
