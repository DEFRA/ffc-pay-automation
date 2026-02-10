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
  var sqlStatement = '';
  switch (databaseName) {
  case 'ffc-pay-injection':
    sqlStatement = 'SELECT * FROM "manualUploads" WHERE "uploadId" = 1';
    break;
  case 'ffc-pay-processing':
    sqlStatement = 'SELECT * FROM "paymentRequests" WHERE "paymentRequestId" = 1';
    break;
  case 'ffc-pay-submission':
    sqlStatement = 'SELECT * FROM "paymentRequests" WHERE "paymentRequestId" = 1';
    break;
  default:
    throw new Error(`Unknown database: ${databaseName}`);
  }

  cy.databaseQuery({databaseName, sqlStatement}).then((results) => {
    const data = results.rows[0];
    console.log('Data retrieved:', data);
    if (results.rows.length > 0) {
      console.log('✅ Data exists in the database');
    } else {
      throw new Error('Data is not in database');
    }

    console.log(`✅ Test data has been inserted into the ${databaseName} database`);
    cy.log(`✅ Test data has been inserted into the ${databaseName} database`);
  });
});

Then(/^I confirm that payment test data has not been inserted into the (.*) database$/, (databaseName) => {
  var sqlStatement = '';
  switch (databaseName) {

  case 'ffc-pay-processing':
    sqlStatement = 'SELECT * FROM "paymentRequests" WHERE "paymentRequestId" = 1';
    cy.databaseQuery({databaseName, sqlStatement}).then((results) => {
      cy.log('Results - ' + JSON.stringify(results));

      if (results.rowCount === 0) {
        cy.log('✅ Data does not exist in database ');
        console.log('✅ Data does not exist in database ');
      } else {
        throw new Error('Data was found in database');
      }
    });
    break;
  }
});

Then(/^I confirm that (.*) test data has been inserted into the (.*) database$/, (fileType, databaseName) => {
  var containerName;
  var sqlStatement;

  switch (fileType) {
  case 'return': sqlStatement = 'SELECT "settledValue" FROM "completedPaymentRequests" WHERE "paymentRequestId" = 1'; break;
  case 'ppa': sqlStatement = 'SELECT "invoiceNumber" FROM "paymentRequests" WHERE "paymentRequestId" = 2'; break;
  case 'd365 rejection': sqlStatement = 'SELECT "holdCategoryId" FROM "holds" WHERE "holdId" = 1'; break;
  case 'resubmission': sqlStatement = 'SELECT "paymentRequestId" FROM "completedPaymentRequests" WHERE "completedPaymentRequestId" = 2'; break;
  default:
    throw new Error(`Unknown file type: ${fileType}`);
  }

  cy.log('Querying ' + databaseName + ' with statement - ' + sqlStatement);

  containerName = 'ffc-pay-processing-ffc-pay-processing-1';
  cy.databaseQuery({databaseName, sqlStatement}).then((results) => {

    cy.log('Results - ' + JSON.stringify(results));

    if (fileType === 'd365 rejection') {

      var holdCategoryId = results.rows[0].holdCategoryId;

      if (holdCategoryId === 1) {
        console.log('✅ Correct data has been added from ' + fileType + ' file');
      } else {
        throw new Error('Correct data has not been added from ' + fileType + ' file');
      }
    } else {

      if (results.rowCount === 1) {
        console.log('✅ Correct data has been added from ' + fileType + ' file');
      } else {
        throw new Error('Correct data has not been added from ' + fileType + ' file');
      }
    }
  });

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

  const databaseName = 'ffc-pay-processing';
  var sqlStatement = '';

  switch (fileType) {
  case 'PPA':
    sqlStatement = `
        SELECT "settledValue"
        FROM "completedPaymentRequests"
        WHERE "paymentRequestId" = 2
      `;
    break;
  case 'PPA Recovery':
    sqlStatement = `
        SELECT "settledValue"
        FROM "completedPaymentRequests"
        WHERE "completedPaymentRequestId" = 3
      `;
    break;
  case 'Return':
    sqlStatement = `
        SELECT "settledValue"
        FROM "completedPaymentRequests"
        WHERE "paymentRequestId" = 1
      `;
    break;
  default:
    throw new Error(`Unknown database: ${databaseName}`);
  }

  cy.databaseQuery({ databaseName, sqlStatement }).then((results) => {
    cy.log('Results - ' + JSON.stringify(results));
    const value = results.rows[0].settledValue;
    console.log(`Actual Value: ${value}`);
    cy.log(`Actual Value: ${value}`);
    if (value == expectedValue) {
      console.log(`Settled Value confirmed as expected: ${value}`);
      cy.log(`Settled Value confirmed as expected: ${value}`);
    } else {
      console.log(`Incorrect value found: ${value}, expected: ${expectedValue}`);
      throw new Error(`Incorrect value found: ${value}`);
    }
  });
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
  const databaseName = 'ffc-pay-event-hub';

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
  default:
    throw new Error(`Unknown event type: ${eventType}`);
  }

  cy.log('Querying ' + databaseName + ' with Statement - ' + sqlStatement);

  cy.databaseQuery({databaseName, sqlStatement}).then((rows) => {
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