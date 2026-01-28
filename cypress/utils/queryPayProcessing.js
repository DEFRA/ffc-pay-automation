require('dotenv').config();
const { Client } = require('pg');

// This module connects to Pay Processor database and checks if the data has been updated following return file upload.


module.exports = async (fileType) => {

  const client = new Client({
    host: process.env.DEFAULTHOST,
    port: process.env.PAYPROCESSINGPORT,
    database: process.env.PAYPROCESSINGDATABASE,
    user: process.env.DEFAULTUSER,
    password: process.env.DEFAULTPASSWORD,
    ssl: false,
  });

  var querySql = '';

  switch (fileType) {
  case 'return': querySql = 'SELECT "settledValue" FROM "completedPaymentRequests" WHERE "paymentRequestId" = 1'; break;
  case 'ppa': querySql = 'SELECT "invoiceNumber" FROM "paymentRequests" WHERE "paymentRequestId" = 2'; break;
  case 'd365 rejection': querySql = 'SELECT "holdCategoryId" FROM "holds" WHERE "holdId" = 1'; break;
  case 'resubmission': querySql = 'SELECT "paymentRequestId" FROM "completedPaymentRequests" WHERE "completedPaymentRequestId" = 2'; break;
  }

  try {
    await client.connect();

    await client.query(querySql).then((results) => {
      const data = results.rows[0];
      console.log('Data retrieved:', data);

      if (fileType === 'd365 rejection') {
        if (data.holdCategoryId === 1) {
          console.log('✅ Correct data has been added from ' + fileType + ' file');
          return 'Correct data has been added from ' + fileType + ' file';
        } else {
          console.log('Correct data has not been added from ' + fileType + ' file');
          throw Error;
        }
      } else {

        if (!Object.values(data).includes(null)) {
          console.log('✅ Correct data has been added from ' + fileType + ' file');
          return 'Correct data has been added from ' + fileType + ' file';
        } else {
          console.log('Correct data has not been added from ' + fileType + ' file');
          throw Error;
        }
      }
    });
    await client.end();
    return 'Values entered successfully';
  } catch (error) {
    console.error('❌ Failed to load report data:', error);
    throw error; // Ensure the error is thrown to be caught by Cypress
  }

};