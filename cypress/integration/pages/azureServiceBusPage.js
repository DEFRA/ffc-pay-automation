class azureServiceBusPage {
  fillConnectionString (value) {
    cy.get('input[name="connectionString"]').clear().type(value);
  }

  fillQueueOrTopicName (value) {
    cy.get('input[name="address"]').clear().type(value);
  }

  fillMessage (value) {
    cy.get('textarea[name="message"]').clear().type(value, { parseSpecialCharSequences: false });
  }

  checkAutoGenerateCorrelationId () {
    cy.get('input[name="generateCorrelationId"]').check();
  }

  selectMessageFormat (format) {
    cy.get(`input[name="format"][value="${format}"]`).check();
  }

  setTotalMessagesToSend (value) {
    cy.get('input[name="totalSend"]').clear().type(value);
  }

  clickSendButton () {
    cy.get('#send').click();
  }

  verifyMessageSent () {
    cy.get('#result-send').scrollIntoView().should('be.visible');
    cy.get('#result-text-send')
      .invoke('text')
      .should('match', /Sent \d+ messages/);
  }

  fillSubscriptionName (value) {
    cy.get('input[name="subscription"]').clear().type(value);
  }

  selectReceiveMethod (method) {
    cy.get(`input[name="method"][value="${method}"]`).check();
  }

  checkFromDeadLetterQueue () {
    cy.get('input[name="fromDeadLetter"]').check();
  }

  setTotalMessagesToReceive (value) {
    cy.get('input[name="totalReceive"]').clear().type(value);
  }

  clickReceiveButton () {
    cy.get('#receive').click();
  }

  verifyMessageReceived () {
    cy.get('#result-receive').scrollIntoView().should('be.visible');
    cy.get('#result-text-receive')
      .invoke('text')
      .should('match', /Total messages: \d+/);
  }

  verifyReceivedMessagesCount (expectedCount) {
    cy.get('.result-messages .message-body').should('have.length', expectedCount);
  }

  assertMessageContent () {
    const inputFile = Cypress.env('inputFile');
    const mismatches = []; // Collect mismatches for logging later

    cy.get('article.message.is-primary.result-messages')
      .scrollIntoView()
      .should('be.visible');

    cy.get('article.message.is-primary.result-messages .message-body pre')
      .invoke('text')
      .then((text) => {
        const actualMessages = JSON.parse(text);

        const compareValues = (expected, actual, keyPath = '') => {
          if (Array.isArray(expected) && Array.isArray(actual)) {
            // Compare arrays
            if (expected.length !== actual.length) {
              mismatches.push(`Array length mismatch at ${keyPath}: expected ${expected.length} but got ${actual.length}`);
              return;
            }
            expected.forEach((expectedItem, index) => {
              const newKeyPath = `${keyPath}[${index}]`;
              compareValues(expectedItem, actual[index], newKeyPath);
            });
          } else if (typeof expected === 'object' && typeof actual === 'object') {
            // Compare objects
            Object.keys(expected).forEach((key) => {
              const newKeyPath = keyPath ? `${keyPath}.${key}` : key;
              compareValues(expected[key], actual[key], newKeyPath);
            });
          } else if (keyPath.toLowerCase().includes('date')) {
            // Handle date normalization and comparison
            const normalizeDate = (date) => {
              const parts = date.split(/[-/]/); // Split by '-' or '/'
              if (parts[0].length === 4) {
                // Assume YYYY-MM-DD
                return `${parts[0]}-${parts[1].padStart(2, '0')}-${parts[2].padStart(2, '0')}`;
              } else {
                // Assume DD-MM-YYYY
                return `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
              }
            };
            const expectedDate = normalizeDate(expected);
            const actualDate = normalizeDate(actual);
            if (expectedDate !== actualDate) {
              mismatches.push(`Mismatch for key: ${keyPath} - expected ${expectedDate} but got ${actualDate}`);
            }
          } else {
            // Compare primitive values
            if (expected !== actual) {
              mismatches.push(`Mismatch for key: ${keyPath} - expected ${expected} but got ${actual}`);
            }
          }
        };

        compareValues(inputFile, actualMessages);
      })
      .then(() => {
        // Log mismatches if any
        if (mismatches.length > 0) {
          cy.log('Mismatches found:');
          mismatches.forEach((mismatch) => {
            cy.log(mismatch);
          });

          // Fail the test manually at the end with a summary
          throw new Error(`Mismatches detected:\n${mismatches.join('\n')}`);
        }
      });
  }
}

export default new azureServiceBusPage();