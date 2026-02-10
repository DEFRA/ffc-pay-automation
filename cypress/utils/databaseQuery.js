require('dotenv').config();
const { Client } = require('pg');

// This module connects to the various database and runs sql statement passed as second argument


async function databaseQuery (database, statement) {


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
  const payEventHubPort = process.env.PAYEVENTHUBPORT;
  const payEventHubDatabase = process.env.PAYEVENTHUBDATABASE;


  var currentPort = '';
  var currentDatabase = '';

  switch (database) {
  case 'ffc-pay-processing':
    currentPort = payProcessingPort;
    currentDatabase = payProcessingDatabase;
    break;
  case 'ffc-doc-statement-constructor':
    currentPort = statementConstructorPort;
    currentDatabase = statementConstructorDatabase;
    break;
  case 'ffc-doc-statement-data':
    currentPort = statementDataPort;
    currentDatabase = statementDataDatabase;
    break;
  case 'ffc-doc-statement-publisher':
    currentPort = statementPublisherPort;
    currentDatabase = statementPublisherDatabase;
    break;
  case 'ffc-doc-statement-generator':
    currentPort = statementGeneratorPort;
    currentDatabase = statementGeneratorDatabase;
    break;
  case 'ffc-pay-submission':
    currentPort = paySubmissionPort;
    currentDatabase = paySubmissionDatabase;
    break;
  case 'ffc-pay-injection':
    currentPort = payInjectionPort;
    currentDatabase = payInjectionDatabase;
    break;
  case 'ffc-pay-event-hub':
    currentPort = payEventHubPort;
    currentDatabase = payEventHubDatabase;
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

  var data;

  try {
    await client.connect();

    data = await client.query(statement);
    await client.end();

  } catch (error) {
    console.error('❌ Failed to load report data:', error);
    throw error; // Ensure the error is thrown to be caught by Cypress
  }

  console.log('Data retrieved from Event Hub - ' + data);

  return data;
}

module.exports = databaseQuery;