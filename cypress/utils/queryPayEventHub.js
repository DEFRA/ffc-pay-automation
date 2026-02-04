require('dotenv').config();
const { Client } = require('pg');

// This module connects to Pay Event Hub database and checks if the data has been updated following return file upload.


module.exports = async (statement) => {

  const client = new Client({
    host: process.env.DEFAULTHOST,
    port: process.env.PAYEVENTHUBPORT,
    database: process.env.PAYEVENTHUBDATABASE,
    user: process.env.DEFAULTUSER,
    password: process.env.DEFAULTPASSWORD,
    ssl: false,
  });

  var data;

  try {
    await client.connect();

    data = await client.query(statement);
    await client.end();

  } catch (error) {
    console.error('❌ Failed to load report data:', error);
    throw error; // Ensure the error is thrown to be caught by Cypress
  }

  var formattedData = JSON.stringify(data, null, 2);

  console.log('Data retrieved from Event Hub - ' + formattedData);

  return formattedData;
};