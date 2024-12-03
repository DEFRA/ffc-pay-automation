/* global When, Then */
import azureServiceBusPage from '../pages/azureServiceBusPage';
import connectionStrings from '../../support/connectionStrings.json';

When('I fill in the Connection String', () => {
  const currentEnv = Cypress.env('env');
  if (!currentEnv) {
    throw new Error('No environment specified. Please set the "env" variable in your Cypress command.');
  }

  const connectionString = connectionStrings[currentEnv];
  if (!connectionString) {
    throw new Error(`No connection string found for the environment: ${currentEnv}`);
  }

  azureServiceBusPage.fillConnectionString(connectionString);
});

When('I fill in the Queue or Topic name with {string}', (queueOrTopicName) => {
  azureServiceBusPage.fillQueueOrTopicName(queueOrTopicName);
});

When('I fill in the Message with the fixture file {string}', (filename) => {
  cy.fixture(`messageTemplates/inputMessage/${filename}`).then((message) => {
    Cypress.env('inputFile', message);
    const messageText = JSON.stringify(message, null, 2);
    azureServiceBusPage.fillMessage(messageText);
  });
});

When('I check the Auto Generate Correlation ID checkbox', () => {
  azureServiceBusPage.checkAutoGenerateCorrelationId();
});

When('I select {string} as the message format', (format) => {
  azureServiceBusPage.selectMessageFormat(format);
});

When('I set Total messages to send to {string}', (total) => {
  azureServiceBusPage.setTotalMessagesToSend(total);
});

When('I click the Send button', () => {
  azureServiceBusPage.clickSendButton();
});

Then('I should see a confirmation that the message was sent', () => {
  azureServiceBusPage.verifyMessageSent();
});

// Receive Message Steps
When('I fill in the Subscription name with {string}', (subscriptionName) => {
  azureServiceBusPage.fillSubscriptionName(subscriptionName);
});

When('I select {string} as the receive method', (method) => {
  azureServiceBusPage.selectReceiveMethod(method);
});

When('I check the From Dead Letter queue checkbox', () => {
  azureServiceBusPage.checkFromDeadLetterQueue();
});

When('I set Total messages to receive to {string}', (total) => {
  azureServiceBusPage.setTotalMessagesToReceive(total);
});

When('I click the Receive button', () => {
  azureServiceBusPage.clickReceiveButton();
});

Then('I should see a confirmation that messages were received', () => {
  azureServiceBusPage.verifyMessageReceived();
});

Then('I should see {string} messages displayed', (messageCount) => {
  azureServiceBusPage.verifyReceivedMessagesCount(messageCount);
});

Then('I verify the received message contents', () => {
  azureServiceBusPage.assertMessageContent();
});