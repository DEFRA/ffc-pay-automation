require('dotenv').config();
const { Client } = require('pg');

// This module connects to Statement Publisher database and checks if the statement data exists for expected SBI.
// It then retrieves the statement ID based on the SBI and checks if there are any deliveries associated with that statement ID.

module.exports = async () => {

  const client = new Client({
    host: process.env.DEFAULTHOST,
    port: process.env.STATEMENTPUBLISHERPORT,
    database: process.env.STATEMENTPUBLISHERDATABASE,
    user: process.env.DEFAULTUSER,
    password: process.env.DEFAULTPASSWORD,
    ssl: false,
  });

  try {
    await client.connect();

    const getStatementID = 'SELECT "statementId" FROM "statements" WHERE "sbi" = 123456789';

    const statementID = await client.query(getStatementID).then((results) => {
      if (results.rows.length > 0) {
        return results.rows[0].statementId;
      } else {
        console.log('No statement ID found for the given SBI');
      }
    });
    console.log('Statement ID retrieved:', statementID);

    const querySql = 'SELECT * FROM "deliveries" WHERE "statementId" = ' + statementID;


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

    await client.end();
    return 'Values entered successfully';
  } catch (error) {
    console.error('❌ Failed to load report data:', error);
    throw error; // Ensure the error is thrown to be caught by Cypress
  }

};