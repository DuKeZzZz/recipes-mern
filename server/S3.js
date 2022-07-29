require('dotenv').config();
const AWS = require('aws-sdk');
const fs = require('fs');

const bucketName = process.env.AWS_S3_BUCKET_NAME;

const s3 = new AWS.S3({
    region: process.env.AWS_S3_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    accessSecretKey: process.env.AWS_SECRET_ACCESS_KEY
})


//upload file to bucket

function uploadFile(file) {
    const fileStream = fs.createReadStream(file.path);

    const uploadParams = {
        Bucket: bucketName,
        Body: fileStream,
        Key: file.filename
    };

    return s3.upload(uploadParams, (err, data) => {
        if(err) {
            return err;
        } else {
            return data
        }
    }).promise();
}

exports.uploadFile = uploadFile;

//download file from bucket

function getFile(s3Key) {
    const downloadParams = {
        Bucket: bucketName,
        Key: s3Key
    }

    return s3.getSignedUrlPromise('getObject', downloadParams);
    
    // return s3.getObject(downloadParams, (err, data) => {
    //     if(err) {
    //         return err;
    //     } else {
    //         return data
    //     }
    // }).createReadStream();
}

exports.getFile = getFile;