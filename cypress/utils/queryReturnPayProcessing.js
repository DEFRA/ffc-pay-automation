require('dotenv').config();
const { Client } = require('pg');

// This module connects to Pay Processor database and checks if the data has been updated following return file upload.


module.exports = async () => {

  const client = new Client({
    host: process.env.DEFAULTHOST,
    port: process.env.PAYPROCESSINGPORT,
    database: process.env.PAYPROCESSINGDATABASE,
    user: process.env.DEFAULTUSER,
    password: process.env.DEFAULTPASSWORD,
    ssl: false,
  });

  try {
    await client.connect();
    const querySql = 'SELECT "settledValue" FROM "completedPaymentRequests" WHERE "paymentRequestId" = 1';


    await client.query(querySql).then((results) => {
      const data = results.rows[0];
      console.log('Data retrieved:', data);
      if (Object.values(data).includes(22770)) {
        console.log('✅ Correct data has been added from return file');
        return 'Correct data has been added from return file';
      } else {
        console.log('Correct data has not been added from return file');
        throw Error;
      }
    });
    await client.end();
    return 'Values entered successfully';
  } catch (error) {
    console.error('❌ Failed to load report data:', error);
    throw error; // Ensure the error is thrown to be caught by Cypress
  }

};