import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'
import agreementClosuresPage from '../pages/agreementClosures/agreementClosuresPage'
import addClosurePage from '../pages/agreementClosures/addClosurePage'
import capturePage from '../pages/capturePage'


When('I see the new submission in the table', () => {

  Cypress.emit('log:step', 'I see the new submission in the table')

  cy.get('@randomFrn').then((randomFrn) => {
    cy.contains(randomFrn).should('be.visible')
  })
})

When('I search for my new submission', () => {

  Cypress.emit('log:step', 'I search for my new submission')

  cy.get('@randomFrn').then((randomFrn) => {
    agreementClosuresPage.captureTxtFrn().scrollIntoView().type(randomFrn +'{enter}')
  })
})

When('I should not see the new submission in the table', () => {

  Cypress.emit('log:step', 'I should not see the new submission in the table')

  cy.get('@initialClosureCount').then((initialCount) => {
    if (initialCount === 0) {
      cy.contains('There are no agreement closures.').should('be.visible')
    } else {
      cy.get('@randomFrn').then((randomFrn) => {
        agreementClosuresPage.lastFRN().should('not.have.text', randomFrn)
      })
    }
  })
})

When('I see the new bulk upload submissions in the table', () => {

  Cypress.emit('log:step', 'I see the new bulk upload submissions in the table')

  cy.fixture('bulkUploadValid.csv').then((csvData) => {
    const rows = csvData.trim().split('\n')
    const data = rows.map((row) => row.split(',')).reverse()

    data.forEach((row) => {
      const [frn] = row.map(cell => cell.trim())

      agreementClosuresPage.agreementClosureEnterFrnField()
        .clear()
        .type(frn)

      cy.contains('button', 'Filter').click()

      cy.get('.govuk-table__body')
        .should('contain.text', frn)

    })
  })
})


When('I click on the Remove button next to the new submission', () => {

  Cypress.emit('log:step', 'I click on the Remove button next to the new submission')

  cy.get('@randomFrn').then((randomFrn) => {
    capturePage.tableRows().contains('td', randomFrn).parent().contains('Remove').click()
  })
})



When('I type a future date in the Closure date field', () => {

  Cypress.emit('log:step', 'I type a future date in the Closure date field')

  const futureDate = new Date()
  futureDate.setDate(futureDate.getDate() + 1) // Add 1 day

  const formatDate = (date) => date.toString().padStart(2, '0')
  const futureDay = formatDate(futureDate.getDate())
  const futureMonth = formatDate(futureDate.getMonth() + 1)
  const futureYear = futureDate.getFullYear().toString()

  const formattedDate = `${futureDay}/${futureMonth}/${futureYear}`
  Cypress.env('futureDate', formattedDate)

  addClosurePage.closureDateDayInput().type(futureDay)
  addClosurePage.closureDateMonthInput().type(futureMonth)
  addClosurePage.closureDateYearInput().type(futureYear)
})

When('I type a date prior to {string} in the Closure date field', (date) => {

  Cypress.emit('log:step', 'I type a date prior to ' + date + ' in the Closure date field')

  const formatDate = (date) => date.toString().padStart(2, '0')

  const [day, month, year] = date.split('/').map(Number)
  const currentDate = new Date(year, month - 1, day)
  currentDate.setDate(currentDate.getDate() - 1) // Subtract 1 day

  const priorDay = formatDate(currentDate.getDate())
  const priorMonth = formatDate(currentDate.getMonth() + 1)
  const priorYear = currentDate.getFullYear().toString()

  addClosurePage.closureDateDayInput().type(priorDay)
  addClosurePage.closureDateMonthInput().type(priorMonth)
  addClosurePage.closureDateYearInput().type(priorYear)
})

When('I enter frn {int} on the search for agreement closure page', (frn) => {
  agreementClosuresPage.agreementClosureEnterFrnField().type(frn)
})


//TODO - refactor these below commented into working again
//_______________________________________________________________________________________
// Then('I should see the number of closures', () => {

//   Cypress.emit('log:step', 'I should see the number of closures')
//   paymentManagementPage.noOfClosures().should('be.visible')
// })

// Then('I make a note of the closures count', () => {

//   Cypress.emit('log:step', 'I make a note of the closures count')
//   paymentManagementPage
//     .noOfClosures()
//     .should('be.visible')
//     .invoke('text').then(($closureCount) => {
//       cy.wrap(parseInt($closureCount), { log: true }).as('initialClosureCount')
//     })
// })

// Then('the closure count has increased by {int}', (increment) => {

//   Cypress.emit('log:step', 'the closure count has increased by ' + increment)
//   cy.get('@initialClosureCount').then((initialCount) => {
//     const expectedCount = Number(initialCount) + increment

//     paymentManagementPage
//       .noOfClosures()
//       .should('be.visible')
//       .invoke('text')
//       .then((text) => {
//         const currentCount = parseInt(text, 10)
//         expect(currentCount).to.equal(expectedCount)
//       })
//   })
// })

// Then('I should see {string} number of closures', (count) => {

//   Cypress.emit('log:step', 'I should see ' + count + ' number of closures')
//   paymentManagementPage
//     .noOfClosures()
//     .should('be.visible')
//     .containsWithoutWhitespace( count)
// })