require('dotenv').config();
const { Client } = require('pg');

// This module connects to Statement Data database and checks if the data exists for expected SBI.

module.exports = async () => {

  const client = new Client({
    host: process.env.DEFAULTHOST,
    port: process.env.STATEMENTDATAPORT,
    database: process.env.STATEMENTDATADATABASE,
    user: process.env.DEFAULTUSER,
    password: process.env.DEFAULTPASSWORD,
    ssl: false,
  });

  await client.connect();


  for (let i=0; i<10; i++) {
    try {
      const querySql = 'SELECT * FROM "organisations" WHERE "sbi" = 12345678' + i;


      await client.query(querySql).then((results) => {
        const data = results.rows[0];
        console.log('Data retrieved:', data);
        if (results.rows.length > 0) {
          console.log('✅ Data exists in the database');
          return 'Data exists';
        } else {
          console.log('Data is not in database');
          throw Error;
        }
      });
    } catch (error) {
      console.error('❌ Failed to load report data:', error);
      throw error; // Ensure the error is thrown to be caught by Cypress
    }
  }
  await client.end();
  return 'Values entered successfully';
};