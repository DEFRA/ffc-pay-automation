/* global When, Then */

import agreementClosuresPage from '../pages/agreementClosuresPage';
import addBulkClosurePage from '../pages/addBulkClosurePage';
import addClosurePage from '../pages/addClosurePage';
import paymentHoldsPage from '../pages/paymentHoldsPage';
import reportsPage from '../pages/reportsPage';
import capturePage from '../pages/capturePage';

When('I see the new submission in the table', () => {
  cy.get('@randomFrn').then((randomFrn) => {
    agreementClosuresPage.lastFRN().should('have.text', randomFrn);

    agreementClosuresPage
      .lastAgreementNumber()
      .should('have.text', Cypress.env('agreementNumber'));

    agreementClosuresPage
      .lastClosureDate()
      .should('have.text', Cypress.env('futureDate'));
  });
});

When('I should not see the new submission in the table', () => {
  cy.get('@initialClosureCount').then((initialCount) => {
    if (initialCount === 0) {
      cy.contains('There are no agreement closures.').should('be.visible');
    } else {
      cy.get('@randomFrn').then((randomFrn) => {
        agreementClosuresPage.lastFRN().should('not.have.text', randomFrn);
      });
    }
  });
});

When('I see the new bulk upload submissions in the table', () => {
  cy.fixture('bulkUploadValid.csv').then((csvData) => {
    const rows = csvData.trim().split('\n');
    const data = rows.map((row) => row.split(',')).reverse();

    data.forEach((row, index) => {
      const [frn] = row.map(cell => cell.trim());

      // eslint-disable-next-line cypress/no-assigning-return-values
      const rowSelector = cy.get('.govuk-table__row').eq(-1 - index);

      rowSelector.find('.govuk-table__cell').eq(0).should('have.text', frn);
    });
  });
});

Then('I should see a {string} link', (txt) => {
  agreementClosuresPage
    .linkRemoveSubmission()
    .should('be.visible')
    .and('contain.text', txt);
});

Then('I should see the {string} field', (field) => {
  switch (field) {
  case 'Firm reference number (FRN)':
    agreementClosuresPage
      .lblFRN()
      .should('be.visible')
      .and('contain.text', field);
    agreementClosuresPage.txtFRN().should('be.visible');
    addBulkClosurePage
      .fieldHint()
      .eq(0)
      .should('be.visible')
      .and('contain.text', 'Enter a 10-digit FRN');
    break;

  case 'Agreement number':
    agreementClosuresPage
      .lblAgreementNumber()
      .should('be.visible')
      .and('contain.text', field);
    agreementClosuresPage.txtAgreementNumber().should('be.visible');
    addBulkClosurePage
      .fieldHint()
      .eq(1)
      .should('be.visible')
      .and('contain.text', 'Ensure that any leading 0s are included');
    break;

  case 'Closure date':
    agreementClosuresPage
      .lblClosureDate()
      .should('be.visible')
      .and('contain.text', 'What date should the closure be active from?');
    agreementClosuresPage.txtDateDay().should('be.visible');
    agreementClosuresPage.txtDateMonth().should('be.visible');
    agreementClosuresPage.txtDateYear().should('be.visible');
    addBulkClosurePage
      .fieldHint()
      .eq(2)
      .should('be.visible')
      .and('contain.text', 'For example, 27 11 2023');
    break;

  default:
    throw new Error('Field not found');
  }
});

When('I click on the Remove button next to the new submission', () => {
  cy.get('@randomFrn').then((randomFrn) => {
    capturePage.tableRows().contains('td', randomFrn).parent().contains('Remove').click();
  });
});


When('I upload {string} file', (file) => {
  addBulkClosurePage.fileInput().selectFile(`cypress/fixtures/${file}`);
});

When('I click the {string} link', (text) => {
  if (text === 'upload in bulk') {
    addClosurePage.bulkUploadLink().click();
  } else if (text === 'upload single') {
    addClosurePage.singleUploadLink().click();
  } else if (text === 'Create') {
    addClosurePage.btnSubmit().click();
  } else if (text === 'Add or remove holds in bulk') {
    paymentHoldsPage.btnAddRemoveHoldsInBulk().click();
  } else {
    throw new Error('Invalid link');
  }
});

When('I type {string} in the {string} field', (text, field) => {
  if (field === 'FRN') {
    if (text) {
      addClosurePage.frnInput().type(text);
    }
    Cypress.env('formData', { ...Cypress.env('formData'), frn: text });
    Cypress.env('frn', text);
  } else if (field === 'Agreement number') {
    addClosurePage.agreementNumberInput().type(text);
    Cypress.env('formData', { ...Cypress.env('formData'), agreementNumber: text });
    Cypress.env('agreementNumber', text);
  } else if (field === 'year') {
    addClosurePage.closureDateYearInput().type(text);
    Cypress.env('formData', { ...Cypress.env('formData'), year: text });
  } else if (field === 'prn') {
    if (text) {
      reportsPage.prnField().type(text);
      Cypress.env('formData', { ...Cypress.env('formData'), prn: text });
    } else {
      Cypress.env('formData', { ...Cypress.env('formData'), prn: '' });
    }
  } else {
    throw new Error('Invalid field');
  }
});

When('I type a random FRN in the FRN field', () => {
  const generateNumber = (digits) => {
    return ('0'.repeat(digits) + Math.floor(Math.random() * Math.pow(10, digits))).slice(-digits);
  };

  const randomFrn = `10${generateNumber(8)}`;

  addClosurePage.frnInput().type(randomFrn);
  cy.wrap(randomFrn, { log: true }).as('randomFrn');
});

When('I type a future date in the Closure date field', () => {
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + 1); // Add 1 day

  const formatDate = (date) => date.toString().padStart(2, '0');
  const futureDay = formatDate(futureDate.getDate());
  const futureMonth = formatDate(futureDate.getMonth() + 1);
  const futureYear = futureDate.getFullYear().toString();

  const formattedDate = `${futureDay}/${futureMonth}/${futureYear}`;
  Cypress.env('futureDate', formattedDate);

  addClosurePage.closureDateDayInput().type(futureDay);
  addClosurePage.closureDateMonthInput().type(futureMonth);
  addClosurePage.closureDateYearInput().type(futureYear);
});

When('I type a date prior to {string} in the Closure date field', (date) => {
  const formatDate = (date) => date.toString().padStart(2, '0');

  const [day, month, year] = date.split('/').map(Number);
  const currentDate = new Date(year, month - 1, day);
  currentDate.setDate(currentDate.getDate() - 1); // Subtract 1 day

  const priorDay = formatDate(currentDate.getDate());
  const priorMonth = formatDate(currentDate.getMonth() + 1);
  const priorYear = currentDate.getFullYear().toString();

  addClosurePage.closureDateDayInput().type(priorDay);
  addClosurePage.closureDateMonthInput().type(priorMonth);
  addClosurePage.closureDateYearInput().type(priorYear);
});