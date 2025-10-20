require('dotenv').config();
const { BlobServiceClient } = require('@azure/storage-blob');
const fs = require('fs');
const path = require('path');

async function uploadFileToBlobStorage (containerName, uploadDir, scheme) {
  // This function uploads a report to Azure Blob Storage and checks that relevant values are correct

  const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.DPSBLOBCONNECTIONSTRING);
  console.log('Blob Service Client = ' + blobServiceClient.url);
  console.log('Container name = ' + containerName);
  const containerClient = blobServiceClient.getContainerClient(containerName);
  console.log('Container client = ' + containerClient.url);
  const filePath = 'cypress/fixtures/';

  let fileName = '';
  switch (scheme) {
  case 'dps': fileName = 'BGAN20230908164539C.OUT'; break;
  default: throw new Error(`Unknown scheme: ${scheme}`);
  }

  const uploadPath = path.join(uploadDir + fileName);
  console.log('Upload path = ' + uploadPath);


  // Upload the file to blob storage
  try {
    const blockBlobClient = containerClient.getBlockBlobClient(uploadPath);
    await blockBlobClient.uploadFile(filePath + fileName);
    console.log(`📤 Uploaded to blob: ${fileName}`);
  } catch (error) {
    console.error(`⚠️ Upload failed: ${error.message}`);
    throw error;
  }

  return fileName;
}

module.exports = uploadFileToBlobStorage;