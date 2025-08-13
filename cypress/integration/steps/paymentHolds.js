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

    frnValues.forEach((frnValue) => {
      requestEditor.getFrnSearchField().clear().type(frnValue);
      requestEditor.getFrnSearchButton().click();
      cy.contains('td', frnValue).then((td) => {
        if (td.length > 0) {
          const row = td.closest('tr');
          const today = moment().format('DD/MM/YYYY');
          cy.wrap(row).contains('td', today);
        }
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
    .and('contain.text', 'There was a problem');
  paymentHoldsPage
    .bulkUploadErrorMessage()
    .should('be.visible')
    .and('contain.text', errMsg);
});

When('the user selects to {string} holds', (option) => {
  paymentHoldsPage.sltAddRemoveHolds().select(option);
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