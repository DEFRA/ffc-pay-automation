import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'
import requestEditor from '../pages/requestEditorPage'
import capturePage from '../pages/capturePage'


//takes data from cucumber steps and aligns it with form on request editor
When('I create a new reporting dataset with the following values', (datatable) => {

  Cypress.emit('log:step', 'I create a new reporting dataset with the following values')
  datatable.hashes().forEach(dataset => {
    requestEditor.createDataset(dataset)
  })
})


//verifies data is showing correctly on request editor confirmation screen
When( 'I verify my new reporting dataset with the following values', (datatable) => {
  requestEditor.verifyDatasetSummary(
    datatable.hashes()[0]
  )
}
)

//verifies data is showing correctly on awaiting payment data enrich screen
When( 'I verify my data to be enriched is correct', (datatable) => {
  requestEditor.verifyAwaitingDatasetSummary(
    datatable.hashes()[0]
  )
})

When( 'I verify my enrichment request is correct', (datatable) => {
  requestEditor.verifyEnrichmentData(
    datatable.hashes()[0]
  )
}

)

// Verifies data is showing correctly in awaiting payment data screen in the table
When( 'I verify my new awaiting payment data with the following values', (datatable) => {
  requestEditor.verifyAwaitingReportingData(
    datatable.hashes()[0]
  )
}
)

//generic success message verification, also checks url is correct
Then('I see a success message for {string}', (successMessage) => {
  cy.url().should('include', 'debtAdded=true')
  cy.assertSuccessBanner(successMessage)
})

//saves a var of how many datasets are currently present
Then('I note the number of datasets displayed', () => {
  Cypress.emit('log:step', 'I note the number of datasets displayed')
  cy.noteTableRowCount()
})

//verifies that the number of database entries increases after entering in new dataset
Then('I should see one more dataset in the table', () => {
  cy.assertTableRowCountIncreasedBy(
    'initialDatasetCount'
  )
})

//ensures that the value is present in table, reusable for any value (FRN, agreement number, scheme ETC)
Then('the dataset value {string} should be present', (value) => {
  requestEditor.assertRowPresent(value)
})



//Checks for the schemes based on the input given in the actual feature file. Can't use the saved file in /common/paymentholds.data.js because they don't match, atleast for now

Then('I should see the following schemes:', (dataTable) => {
  Cypress.emit('log:step', 'I should see the following schemes:')
  dataTable.hashes().forEach(row => {
    requestEditor.assertSchemeExists(
      row['Scheme Name']
    )
  })
})


//Verifies csv downloads successfully
Then('the extract is downloaded', () => {
  Cypress.emit('log:step', 'the extract is downloaded')
  const timeout = 15000
  cy.verifyDownloadedFile(
    'cypress/downloads/ffc-pay-debts-report.csv', timeout
  )
})

// simple page button clicker, valid inputs are next or previous
When('I click on the {string} page button', (button) => {
  Cypress.emit( 'log:step', 'I click on the ${button} page button')
  requestEditor.clickPageButton(button)
})



When(
  'I enter {string} as the debt discovered date',
  (date) => {

    const [day, month, year] = date.split('/')

    requestEditor.enterDateField(
      'debt-discovered-date',
      { day, month, year }
    )
  }
)






//########################################################################################################################

//Everything below here is a mess and needs fixed or deleted. These are used in dev env so i'm not going to delete them until I test dev
When(/^I search for FRN "(.*)"$/, (text) => {

  Cypress.emit('log:step', 'I search for FRN ' + text)
  requestEditor.getFrnSearchField().type(text)
})

When('I search for the FRN', () => {

  Cypress.emit('log:step', 'I search for the FRN')
  cy.get('@lastFRN').then((lastFRN) => {
    capturePage.captureTxtFrn().scrollIntoView().type(lastFRN+'{enter}')
  })
})

When('I enter the random FRN in the search field', () => {

  Cypress.emit('log:step', 'I enter the random FRN in the search field')
  cy.get('@frn').then((frn) => {
    requestEditor.getFrnSearchField().type(frn)
  })
})

When('I enter the newly generated FRN in the search field', () => {

  Cypress.emit('log:step', 'I enter the newly generated FRN in the search field')
  const updatedFRN = Cypress.env('updatedMessageBody').frn
  requestEditor.getFrnSearchField().type(updatedFRN)
})

Then('I should see the first FRN in the results matches the random FRN', () => {

  Cypress.emit('log:step', 'I should see the first FRN in the results matches the random FRN')
  cy.get('@frn').then((frn) => {
    requestEditor.firstFRN().should('have.text', frn)
  })
})

Then('I should see the first FRN in the results matches the newly generated FRN', () => {

  Cypress.emit('log:step', 'I should see the first FRN in the results matches the newly generated FRN')
  const updatedFRN = Cypress.env('updatedMessageBody').frn
  requestEditor.firstFRN().should('have.text', updatedFRN)
})

Then('I click on the FRN search button', () => {

  Cypress.emit('log:step', 'I click on the FRN search button')
  requestEditor.getFrnSearchButton().click()
})

When(/^I can see FRN "(.*)" in the table$/, (text) => {

  Cypress.emit('log:step', 'I can see FRN ' + text + ' in the table')
  requestEditor.firstFRNManualLedger().should('contain.text', text)
})

When('I can see the FRN in the table', () => {

  Cypress.emit('log:step', 'I can see the FRN in the table')
  cy.get('@lastFRN').then((lastFRN) => {
    requestEditor.firstFRN().should('have.text', lastFRN)
  })
})

When('I should see the first FRN in the results matches the last record FRN', () => {

  Cypress.emit('log:step', 'I should see the first FRN in the results matches the last record FRN')
  cy.get('@lastFRN').then((lastFRN) => {
    requestEditor.firstFRN().should('have.text', lastFRN)
  })
})

When('I should see the first capture FRN in the results matches the last record FRN', () => {

  Cypress.emit('log:step', 'I should see the first capture FRN in the results matches the last record FRN')
  cy.get('@lastFRN').then((lastFRN) => {
    requestEditor.firstCaptureFRN().should('have.text', lastFRN)
  })
})

Then('the application identifier field header is visible with text {string}', (text) => {

  Cypress.emit('log:step', 'the application identifier field header is visible with text ' + text)
  requestEditor.applicationIdentifierHeader().should('be.visible').invoke('text').then((textFromElement) => {
    expect(textFromElement.trim()).to.eq(text)
  })
})

Then('the application identifier hint is visible with text {string}', (text) => {

  Cypress.emit('log:step', 'the application identifier hint is visible with text ' + text)
  requestEditor.applicationIdentifierHint().should('be.visible').invoke('text').then((textFromElement) => {
    expect(textFromElement.trim()).to.eq(text)
  })
})

When('on the Payment Holds Page I select {string} from the number of records per page dropdown', (number) => {

  Cypress.emit('log:step', 'on the Payment Holds Page I select ' + number + ' from the number of records per page dropdown')
  requestEditor.paymentHoldsRecordsPerPageDropdown().scrollIntoView().select(number)
})

When('I select {string} from the number of records per page dropdown', (number) => {

  Cypress.emit('log:step', 'I select ' + number + ' from the number of records per page dropdown')
  requestEditor.recordsPerPageDropdown().scrollIntoView().select(number)
})


Then('I can see at most {int} records displayed in the table', (number) => {

  Cypress.emit('log:step', 'I can see at most ' + number + ' records displayed in the table')
  requestEditor.dataSetRecords().should('have.length.at.most', number)
})

Then('I can see {string} in the page box', number => {

  Cypress.emit('log:step', 'I can see ' + number + ' in the page box')
  requestEditor.pageNumber().scrollIntoView().should('contain.text', number)
})



Then('I can see the {string} button', btnText => {

  Cypress.emit('log:step', 'I can see the ' + btnText + ' button')
  if (btnText === 'Next') {
    requestEditor.btnNext().scrollIntoView().should('be.visible').and('contain.text', btnText)
  } else if (btnText === 'Previous') {
    requestEditor.btnPrevious().scrollIntoView().should('be.visible').and('contain.text', btnText)
  } else {
    throw new Error('Button not found')
  }
})

Then('I cannot see the {string} button', btnText => {

  Cypress.emit('log:step', 'I cannot see the ' + btnText + ' button')
  if (btnText === 'Next') {
    requestEditor.btnNext().should('not.exist')
  } else if (btnText === 'Previous') {
    requestEditor.btnPrevious().should('not.exist')
  } else {
    throw new Error('Button not found')
  }
})

When('I visit the last page', () => {

  Cypress.emit('log:step', 'I visit the last page')
  cy.task('clickNextButtonUntilOnLastPage')
})

When('I get the FRN of the last record', () => {

  Cypress.emit('log:step', 'I get the FRN of the last record')
  requestEditor.lastFRN().invoke('text').then((text) => {
    cy.wrap(text.trim()).as('lastFRN')
  })
})

When('I enter the last record FRN in the search field', () => {

  Cypress.emit('log:step', 'I enter the last record FRN in the search field')
  cy.get('@lastFRN').then((lastFRN) => {
    requestEditor.getFrnSearchField().type(lastFRN)
  })
})

When('I get the FRN of the last capture record', () => {

  Cypress.emit('log:step', 'I get the FRN of the last capture record')
  capturePage.lastCaptureFRN().invoke('text').then((text) => {
    cy.wrap(text.trim()).as('lastFRN')
  })
})

Then('I see the {string} application identifier error message', error => {

  Cypress.emit('log:step', 'I see the ' + error + ' application identifier error message')
  requestEditor.applicationIdentifierError().scrollIntoView().should('be.visible').and('contain.text', error)
})

Then('I see the {string} error summary title', (errorTitle) => {

  Cypress.emit('log:step', 'I see the ' + errorTitle + ' error summary title')
  requestEditor.errorSummaryTitle().scrollIntoView().should('be.visible').and('contain.text', errorTitle)
})

Then('I see the {string} error summary item', (errorItem) => {

  Cypress.emit('log:step', 'I see the ' + errorItem + ' error summary item')
  requestEditor.errorSummaryItem().scrollIntoView().should('be.visible').and('contain.text', errorItem)
})

Then('I make a note of the {string} count', (text) => {

  Cypress.emit('log:step', 'I make a note of the ' + text + ' count')
  cy.contains('.govuk-heading-m', text)
    .parent()
    .find('.govuk-heading-xl')
    .invoke('text')
    .then((count) => {
      cy.wrap(count.trim()).as(`${text}Count`)
    })
})

Then('the {string} count has increased by 1', (text) => {

  Cypress.emit('log:step', 'the ' + text + ' count has increased by 1')
  cy.wait(30000)
  cy.reload()
  cy.get(`@${text}Count`).then((oldCount) => {
    const previous = parseInt(oldCount, 10)

    cy.contains('.govuk-heading-m', text)
      .parent()
      .find('.govuk-heading-xl')
      .invoke('text')
      .then((newCountText) => {
        const current = parseInt(newCountText.trim(), 10)
        expect(current).to.eq(previous + 1)
      })
  })
})

Then('the {string} count has decreased by 1', (text) => {

  Cypress.emit('log:step', 'the ' + text + ' count has decreased by 1')
  cy.wait(20000)
  cy.reload()
  cy.get(`@${text}Count`).then((oldCount) => {
    const previous = parseInt(oldCount, 10)

    cy.contains('.govuk-heading-m', text)
      .parent()
      .find('.govuk-heading-xl')
      .invoke('text')
      .then((newCountText) => {
        const current = parseInt(newCountText.trim(), 10)
        expect(current).to.eq(previous - 1)
      })
  })
})



Then('I enter a valid debt discovered date in the past', () => {

  Cypress.emit('log:step', 'I enter a valid debt discovered date in the past')
  requestEditor.dayInput().clear().type('15')
  requestEditor.monthInput().clear().type('06')
  requestEditor.yearInput().clear().type('2018')
})

When('on the Awaiting Reporting Data page I click the FRN number search button', () => {

  Cypress.emit('log:step', 'on the Awaiting Reporting Data page I click the FRN number search button')
  requestEditor.awaitingRepFRNSearchBtn().click()
})