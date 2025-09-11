require('dotenv').config();
const { Client } = require('pg');

// This module connects to Statement Constructor database and checks if the data exists for expected SBI.


module.exports = async () => {

  const client = new Client({
    host: process.env.DEFAULTHOST,
    port: process.env.PAYINJECTIONPORT,
    database: process.env.PAYINJECTIONDATABASE,
    user: process.env.DEFAULTUSER,
    password: process.env.DEFAULTPASSWORD,
    ssl: false,
  });

  try {
    await client.connect();
    const querySql = 'SELECT * FROM "manualUploads" WHERE "uploadId" = 1';


    await client.query(querySql).then((results) => {
      const data = results.rows[0];
      console.log('Data retrieved:', data);
      if (results.rows.length > 0) {
        console.log('✅ Data exists in the database');
        return 'Data exists';
      } else {
        console.log('Data is not in database');
      }
    });
    await client.end();
    return 'Values entered successfully';
  } catch (error) {
    console.error('❌ Failed to load report data:', error);
    throw error; // Ensure the error is thrown to be caught by Cypress
  }

};