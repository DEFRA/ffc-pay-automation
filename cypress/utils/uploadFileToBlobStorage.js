require('dotenv').config();
const { BlobServiceClient } = require('@azure/storage-blob');
const fs = require('fs');
const path = require('path');

async function uploadFileToBlobStorage (env, containerName, uploadDir, scheme) {
  let fileName = '';

  if (env.includes('local')) {

    const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.DPSBLOBCONNECTIONSTRING);
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const filePath = 'cypress/fixtures/';

    switch (scheme) {
    case 'dps': fileName = 'BGAN20230908164539C.OUT'; break;
    default: throw new Error(`Unknown scheme: ${scheme}`);
    }

    const uploadPath = path.join(uploadDir + fileName);

    try {
      const blockBlobClient = containerClient.getBlockBlobClient(uploadPath);
      await blockBlobClient.uploadFile(filePath + fileName);
      console.log(`📤 Uploaded to blob: ${fileName}`);
    } catch (error) {
      console.error(`⚠️ Upload failed: ${error.message}`);
      throw error;
    }

  } else if (env.includes('dev')) {

    const blobServiceClient = BlobServiceClient.fromConnectionString(
      process.env.DEVPAYMENTSBLOBCONNECTIONSTRING
    );

    const containerClient = blobServiceClient.getContainerClient(containerName);
    const filePath = 'cypress/fixtures/';

    switch (scheme) {
    case 'dps':
      fileName = 'BGAN20230908164539C.OUT';
      break;
    default:
      throw new Error(`Unknown scheme: ${scheme}`);
    }

    // Read original file
    const originalFile = path.join(filePath, fileName);
    const fileContent = fs.readFileSync(originalFile, 'utf8');

    const newContent = fileContent;

    // Build timestamp (MMDDHHmmss)
    const now = new Date();
    const pad = (n) => String(n).padStart(2, '0');

    const timestamp =
      pad(now.getMonth() + 1) +   // MM
      pad(now.getDate()) +        // dd
      pad(now.getHours()) +       // HH
      pad(now.getMinutes()) +     // mm
      pad(now.getSeconds());      // ss

    const newFileName = `BGAN2023${timestamp}C.OUT`;
    const newFilePath = path.join(filePath, newFileName);

    // Write new file
    fs.writeFileSync(newFilePath, newContent, 'utf8');
    console.log(`📝 Created new file: ${newFileName}`);

    // Upload new file
    try {
      const uploadPath = path.join(uploadDir + newFileName);
      const blockBlobClient = containerClient.getBlockBlobClient(uploadPath);

      await blockBlobClient.uploadFile(newFilePath);

      console.log(`📤 Uploaded to blob: ${newFileName}`);
    } catch (error) {
      console.error(`⚠️ Upload failed: ${error.message}`);
      throw error;
    }
  }

  return fileName;
}

module.exports = uploadFileToBlobStorage;