import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'
import manualPaymentsPage from '../pages/manualPaymentsPage'



When(/^on the Manual Payments page I enter "(.*)" as the file to upload$/, (fileName) => {

  Cypress.emit('log:step', 'on the Manual Payments page I enter ' + fileName + ' as the file to upload')

  if (fileName.includes('Duplicate')) {

    cy.get('#main-content > div > div > div > div > table > tbody > tr:nth-child(1) > td:nth-child(2)')
      .invoke('text')
      .then((text) => {
        const originalFileName = text.trim()
        const originalFilePath = `cypress/fixtures/${originalFileName}`

        // Read the previously uploaded file without modifying it
        cy.readFile(originalFilePath, null).then((contents) => {
          manualPaymentsPage.fileInput().selectFile({
            contents,
            fileName: originalFileName,
            mimeType: 'text/csv',
            lastModified: Date.now()
          }, { force: true })
        })
      })

  } else if (fileName.includes('TEST') || fileName.includes('Invalid')) {

    const originalPath = 'cypress/fixtures/' + fileName
    manualPaymentsPage.fileInput().selectFile(originalPath, { force: true })

  } else if (fileName.includes('Empty')) {

    // Build timestamp string yyyyMMddHHmm
    const now = new Date()
    const yyyy = now.getFullYear()
    const MM = String(now.getMonth() + 1).padStart(2, '0')
    const dd = String(now.getDate()).padStart(2, '0')
    const HH = String(now.getHours()).padStart(2, '0')
    const mm = String(now.getMinutes()).padStart(2, '0')

    const timestamp = `${yyyy}${MM}${dd}${HH}${mm}`


    // Create new filename
    const tempFilename = `FFC_Manual_Batch_${timestamp}.csv`
    const tempPath = `cypress/fixtures/${tempFilename}`

    // Write the updated CSV to the new temp file
    cy.writeFile(tempPath, '')
    manualPaymentsPage.fileInput().selectFile(tempPath, { force: true })

  } else {

    const originalPath = 'cypress/fixtures/' + fileName

    cy.readFile(originalPath, 'utf8').then((csvText) => {
      const lines = csvText.split('\n')


      // Helper: increment a Z + 7 digits value
      const incrementZValue = (value) => {
        const number = parseInt(value.substring(1), 10) + 1
        const padded = number.toString().padStart(7, '0')
        return `Z${padded}`
      }

      // Update all rows
      const updatedRows = lines.map((row) => {
        if (!row.trim()) {
          return row
        }

        const cols = row.split(',')

        cols[1] = parseInt(cols[1]) + 1
        cols[3] = incrementZValue(cols[3])
        cols[17] = parseInt(cols[17]) + 1

        return cols.join(',')
      })

      const updatedCsv = updatedRows.join('\n')

      // Overwrite original file
      cy.writeFile(originalPath, updatedCsv)

      // Build timestamp string yyyyMMddHHmm
      const now = new Date()
      const yyyy = now.getFullYear()
      const MM = String(now.getMonth() + 1).padStart(2, '0')
      const dd = String(now.getDate()).padStart(2, '0')
      const HH = String(now.getHours()).padStart(2, '0')
      const mm = String(now.getMinutes()).padStart(2, '0')

      const timestamp = `${yyyy}${MM}${dd}${HH}${mm}`

      let filePrefix

      if (fileName.includes('Text')) {
        filePrefix = 'txt'
      } else {
        filePrefix = 'csv'
      }

      // Create new filename
      const tempFilename = `FFC_Manual_Batch_${timestamp}.${filePrefix}`
      const tempPath = `cypress/fixtures/${tempFilename}`

      //saves a local copy of this file we uploaded, this is run specific, only for the passing scenario
      if (fileName === 'FFC_Manual_Batch_Correct.csv') {

        Cypress.env('uploadedManualPaymentFile', tempPath)

        Cypress.env('uploadedManualPaymentFilename', tempFilename)

      }
      // Write the updated CSV to the new temp file
      cy.writeFile(tempPath, updatedCsv)
      manualPaymentsPage.fileInput().selectFile(tempPath, { force: true })
    })

  }

  cy.log(`The file ${fileName} is attached successfully`)
  console.log(`The file ${fileName} is attached successfully`)
})

When(/^on the Manual Payments page I click the "(.*)"$/, (button) => {

  Cypress.emit('log:step', 'on the Manual Payments page I click the ' + button)
  switch (button) {
  case 'upload button': manualPaymentsPage.uploadBtn().click(); break
  case 'manual payments guidance link': manualPaymentsPage.manualPaymentsGuidanceLink().click(); break
  case 'return button': manualPaymentsPage.returnButton().click(); break
  }

  cy.log(`Clicked on the ${button} successfully`)
  console.log(`Clicked on the ${button} successfully`)
})

Then(/^on the Manual Payments page I confirm that "(.*)" is present$/, (element) => {

  Cypress.emit('log:step', 'on the Manual Payments page I confirm that ' + element + ' is present')
  switch (element) {
  case 'page title':
    manualPaymentsPage.pageTitle().should('be.visible').haveWithoutWhitespace('Upload manual payments'); break
  case 'page description':
    manualPaymentsPage.pageDescription().should('be.visible').containsWithoutWhitespace( 'Upload payment files to be manually processed. For more information on uploading manual payments, including the file format you can download'); break
  case 'choose file button':
    manualPaymentsPage.chooseFileBtn().should('be.visible').and('have.attr', 'type', 'button'); break
  case 'upload button':
    manualPaymentsPage.uploadBtn().should('be.visible').and('have.attr', 'type', 'submit'); break
  case 'manual payments guidance link':
    manualPaymentsPage.manualPaymentsGuidanceLink().should('be.visible').containsWithoutWhitespace( 'manual payments guidance (PDF, 2MB)'); break
  case 'upload history table':
    manualPaymentsPage.uploadHistoryTable().should('be.visible'); break
  default:
    throw new Error('invalid element')
  }

  console.log('Confirmed that ' + element + ' is present on the Manual Payments page')
  cy.log('Confirmed that ' + element + ' is present on the Manual Payments page')
})

Then(/^on the Manual Payments page I confirm that entry with filename "(.*)" has been added to Upload History$/, (filename) => {

  Cypress.emit('log:step', 'on the Manual Payments page I confirm that entry with filename ' + filename + ' has been added to Upload History')
  manualPaymentsPage.uploadHistoryFilename().should('be.visible').containsWithoutWhitespace( filename)

  console.log('Confirmed that entry with filename ' + filename + ' has been added to Upload History')
  cy.log('Confirmed that entry with filename ' + filename + ' has been added to Upload History')
})

// Waits for the timestamped file to appear in Upload History.
// Clicks the correct View payment status row.
// Reads all FRNs from the uploaded file.
// Waits until the last FRN appears on the page (indicating processing is complete) (one to watch if issues arrive with this function as i'm not confident at all that this is how the processing works).
// Validates all FRNs.

Then(/^on the Manual Payments page I click the View payment status link and confirm that expected FRN values are present$/,() => {
  Cypress.emit('log:step','on the Manual Payments page I click the View payment status link and confirm that expected FRN values are present')

  const uploadedFile = Cypress.env('uploadedManualPaymentFile')
  const fileName = Cypress.env('uploadedManualPaymentFilename')

  const waitForFileAndOpenStatus = (attempt = 1) => {
    cy.log(`Looking for filename: ${fileName}`)



    cy.get('body').then(($body) => {

      cy.log($body.text().substring(0, 500))

    })
    cy.reload()

    cy.get('body').then(($body) => {
      if ($body.text().includes(fileName)) {
        cy.contains('td', fileName)
          .parents('tr')
          .within(() => {
            cy.contains('View payment status')
              .scrollIntoView()
              .click()
          })
      } else if (attempt < 60) {
        cy.wait(10000)
        Cypress.emit('log:step', `Looking for filename ${fileName}`)
        waitForFileAndOpenStatus(attempt + 1)
      } else {
        throw new Error(
          `Timed out waiting for upload history entry ${fileName}`
        )
      }
    })
  }

  waitForFileAndOpenStatus()

  cy.readFile(uploadedFile).then((text) => {
    const frns = text
      .trim()
      .split('\n')
      .map(row => row.split(',')[1])

    const lastFrn = frns[frns.length - 1]

    const waitForAllFrns = (attempt = 1) => {
      cy.reload()

      cy.get('body').then(($body) => {
        cy.log(`Looking for FRN ${lastFrn}`)
        if ($body.text().includes(lastFrn)) {
          frns.forEach((frn) => {
            cy.contains(frn).should('be.visible')
          })
        } else if (attempt < 30) {
          cy.wait(10000)
          Cypress.emit('log:step', `Waiting for FRN ${lastFrn}`)
          waitForAllFrns(attempt + 1)
        } else {
          throw new Error(
            `Timed out waiting for all FRNs to be processed. Missing ${lastFrn}`
          )
        }
      })
    }

    waitForAllFrns()
  })
}
)

Then('I clean up generated manual payment files', () => {
  cy.task('deleteGeneratedManualPaymentFiles')
})