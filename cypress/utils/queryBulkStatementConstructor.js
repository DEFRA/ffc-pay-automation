require('dotenv').config();
const { Client } = require('pg');

// This module connects to Statement Constructor database and checks if the data exists for expected SBI.


module.exports = async () => {

  const client = new Client({
    host: process.env.DEFAULTHOST,
    port: process.env.STATEMENTCONSTRUCTORPORT,
    database: process.env.STATEMENTCONSTRUCTORDATABASE,
    user: process.env.DEFAULTUSER,
    password: process.env.DEFAULTPASSWORD,
    ssl: false,
  });

  try {
    await client.connect();
    const querySql = 'SELECT * FROM "d365"';


    await client.query(querySql).then((results) => {
      for (let i=0; i<results.rows.length; i++) {

        if (results.rows.length > 19) {
          console.log('✅ Data exists in the database');
        } else {
          console.log('Data is not in database');
          throw Error;
        }

        const data = results.rows[i];
        console.log('Number of rows retrieved:', results.rows.length);
        console.log('Data retrieved:', data);
      }
    });
    await client.end();
    return 'Values entered successfully';
  } catch (error) {
    console.error('❌ Failed to load report data:', error);
    throw error; // Ensure the error is thrown to be caught by Cypress
  }

};