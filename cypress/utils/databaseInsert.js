require('dotenv').config();
const { Client } = require('pg');

// This module connects to the various database and runs sql statement passed as second argument


async function databaseInsert (database, statement) {

  const statementConstructorPort = process.env.STATEMENTCONSTRUCTORPORT;
  const statementConstructorDatabase = process.env.STATEMENTCONSTRUCTORDATABASE;
  const statementDataPort = process.env.STATEMENTDATAPORT;
  const statementDataDatabase = process.env.STATEMENTDATADATABASE;
  const statementPublisherPort = process.env.STATEMENTPUBLISHERPORT;
  const statementPublisherDatabase = process.env.STATEMENTPUBLISHERDATABASE;
  const statementGeneratorPort = process.env.STATEMENTGENERATORPORT;
  const statementGeneratorDatabase = process.env.STATEMENTGENERATORDATABASE;

  var currentPort = '';
  var currentDatabase = '';

  switch (database) {
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
    await client.query(statement);
    await client.end();

  } catch (error) {
    return error.message;
  }

  return null;

}

module.exports = databaseInsert;