/* global When, Then */

import requestEditor from '../pages/requestEditorPage';
const dayjs = require('dayjs');
const { getEnvironmentConfig } = require('../../support/configLoader');
const envConfig = getEnvironmentConfig();

When('I create a new reporting dataset with the following values', (datatable) => {
  datatable.hashes().forEach((element) => {
    requestEditor.inputByValue(element.scheme).click();
    requestEditor.txtFrn().type(element.frn);
    if (element.agreementNumber !== '') {
      requestEditor.txtApplicationIdentifier().type(element.agreementNumber);
    }
    requestEditor.txtNetValue().type(element.netValue);
    requestEditor.inputByValue(element.typeOfDebt).click();

    if (element.dateDebtDiscovered === 'today') {
      const today = dayjs();
      const dayOfMonth = today.date();
      requestEditor.txtDay().type(dayOfMonth);

      const month = today.month();
      const monthNumber = month + 1;
      requestEditor.txtMonth().type(monthNumber);

      const year = today.year();
      requestEditor.txtYear().type(year);
    }
  });
});

Then('I make a note of the {string} count', (text) => {
  var item;

  switch (text) {
  case 'Unattached reporting datasets':
    item = 0;
    break;

  case 'Requests awaiting reporting data':
    item = 1;
    break;

  case 'Awaiting ledger assignment':
    item = 2;
    break;

  case 'Requests awaiting quality check':
    item = 3;
    break;

  default:
    throw new Error('Box title not found');
  }

  requestEditor
    .valueCount()
    .eq(item)
    .should('be.visible')
    .invoke('text').then(($count) => {
      cy.wrap(parseInt($count), { log: true }).as('initialCount');
    });
});

Then('the {string} count has increased by 1', (text) => {
  var item;

  switch (text) {
  case 'Unattached reporting datasets':
    item = 0;
    break;

  case 'Requests awaiting reporting data':
    item = 1;
    break;

  case 'Awaiting ledger assignment':
    item = 2;
    break;

  case 'Requests awaiting quality check':
    item = 3;
    break;

  default:
    throw new Error('Box title not found');
  }

  cy.reload();

  cy.get('@initialCount').then((initialCount) => {
    requestEditor
      .valueCount()
      .eq(item)
      .should('be.visible')
      .invoke('text').then(($count) => {
        const currentCount = parseInt($count);
        expect(currentCount).to.equal(initialCount + 1);
      });
  });
});

Then('I should see the following schemes:', (dataTable) => {
  dataTable.hashes().forEach(row => {
    requestEditor.getSchemeRadioButton(row['Scheme Name']).should('exist');
  });
});

Then('the extract is downloaded', () => {
  cy.readFile('cypress/downloads/ffc-pay-debts-report.csv');
});

When(/^I search for FRN "(.*)"$/, (text) => {
  requestEditor.getFrnSearchField().type(text);
});

When('I have a random FRN', () => {
  requestEditor.randomFRN().then(($cell) => {
    const frn = $cell.text();
    cy.wrap(frn).as('frn'); // Save the FRN for later steps
  });
});

When('I enter the random FRN in the search field', () => {
  cy.get('@frn').then((frn) => {
    requestEditor.getFrnSearchField().type(frn);
  });
});

Then('I should see the first FRN in the results matches the random FRN', () => {
  cy.get('@frn').then((frn) => {
    requestEditor.firstFRN().should('have.text', frn);
  });
});

Then('I click on the FRN search button', () => {
  requestEditor.getFrnSearchButton().click();
});

When(/^I can see FRN "(.*)" in the table$/, (text) => {
  requestEditor.firstFRN().should('have.text', text);
});

Then('the application identifier field header is visible with text {string}', (text) => {
  requestEditor.applicationIdentifierHeader().should('be.visible').invoke('text').then((textFromElement) => {
    expect(textFromElement.trim()).to.eq(text);
  });
});

Then('the application identifier hint is visible with text {string}', (text) => {
  requestEditor.applicationIdentifierHint().should('be.visible').invoke('text').then((textFromElement) => {
    expect(textFromElement.trim()).to.eq(text);
  });
});

When('I select {string} from the number of records per page dropdown', (number) => {
  cy.visit(envConfig.requestEditorUrl+'capture?perPage='+number);
});


When('I get the FRN of the last record', () => {
  requestEditor.firstFRN()
    .scrollIntoView()
    .invoke('text')
    .then((text) => {
      const trimmedText = text.trim();
      cy.wrap(trimmedText).as('lastFRN');
    });
});

When('I search for the FRN', () => {
  cy.get('@lastFRN').then((frn) => {
    requestEditor.getFrnSearchField().type(frn);
    requestEditor.getFrnSearchButton().click();
  });
});

When('I can see the FRN in the table', () => {
  cy.get('@lastFRN').then((frn) => {
    requestEditor.firstFRN().should('have.text', frn);
  });
});

Then('I can see {int} records displayed in the table', (number) => {
  requestEditor.dataSetRecords().should('have.length', number);
});

Then('I can see {string} in the page box', number => {
  requestEditor.pageNumber().scrollIntoView().should('contain.text', number);
});

When('I click on the {string} page button', txt => {
  if (txt === 'Next') {
    requestEditor.btnNext().click({ force: true });
  } else {
    throw new Error('Button not found');
  }
});

Then('I can see the {string} button', btnText => {
  if (btnText === 'Next') {
    requestEditor.btnNext().scrollIntoView().should('be.visible').and('contain.text', btnText);
  } else if (btnText === 'Previous') {
    requestEditor.btnPrevious().scrollIntoView().should('be.visible').and('contain.text', btnText);
  } else {
    throw new Error('Button not found');
  }
});

Then('I cannot see the {string} button', btnText => {
  if (btnText === 'Next') {
    requestEditor.btnNext().should('not.exist');
  } else if (btnText === 'Previous') {
    requestEditor.btnPrevious().should('not.exist');
  } else {
    throw new Error('Button not found');
  }
});

When('I visit the last page', () => {
  cy.clickNextButtonUntilOnLastPage();
});

Then('I see the {string} application identifier error message', error => {
  requestEditor.applicationIdentifierError().scrollIntoView().should('be.visible').and('contain.text', error);
});

Then('I see the {string} error summary title', (errorTitle) => {
  requestEditor.errorSummaryTitle().scrollIntoView().should('be.visible').and('contain.text', errorTitle);
});

Then('I see the {string} error summary item', (errorItem) => {
  requestEditor.errorSummaryItem().scrollIntoView().should('be.visible').and('contain.text', errorItem);
});