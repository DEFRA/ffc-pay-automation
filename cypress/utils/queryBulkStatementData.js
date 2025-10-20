require('dotenv').config();
const { Client } = require('pg');

// This module connects to Statement Data database and checks if the data exists for multiple SBIs

module.exports = async (year) => {

  const client = new Client({
    host: process.env.DEFAULTHOST,
    port: process.env.STATEMENTDATAPORT,
    database: process.env.STATEMENTDATADATABASE,
    user: process.env.DEFAULTUSER,
    password: process.env.DEFAULTPASSWORD,
    ssl: false,
  });

  var sqlTemplate = '';

  switch (year) {
  case '2024':
    sqlTemplate = 'SELECT * FROM "organisations" WHERE "sbi" = 12345678';
    break;
  case '2025':
    sqlTemplate = 'SELECT * FROM "organisations" WHERE "sbi" = 13345678';
    break;
  default:
    throw new Error('Unsupported year: ' + year);
  }
  await client.connect();


  for (let i=0; i<10; i++) {
    try {
      const querySql = ""+ sqlTemplate + i + "";
      console.log('Executing query for year ' + year + ':', querySql);


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