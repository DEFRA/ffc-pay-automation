/* global When, Then */
import paymentHoldsPage from '../pages/paymentHoldsPage';
import moment from 'moment/moment';

When('the {string} holds option is selected', (value) => {
  paymentHoldsPage.selectedOption().should('have.text', value);
});

When('I upload bulk payment holds file {string}', (file) => {
  paymentHoldsPage.fileInput().selectFile(`cypress/fixtures/${file}`);
});

When('I click the hold category option', () => {
  paymentHoldsPage.holdCategoryOption().click();
});

When('I click the Create bulk payment holds button', () => {
  paymentHoldsPage.btnSubmit().click();
});

Then('the new holds in {string} are visible along with the correct timestamp', (file) => {
  cy.fixture(file).then((csvData) => {
    const frnValues = csvData.split(',');

    frnValues.forEach((frnValue) => {
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