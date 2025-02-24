import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import paymentHoldsPage from '../pages/paymentHoldsPage';
import requestEditor from '../pages/requestEditorPage';
import moment from 'moment/moment';

When('the {string} holds option is selected', (value) => {
  paymentHoldsPage.selectedOption().should('have.text', value);
});

When('I upload bulk payment holds file {string}', (file) => {
  const fixturePath = `cypress/fixtures/${file}`;
  const isInvalidFile = /invalid|txt/i.test(file); // Updated condition

  cy.readFile(fixturePath).then((oldContent) => {
    cy.log('Old CSV content:', oldContent);
  });

  if (!isInvalidFile) {
    const generateNumber = (digits) => {
      return ('0'.repeat(digits) + Math.floor(Math.random() * Math.pow(10, digits))).slice(-digits);
    };

    const newNumber1 = `10${generateNumber(8)}`;
    const newNumber2 = `10${generateNumber(8)}`;

    const newContent = `${newNumber1},${newNumber2}`;

    cy.writeFile(fixturePath, newContent).then(() => {
      cy.log('Fixture file has been overwritten with new numbers:');
      cy.log(newContent);
    });
  }

  paymentHoldsPage.fileInput().selectFile(fixturePath);
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

When('the user selects to {string} holds', (option) => {
  paymentHoldsPage.sltAddRemoveHolds().select(option);
});

Then('the payment requests related to the {string} CSV are not in the table', (file) => {
  cy.fixture(file).then((csvData) => {
    const frnValues = csvData.trim().split(/\r?\n/).map((line) => line.split(',')[0].trim());

    paymentHoldsPage.allFirstColumnCells().invoke('text').then((cellText) => {
      const tableValues = cellText.split(/\r?\n/).map((val) => val.trim());

      frnValues.forEach((frnValue) => {
        cy.log(`Checking that table does not contain: ${frnValue}`);
        expect(tableValues).to.not.include(frnValue);
      });
    });
  });
});