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

Then(/^I confirm that the settled value of PPA is (.*) in database$/, (expectedValue) => {

  //This step checks the settled value in the database for PPA payments and confirms that it matches the value
  // entered in the feature file.

  cy.queryPPASettledValue(expectedValue);

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

Then(/^I confirm that the settled value of Return is (.*) in database$/, (expectedValue) => {

  //This step checks the settled value in the database for payments and confirms that it matches the value
  // entered in the feature file.

  cy.querySettledValue(expectedValue);

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