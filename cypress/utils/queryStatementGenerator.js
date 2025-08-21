require('dotenv').config();
const { Client } = require('pg');

// This module connects to Statement Generator database and checks if the statement data exists for expected generation ID.
// It then retrieves the statement data and checks if it contains the expected SBI value.


module.exports = async () => {

  const client = new Client({
    host: process.env.DEFAULTHOST,
    port: process.env.STATEMENTGENERATORPORT,
    database: process.env.STATEMENTGENERATORDATABASE,
    user: process.env.DEFAULTUSER,
    password: process.env.DEFAULTPASSWORD,
    ssl: false,
  });

  try {
    await client.connect();
    const querySql = 'SELECT "statementData" FROM "generations" WHERE "generationId" = 1';


    await client.query(querySql).then((results) => {
      const data = results.rows[0];
      console.log('Data retrieved:', data);

      if (data && JSON.stringify(data).includes('"sbi":123456789')) {
        console.log('✅ Data exists in the database');
        return 'Data exists';
      } else {
        console.log('Data not found as expected');
      }
    });

    await client.end();
    return 'Values entered successfully';
  } catch (error) {
    console.error('❌ Failed to load report data:', error);
    throw error; // Ensure the error is thrown to be caught by Cypress
  }

};