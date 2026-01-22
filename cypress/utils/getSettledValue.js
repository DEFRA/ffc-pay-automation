require('dotenv').config();
const { Client } = require('pg');

async function getSettledValue (fileType, expectedValue) {

  const client = new Client({
    host: process.env.DEFAULTHOST,
    port: process.env.PAYPROCESSINGPORT,
    database: process.env.PAYPROCESSINGDATABASE,
    user: process.env.DEFAULTUSER,
    password: process.env.DEFAULTPASSWORD,
    ssl: false,
  });


  console.log(`Expected value received: [${expectedValue}]`);

  var querySql = '';

  switch (fileType) {
  case 'return':
    querySql = `
        SELECT "settledValue"
        FROM "completedPaymentRequests"
        WHERE "paymentRequestId" = 1
      `;
    break;
  case 'ppa':
    querySql = `
        SELECT "settledValue"
        FROM "completedPaymentRequests"
        WHERE "paymentRequestId" = 2
      `;
    break;
  case 'recovery':
    querySql = `
        SELECT "settledValue"
        FROM "completedPaymentRequests"
        WHERE "completedPaymentRequestId" = 3
      `;
    break;
  default:
    throw new Error(`Unknown file type: ${fileType}`);
  }

  console.log('Query running:', querySql.trim());

  try {
    await client.connect();

    const results = await client.query(querySql);

    console.log('Rows returned:', results.rows.length);
    console.log('Row data:', results.rows);

    if (results.rows.length === 0) {
      throw new Error('No rows returned from database');
    }

    const value = Object.values(results.rows[0])[0];
    console.log('Retrieved value:', value);

    if (value == expectedValue) {
      console.log(`Settled Value confirmed as expected: ${value}`);
      return `Settled Value confirmed as expected: ${value}`;
    } else {
      console.log(`Incorrect value found: ${value}, expected: ${expectedValue}`);
      throw new Error('Incorrect data returned');
    }

  } catch (error) {
    console.error('❌ Failed to load report data:', error);
    throw error;
  } finally {
    await client.end();
  }
}


module.exports = getSettledValue;