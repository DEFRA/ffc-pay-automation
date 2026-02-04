/* global Given, When, Then */

Given('I restart the local environment', () => {
  cy.restartLocalEnv();
});

Given('I start ffc-pay-dps service', () => {
  cy.startDPSService();
});

When(/^I insert (.*) test data into Batch Processor service$/, (schemeName) => {
  switch (schemeName) {
  case 'GLOS':
    cy.insertGLOSBatchProcessorData ();
    break;
  }
  cy.wait(180000); // Wait for the data to be inserted and to be processed through all doc services
});

Then(/^I confirm that payment test data has been inserted into the (.*) database$/, (databaseName) => {
  var containerName = '';
  switch (databaseName) {
  case 'ffc-pay-injection':
    containerName = 'ffc-pay-injection-development';
    break;
  case 'ffc-pay-processing':
    containerName = 'ffc-pay-processing-ffc-pay-processing-1';
    break;
  case 'ffc-pay-submission':
    containerName = 'ffc-pay-submission-development';
    break;
  }

  cy.queryDatabase(databaseName);

  cy.task('getDockerLogs', containerName).then((logs) => {
    logs.split('\n').forEach((line) => {
      if (line.trim()) {
        console.log(line);
      }
    });
  });
  console.log(`✅ Test data has been inserted into the ${containerName} database`);
  cy.log(`✅ Test data has been inserted into the ${containerName} database`);
});

Then(/^I confirm that payment test data has not been inserted into the (.*) database$/, (databaseName) => {
  var containerName = '';
  switch (databaseName) {

  case 'ffc-pay-processing':
    containerName = 'ffc-pay-processing-ffc-pay-processing-1';
    cy.confirmInvalidDataNotAdded(databaseName);
    break;
  }

  cy.task('getDockerLogs', containerName).then((logs) => {
    logs.split('\n').forEach((line) => {
      if (line.trim()) {
        console.log(line);
      }
    });
  });
  console.log(`✅ Test data was not inserted into the ${containerName} database`);
  cy.log(`✅ Test data was not inserted into the ${containerName} database`);
});

Then(/^I confirm that (.*) test data has been inserted into the (.*) database$/, (fileType, databaseName) => {
  var containerName = '';
  switch (databaseName) {
  case 'ffc-pay-processing':
    containerName = 'ffc-pay-processing-ffc-pay-processing-1';
    cy.queryPayProcessing(fileType); break;
  }

  cy.task('getDockerLogs', containerName).then((logs) => {
    logs.split('\n').forEach((line) => {
      if (line.trim()) {
        console.log(line);
      }
    });
  });
  console.log(`✅ Test data was updated in the ${containerName} database`);
  cy.log(`✅ Test data was updated in the ${containerName} database`);
});

Then(/^I confirm that the settled value of (.*) is (.*) in database$/, (fileType, expectedValue) => {

  //This step checks the settled value in the database for PPA payments and confirms that it matches the value
  // entered in the feature file.

  switch (fileType) {
  case 'PPA':
    fileType = 'ppa';
    break;
  case 'PPA Recovery':
    fileType = 'recovery';
    break;
  case 'Return':
    fileType = 'return';
    break;
  }

  cy.task('getSettledValue',
    { fileType, expectedValue
    });

  const containerName = 'ffc-pay-processing-ffc-pay-processing-1';

  cy.task('getDockerLogs', containerName).then((logs) => {
    logs.split('\n').forEach((line) => {
      if (line.trim()) {
        console.log(line);
      }
    });
  });
  console.log(`✅ Confirmed that settled value in the ${containerName} database is ${expectedValue}`);
  cy.log(`✅ Confirmed that settled value in the ${containerName} database is ${expectedValue}`);
});

When(/^I upload the (.*) payment file to the Azure Blob Storage container$/, (fileType) => {
  switch (fileType) {
  case 'dps':
    cy.task('uploadFileToBlobStorage', {
      container: 'batch',
      dir: 'inbound/',
      scheme: 'dps'
    });
    break;
  default: throw new Error(`Unknown file type: ${fileType}`);
  }
});

Then('I confirm that {string} alert has been generated', (alertMessage) => {

  console.log(`Checking for alert: "${alertMessage}"`);
  cy.log(`Checking for alert: "${alertMessage}"`);

  cy.task('getDockerLogs', 'ffc-pay-alerting-development').then((logs) => {
    if (logs.includes(alertMessage)) {
      console.log(`✅ Alert "${alertMessage}" has been generated`);
      cy.log(`✅ Alert "${alertMessage}" has been generated`);
    } else {
      throw new Error(`Alert "${alertMessage}" has not been generated`);
    }
  });
});

Then(/^I confirm that (.*) event can be found in Event Hub Database$/, (eventType) => {

  var sqlStatement;
  var expectedType;

  switch (eventType) {
  case 'batch':
    sqlStatement = 'SELECT * FROM "batches"';
    expectedType = 'uk.gov.defra.ffc.pay.batch.created.dax';
    break;
  case 'holds':
    sqlStatement = 'SELECT * FROM "holds"';
    expectedType = 'uk.gov.defra.ffc.pay.hold.added';
    break;
  case 'payments':
    sqlStatement = 'SELECT * FROM "payments"';
    expectedType = 'uk.gov.defra.ffc.pay.payment.processed';
    break;
  case 'warnings':
    sqlStatement = 'SELECT * FROM "warnings"';
    expectedType = 'uk.gov.defra.ffc.pay.warning.bank.missing';
    break;
  }

  cy.log('Querying Event Hub with Statement - ' + sqlStatement);

  cy.queryPayEventHub(sqlStatement).then((rows) => {
    const results = JSON.stringify(rows, null, 2);
    console.log('Results ' + results);

    if (results.includes(expectedType)) {
      console.log('✅ Event with type ' + expectedType + ' was found in database');
      cy.log('✅ Event with type ' + expectedType + ' was found in database');
    } else {
      throw new Error('Event with type ' + expectedType + ' was not found in database');
    }

  });
});