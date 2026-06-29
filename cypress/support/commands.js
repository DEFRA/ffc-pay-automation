
import requestEditor from '../e2e/pages/requestEditorPage'

Cypress.Commands.add('emptyFolder', (folderPath) => {
  cy.task('emptyFolder', folderPath).then((status) => {
    cy.log(status)
  })
})

Cypress.Commands.add('sendMessage', (messageBody, topicName) => {
  cy.task('sendMessage', { messageBody, topicName }).then((status) => {
    cy.log(status)
  })
})

Cypress.Commands.add('sendMessagesBatch', (messages, topicName) => {
  cy.task('sendMessagesBatch',  messages, topicName)
})

Cypress.Commands.add('startMessageReception', (topicName) => {
  cy.task('startMessageReception', topicName)
})

Cypress.Commands.add('fetchReceivedMessages', (topicName) => {
  return cy.task('fetchReceivedMessages', topicName)
})

Cypress.Commands.add('stopMessageReception', () => {
  cy.task('stopMessageReception')
})

Cypress.Commands.add('generateJWT', () => {
  return cy.task('generateJWT')
})

Cypress.Commands.add('generateAccessToken', () => {
  return cy.task('generateAccessToken')
})

Cypress.Commands.add('clickNextButtonUntilOnLastPage', () => {
  cy.get('body').then((body) => {
    if (body.find('[rel="next"] > .govuk-pagination__link-title').length > 0) {
      requestEditor.btnNext().scrollIntoView().click({ force: true })
      cy.task('clickNextButtonUntilOnLastPage')
    }
  })
})

Cypress.Commands.add('startDPSService', () => {
  cy.task('startDPSService', null, { timeout: 15 * 60 * 1000 }).then((output) => {
    const lines = output.split('\n')
    lines.forEach((line) => {
      if (line.trim()) {
        console.log(line)
      }
    })
  })
})

Cypress.Commands.add('restartLocalEnv', () => {
  cy.task('restartLocalEnv', null, { timeout: 15 * 60 * 1000 }).then((output) => {
    const lines = output.split('\n')
    lines.forEach((line) => {
      if (line.trim()) {
        console.log(line)
      }
    })
  })
})

Cypress.Commands.add('restartLocalDocEnv', () => {
  cy.task('restartLocalDocEnv', null, { timeout: 15 * 60 * 1000 }).then((output) => {
    const lines = output.split('\n')
    lines.forEach((line) => {
      if (line.trim()) {
        console.log(line)
      }
    })
  })
})

Cypress.Commands.add('startLocalDocEnv', () => {
  cy.task('startLocalDocEnv', null, { timeout: 15 * 60 * 1000 })
})

Cypress.Commands.add('closeAllServices', () => {
  cy.task('closeAllServices', null, { timeout: 15 * 60 * 1000 }).then((output) => {
    const lines = output.split('\n')
    lines.forEach((line) => {
      if (line.trim()) {
        console.log(line)
      }
    })
  })
})

Cypress.Commands.add('databaseQuery', (env, databaseName, sqlStatement) => {
  cy.task('databaseQuery', env, databaseName, sqlStatement)
})

Cypress.Commands.add('databaseInsert', (env, databaseName, sqlStatement) => {
  cy.task('databaseInsert', env, databaseName, sqlStatement)
})

Cypress.Commands.add('fetchStatementsBlobById', (env, container, dir, year) => {
  cy.task('fetchStatementsBlobById', env, container, dir, year)
})

Cypress.Commands.add('fetchPaymentsBlobById', (env, container, dir, scheme) => {
  cy.task('fetchPaymentsBlobById', env, container, dir, scheme)
})

Cypress.Commands.add('uploadFileToBlobStorage', (env, container, dir, scheme) => {
  cy.task('uploadFileToBlobStorage', env, container, dir, scheme)
})

Cypress.Commands.add('getPodLogs', (namespace, label) => {
  cy.task('getPodLogs', namespace, label).then((logs) => {
    logs.split('\n').forEach((line) => {
      if (line.trim()) {
        console.log(line)
      }
    })
  })
})

Cypress.Commands.add('getDockerLogs', () => {
  cy.task('getDockerLogs').then((logs) => {
    logs.split('\n').forEach((line) => {
      if (line.trim()) {
        console.log(line)
      }
    })
  })
})


Cypress.Commands.add('clickBreadcrumb', (breadcrumbText) => {
  cy.get('.govuk-breadcrumbs')
    .should('be.visible')
    .within(() => {
      cy.get('a.govuk-breadcrumbs__link')
        .contains(new RegExp(`^\\s*${breadcrumbText.trim()}\\s*$`))
        .should('be.visible')
        .click()
    })
})


Cypress.Commands.add('assertSuccessBanner', (message) => {
  cy.get('.govuk-notification-banner')
    .should('be.visible')
    .within(() => {
      cy.contains('Success')
      cy.contains(message)
    })
})


Cypress.Commands.add('noteTableRowCount', (alias = 'initialDatasetCount') => {
  cy.get('body').then(($body) => {
    const rowCount = $body.find('table tbody tr').length

    cy.wrap(rowCount).as(alias)
  })
})

Cypress.Commands.add(
  'assertTableRowCountIncreasedBy',
  (alias, increaseBy = 1) => {
    cy.get(`@${alias}`).then((initialCount) => {
      cy.get('table tbody tr')
        .should('have.length', initialCount + increaseBy)
    })
  }
)

Cypress.Commands.add('verifyDownloadedFile', (
  filePath,
  timeout
) => {
  cy.readFile(filePath, timeout )
})