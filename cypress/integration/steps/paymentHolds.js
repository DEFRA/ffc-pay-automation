/* global When, Then */
import paymentHoldsPage from '../pages/paymentHoldsPage';
import requestEditor from '../pages/requestEditorPage';
import moment from 'moment/moment';

When('the {string} holds option is selected', (value) => {
  paymentHoldsPage.selectedOption().should('have.text', value);
});

When('I upload bulk payment holds file {string}', (file) => {
  const fixturePath = `cypress/fixtures/${file}`;

  paymentHoldsPage.fileInput().selectFile(fixturePath);
});

When('I click the hold category option for {string}', (text) => {
  cy.get('fieldset')
    .contains(text)
    .parent()
    .find('.govuk-radios__input')
    .first()
    .check();
});

When('I click the Create bulk payment holds button', () => {
  paymentHoldsPage.btnSubmit().click();
});

Then('the new holds in {string} are visible along with the correct timestamp', (file) => {
  cy.fixture(file).then((csvData) => {
    const frnValues = csvData.split(',');
    const today = moment().format('DD/MM/YYYY'); // Get today's date once

    frnValues.forEach((frnValue) => {
      paymentHoldsPage.frnSearchField().clear().type(frnValue);
      paymentHoldsPage.frnSearchButton().click();

      // Wait for a reasonable amount of time for the table to load
      cy.wait(2000); // Adjust time as necessary based on your application

      // Check for all rows containing the FRN
      cy.get('tbody.govuk-table__body').each((row) => {
        // Log the row content for debugging
        cy.wrap(row).invoke('text').then((rowText) => {
          cy.log(`Row content: ${rowText}`);
        });

        // Check if the row contains the FRN
        cy.wrap(row).contains('td', frnValue).then((td) => {
          if (td.length > 0) {
            // If the FRN is found in this row, check for today's date
            cy.wrap(row).contains('td', today).should('exist').then(() => {
              cy.log(`Found date: ${today} for FRN: ${frnValue} in row:`, row);
            });
          }
        });
      });
    });
  });
});

Then('the {string} error message is displayed on the Payment holds page', (errMsg) => {
  paymentHoldsPage
    .errorSummaryTitle()
    .should('be.visible')
    .and('contain.text', 'There is a problem');
  paymentHoldsPage
    .errorMessage()
    .should('be.visible')
    .and('contain.text', errMsg);
});

Then('the {string} error message is displayed on the Bulk upload page', (errMsg) => {
  paymentHoldsPage
    .bulkUploadErrorSummaryTitle()
    .should('be.visible')
    .and('contain.text', 'There is a problem');
  paymentHoldsPage
    .bulkUploadErrorMessage()
    .should('be.visible')
    .and('contain.text', errMsg);
});

When('the user selects to {string} holds', (option) => {
  paymentHoldsPage.sltAddRemoveHolds().select(option);
});

When('on the Payment Holds page I enter the newly generated FRN in the search field', () => {
  const updatedFRN = Cypress.env('updatedMessageBody').frn;
  paymentHoldsPage.frnSearchField().type(updatedFRN);
});

Then('on the Payment Holds page I click the FRN search button', () => {
  paymentHoldsPage.frnSearchButton().click();
});

Then('on the Payment Holds page I confirm that scheme filter box is visible', () => {
  paymentHoldsPage.schemeFilterBox().should('be.visible');
});

Then('on the Payment Holds page I confirm that correct options are available for {string} scheme', (scheme) => {
  var expectedOptions = [];

  switch (scheme.toLowerCase()) {

  case 'coht capital':
    expectedOptions = ['Bank account anomaly', 'Dax rejection', 'Non-payable', 'Other admin', 'Recovery', 'Withdrawal', 'Manual payment'];
    break;
  case 'coht revenue':
    expectedOptions = ['Bank account anomaly', 'Dax rejection', 'Non-payable', 'Other admin', 'Recovery', 'Withdrawal', 'Manual payment'];
    break;
  case 'expanded sfi offer':
    expectedOptions = ['Accelerated payment', 'Dax rejection', 'Ex-gratia', 'Hardship case', 'Non-payable', 'Withdrawal', 'Manual payment', 'Bridging payments', 'Other admin', 'Bank account anomaly', 'Recovery', 'Top up'];
    break;
  case 'delinked':
    expectedOptions = ['Delinked payment hold', 'Bank account anomaly', 'Dax rejection'];
    break;
  case 'sfi23':
    expectedOptions = ['Dax rejection', 'Ex-gratia', 'Hardship case', 'Non-payable', 'Withdrawal', 'Manual payment', 'Bridging payments', 'Other admin', 'Bank account anomaly', 'Recovery', 'Top up', 'Accelerated payment', 'Partial recovery process'];
    break;
  case 'imps':
    expectedOptions = ['Dax rejection', 'Bank account anomaly'];
    break;
  case 'fc':
    expectedOptions = ['Bank account anomaly', 'Dax rejection'];
    break;
  case 'es':
    expectedOptions = ['Dax rejection', 'Bank account anomaly'];
    break;
  case 'manual invoice':
    expectedOptions = ['Dax rejection', 'Bank account anomaly'];
    break;
  case 'fdmr':
    expectedOptions = ['Bank account anomaly', 'Dax rejection', 'Recovery', 'Top up', 'Incorrect currency preference - fdm'];
    break;
  case 'bps':
    expectedOptions = ['Bank account anomaly', 'Dax rejection', 'Recovery', 'Top up', 'Bacs recalls xc only', 'Delta validation check', '3yp', 'Ex-gratia', 'Bridging payments', 'Commons manual', 'Cross border d2p', 'Cross border e2p', 'Frns with debts', 'Greyed out lines', 'Hardship case', 'Incorrect currency preference', 'Manual payments - june', 'Nf commons manual', 'Non-declaration penalties', 'Non-payable', 'Payment hold 2016', 'Qa', 'Rpa land bank', 'Unregistered customer', 'Withdrawal', 'Xcomp obstruction', 'Migration hold'];
    break;
  case 'cs':
    expectedOptions = ['Dax rejection', 'Ex-gratia', 'Hardship case', 'Non-payable', 'Withdrawal', 'Manual payment', 'Bridging payments', 'Other admin', 'Bank account anomaly', 'Recovery', 'Top up', '2016 interim', '2017 bridging payment', '2017 hardship', '2018 bridging payment', '2019 bridging payment', 'Advance tick', 'Capital payments', 'Capital recoveries', 'Claim affected by inc0553223', 'Fsp', 'Treasury', 'Migration hold'];
    break;
  case 'annual health and welfare review':
    expectedOptions = ['Dax rejection', 'Ex-gratia', 'Hardship case', 'Non-payable', 'Withdrawal', 'Manual payment', 'Bridging payments', 'Other admin', 'Bank account anomaly', 'Recovery', 'Top up', 'Awaiting assurance check'];
    break;
  case 'lump sums':
    expectedOptions = ['Dax rejection', 'Ex-gratia', 'Hardship case', 'Non-payable', 'Withdrawal', 'Manual payment', 'Bridging payments', 'Other admin', 'Bank account anomaly', 'Recovery', 'Top up' ];
    break;
  case 'sfi pilot':
    expectedOptions = ['Dax rejection', 'Migrated hold', 'Ex-gratia', 'Hardship case', 'Non-payable', 'Withdrawal', 'Manual payment', 'Bridging payments', 'Other admin', 'Bank account anomaly', 'Recovery', 'Top up'];
    break;
  case 'sfi22':
    expectedOptions = ['Dax rejection', 'Ex-gratia', 'Hardship case', 'Non-payable', 'Withdrawal', 'Manual payment', 'Bridging payments', 'Other admin', 'Bank account anomaly', 'Recovery', 'Top up'];
    break;
  default:
    throw new Error(`Scheme "${scheme}" is not recognized.`);
  }
  paymentHoldsPage.schemeFilterBox().select(scheme);
  cy.wait(1000); // Wait for options to load

  for (let i = 0; i < expectedOptions.length; i++) {
    cy.contains(expectedOptions[i]);
    console.log('Option - ' + expectedOptions[i] + ' is visible');
    cy.log('Option - ' + expectedOptions[i] + ' is visible');
  }

  console.log(`Expected options for ${scheme} scheme are displayed: ${expectedOptions.join(', ')}`);
  cy.log(`Expected options for ${scheme} scheme are displayed: ${expectedOptions.join(', ')}`);
});



Then('the payment requests related to the {string} CSV are not in the table', (file) => {
  cy.fixture(file).then((csvData) => {
    const frnValues = csvData
      .trim()
      .split(/\r?\n/)
      .map((line) => line.split(',')[0].trim());

    cy.get('body').then(($body) => {
      if ($body.text().includes('There are no payment holds.')) {
        cy.log('No payment holds message is displayed');
        cy.contains('There are no payment holds.').should('be.visible');
      } else {
        paymentHoldsPage.allFirstColumnCells().then(($cells) => {
          const tableValues = [...$cells].map((cell) => cell.innerText.trim());

          frnValues.forEach((frnValue) => {
            cy.log(`Checking that table does not contain: ${frnValue}`);
            expect(tableValues).to.not.include(frnValue);
          });
        });
      }
    });
  });
});