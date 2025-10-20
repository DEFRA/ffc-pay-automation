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

Then(/^I confirm that return test data has been inserted into the (.*) database$/, (databaseName) => {
  var containerName = '';
  switch (databaseName) {
  case 'ffc-pay-processing':
    containerName = 'ffc-pay-processing-ffc-pay-processing-1';
    cy.confirmReturnPayProcessingData(); break;
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