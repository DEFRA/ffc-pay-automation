/* global When, Then */

import agreementClosuresPage from '../pages/agreementClosuresPage';
import addBulkClosurePage from '../pages/addBulkClosurePage';
import addClosurePage from '../pages/addClosurePage';

When('I see the new submission in the table', () => {
  agreementClosuresPage.firstFRN().should('have.text', Cypress.env('frn'));

  agreementClosuresPage
    .firstAgreementNumber()
    .should('have.text', Cypress.env('agreementNumber'));

  // todo: Not sure where Scheme is set

  agreementClosuresPage
    .firstClosureDate()
    .should('have.text', Cypress.env('futureDate'));
});

Then('I should see a {string} link', (txt) => {
  agreementClosuresPage
    .linkRemoveSubmission()
    .should('be.visible')
    .and('have.text', txt);
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


When('I upload {string} file', (file) => {
  addBulkClosurePage.fileInput().selectFile(`cypress/fixtures/${file}`);
});

When('I click the {string} link', (text) => {
  if (text === 'upload in bulk') {
    addClosurePage.bulkUploadLink().click();
  } else if (text === 'Create') {
    addClosurePage.btnSubmit().click();
  } else {
    throw new Error('Invalid link');
  }
});

When('I type {string} in the {string} field', (text, field) => {
  if (field === 'FRN') {
    addClosurePage.frnInput().type(text);
    Cypress.env('frn', text);
  } else if (field === 'Agreement number') {
    addClosurePage.agreementNumberInput().type(text);
    Cypress.env('agreementNumber', text);
  } else {
    throw new Error('Invalid field');
  }
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