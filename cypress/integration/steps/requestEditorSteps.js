/* global When, Then */

import requestEditor from '../pages/requestEditorPage';
import capturePage from '../pages/capturePage';
const dayjs = require('dayjs');

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

Then('I make a note of the dataset count', () => {
  requestEditor
    .unattachedReportingDatasetsCount()
    .should('be.visible')
    .invoke('text').then(($datasetCount) => {
      cy.wrap(parseInt($datasetCount), { log: true }).as('initialDatasetCount');
    });
});

Then('the dataset count has increased by 1', () => {
  cy.get('@initialDatasetCount').then((initialCount) => {
    requestEditor
      .unattachedReportingDatasetsCount()
      .should('be.visible')
      .invoke('text').then(($datasetCount) => {
        const currentCount = parseInt($datasetCount);
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
  cy.readFile('cypress/downloads/ffc-pay-debts-report.csv', { timeout: 15000 });
});

When(/^I search for FRN "(.*)"$/, (text) => {
  requestEditor.getFrnSearchField().type(text);
});

When('I search for the FRN', () => {
  cy.get('@lastFRN').then((lastFRN) => {
    capturePage.captureTxtFrn().scrollIntoView().type(lastFRN+'{enter}');
  });
});

When('I enter the random FRN in the search field', () => {
  cy.get('@frn').then((frn) => {
    requestEditor.getFrnSearchField().type(frn);
  });
});

When('I enter the newly generated FRN in the search field', () => {
  const updatedFRN = Cypress.env('updatedMessageBody').frn;
  requestEditor.getFrnSearchField().type(updatedFRN);
});

Then('I should see the first FRN in the results matches the random FRN', () => {
  cy.get('@frn').then((frn) => {
    requestEditor.firstFRN().should('have.text', frn);
  });
});

Then('I should see the first FRN in the results matches the newly generated FRN', () => {
  const updatedFRN = Cypress.env('updatedMessageBody').frn;
  requestEditor.firstFRN().should('have.text', updatedFRN);
});

Then('I click on the FRN search button', () => {
  requestEditor.getFrnSearchButton().click();
});

When(/^I can see FRN "(.*)" in the table$/, (text) => {
  requestEditor.firstFRNManualLedger().should('have.text', text);
});

When('I can see the FRN in the table', () => {
  cy.get('@lastFRN').then((lastFRN) => {
    requestEditor.firstFRN().should('have.text', lastFRN);
  });
});

When('I should see the first FRN in the results matches the last record FRN', () => {
  cy.get('@lastFRN').then((lastFRN) => {
    requestEditor.firstFRN().should('have.text', lastFRN);
  });
});

When('I should see the first capture FRN in the results matches the last record FRN', () => {
  cy.get('@lastFRN').then((lastFRN) => {
    requestEditor.firstCaptureFRN().should('have.text', lastFRN);
  });
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
  requestEditor.recordsPerPageDropdown().scrollIntoView().select(number);
});


Then('I can see at most {int} records displayed in the table', (number) => {
  requestEditor.dataSetRecords().should('have.length.at.most', number);
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

When('I get the FRN of the last record', () => {
  requestEditor.lastFRN().invoke('text').then((text) => {
    cy.wrap(text.trim()).as('lastFRN');
  });
});

When('I get the FRN of the last capture record', () => {
  capturePage.lastCaptureFRN().invoke('text').then((text) => {
    cy.wrap(text.trim()).as('lastFRN');
  });
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

Then('I click on the {string} provisional values radio button', (radioButton) => {
  if (radioButton === 'Yes') {
    requestEditor.yesProvisionalValuesRadioButton().scrollIntoView().click();
  } else if (radioButton === 'No') {
    requestEditor.noProvisionalValuesRadioButton().scrollIntoView().click();
  } else {
    throw new Error('Radio button not found');
  }
});

Then('I click on the {string} edited correctly radio button', (radioButton) => {
  if (radioButton === 'Yes') {
    requestEditor.yesEditedCorrectlyRadioButton().scrollIntoView().click();
  } else if (radioButton === 'No') {
    requestEditor.noEditedCorrectlyRadioButton().scrollIntoView().click();
  } else {
    throw new Error('Radio button not found');
  }
});