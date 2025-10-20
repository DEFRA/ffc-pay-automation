require('dotenv').config();
const { Client } = require('pg');

// This module connects to Statement Data database and checks if the data exists for expected SBI.

module.exports = async (database) => {

  const statementConstructorPort = process.env.STATEMENTCONSTRUCTORPORT;
  const statementConstructorDatabase = process.env.STATEMENTCONSTRUCTORDATABASE;
  const statementDataPort = process.env.STATEMENTDATAPORT;
  const statementDataDatabase = process.env.STATEMENTDATADATABASE;
  const statementPublisherPort = process.env.STATEMENTPUBLISHERPORT;
  const statementPublisherDatabase = process.env.STATEMENTPUBLISHERDATABASE;
  const statementGeneratorPort = process.env.STATEMENTGENERATORPORT;
  const statementGeneratorDatabase = process.env.STATEMENTGENERATORDATABASE;
  const payProcessingPort = process.env.PAYPROCESSINGPORT;
  const payProcessingDatabase = process.env.PAYPROCESSINGDATABASE;
  const paySubmissionPort = process.env.PAYSUBMISSIONPORT;
  const paySubmissionDatabase = process.env.PAYSUBMISSIONDATABASE;
  const payInjectionPort = process.env.PAYINJECTIONPORT;
  const payInjectionDatabase = process.env.PAYINJECTIONDATABASE;


  var currentPort = '';
  var currentDatabase = '';
  var querySql = '';

  switch (database) {
  case 'ffc-pay-processing':
    currentPort = payProcessingPort;
    currentDatabase = payProcessingDatabase;
    querySql = 'SELECT * FROM "paymentRequests" WHERE "paymentRequestId" = 1';
    break;
  case 'ffc-doc-statement-constructor':
    currentPort = statementConstructorPort;
    currentDatabase = statementConstructorDatabase;
    querySql = 'SELECT * FROM "organisations" WHERE "sbi" = 123456789';
    break;
  case 'ffc-doc-statement-data':
    currentPort = statementDataPort;
    currentDatabase = statementDataDatabase;
    querySql = 'SELECT * FROM "organisations" WHERE "sbi" = 123456789';
    break;
  case 'ffc-doc-statement-publisher':
    currentPort = statementPublisherPort;
    currentDatabase = statementPublisherDatabase;
    querySql = 'SELECT "statementId" FROM "statements" WHERE "sbi" = 123456789';
    break;
  case 'ffc-doc-statement-generator':
    currentPort = statementGeneratorPort;
    currentDatabase = statementGeneratorDatabase;
    querySql = 'SELECT "statementData" FROM "generations" WHERE "generationId" = 1';
    break;
  case 'ffc-pay-submission':
    currentPort = paySubmissionPort;
    currentDatabase = paySubmissionDatabase;
    querySql = 'SELECT * FROM "paymentRequests" WHERE "paymentRequestId" = 1';
    break;
  case 'ffc-pay-injection':
    currentPort = payInjectionPort;
    currentDatabase = payInjectionDatabase;
    querySql = 'SELECT * FROM "manualUploads" WHERE "uploadId" = 1';
    break;
  default:
    throw new Error(`Unknown database: ${database}`);
  }



  const client = new Client({
    host: process.env.DEFAULTHOST,
    port: currentPort,
    database: currentDatabase,
    user: process.env.DEFAULTUSER,
    password: process.env.DEFAULTPASSWORD,
    ssl: false,
  });

  try {
    await client.connect();

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