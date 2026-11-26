
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

Cypress.Commands.add('restartLocalPayEnv', () => {
  cy.task('restartPayLocalEnv', null, { timeout: 15 * 60 * 1000 }).then((output) => {
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
Cypress.Commands.add('restartStatementData', () => {
  cy.task('restartStatementData', null, {
    timeout: 5 * 60 * 1000
  }).then(output => {
    output.split('\n').forEach(line => {
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

Cypress.Commands.add('assertErrorBanner', (message) => {
  cy.get('.govuk-error-summary')
    .should('be.visible')
    .within(() => {
      cy.contains('There is a problem')
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
  timeout = 15000
) => {
  cy.readFile(filePath, { timeout })
})


Cypress.Commands.add(
  'containsWithoutWhitespace',
  { prevSubject: true },
  (subject, expectedText) => {
    cy.wrap(subject)
      .invoke('text')
      .then((text) => {
        const actual = text.replace(/\s+/g, ' ').trim()
        const expected = expectedText.replace(/\s+/g, ' ').trim()

        expect(actual).to.contain(expected)
      })

    return cy.wrap(subject)
  }
)

Cypress.Commands.add(
  'haveWithoutWhitespace',
  { prevSubject: true },
  (subject, expectedText) => {
    cy.wrap(subject)
      .invoke('text')
      .then((text) => {
        const actual = text.replace(/\s+/g, ' ').trim()
        const expected = expectedText.replace(/\s+/g, ' ').trim()

        expect(actual).to.equal(expected)
      })

    return cy.wrap(subject)
  }
)

// Custom click command that handles async re-renders and page navigation
Cypress.Commands.add('stableClick', { prevSubject: true }, (subject) => {
  cy.wrap(subject)
    .should('be.visible')
    .should('not.be.disabled')
    .then(($el) => {
      // Wait for any pending animations/transitions
      cy.wrap($el).invoke('css', 'transition', 'none')

      // Get the element's bounding rect to ensure it's in viewport
      const rect = $el[0].getBoundingClientRect()
      if (rect.height === 0 || rect.width === 0) {
        throw new Error('Element has zero height/width')
      }

      // Click with force to bypass visibility checks during async updates
      cy.wrap($el).click({force: true})
    })
    // Wait for the page to process the click and any resulting navigation
    .then(() => {
      cy.wait(1000)
    })

  return cy.wrap(subject)
})

// Alternative: Click by text with stability checks
Cypress.Commands.add('clickByTextStable', (text) => {
  // Wait for the element to exist and be stable
  cy.contains(text, {timeout: 15000})
    .should('exist')
    .should('be.visible')
    .then(($el) => {
      // Ensure element is in viewport
      $el[0].scrollIntoView({behavior: 'auto', block: 'center'})
    })
    .should('not.be.disabled')
    // Add a small delay to let any re-renders complete
    .then(() => {
      cy.wait(300)
    })
    // Then click with force
    .click({force: true, timeout: 10000})
    // Wait for navigation to complete
    .then(() => {
      cy.wait(1000)
    })
})