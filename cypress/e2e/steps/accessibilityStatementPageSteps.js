import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'
import accessibilityStatementPage from '../pages/accessibilityStatementPage'

Then(/^on the Accessibility Statement Page I confirm that "(.*)" is displayed$/, (element) => {
  Cypress.emit('log:step', `on the Accessibility Statement Page I confirm that ${element} is displayed`)

  const verify = (method, texts) => {
    texts.forEach(text => {
      accessibilityStatementPage[method](text)
        .should('be.visible')
    })
  }

  switch (element) {
  case 'page header':
    verify('heading', ['Accessibility statement'])
    break

  case 'description':
    verify('paragraph', ['This service is run by Defra. We want as many people as possible to be able to use this website.', 'For example, that means you should be able to:', 'We have also made the website text as simple as possible to understand.', 'AbilityNet has advice on making your device easier to use if you have a disability.'])

    verify('listItem', ['change colours, contrast levels and fonts', 'zoom in up to 200% without the text spilling off the screen', 'navigate most of the website using just a keyboard', 'navigate most of the website using speech recognition software', 'listen to most of the website using a screen reader (including the most recent versions of JAWS, NVDA and VoiceOver)'])
    break

  case 'how accessible this website is':
    verify('heading', ['How accessible this website is'])

    verify('paragraph', ['We believe this website is fully accessible. If you find any accessibility issues, please contact us using the details below.'])
    break

  case 'feedback and contact info':
    verify('heading', ['Feedback and contact information'])

    verify('paragraph', ['If you find any problems not listed on this page or think we\'re not meeting accessibility requirements, contact us at: contentteam@defra.gov.uk.'])
    break

  case 'enforcement procedure':
    verify('heading', ['Enforcement procedure'])

    verify('paragraph', ['The Equality and Human Rights Commission (EHRC) is responsible for enforcing the Public Sector Bodies (Websites and Mobile Applications) (No. 2) Accessibility Regulations 2018 (the ‘accessibility regulations’).', 'If you\'re not happy with how we respond to your complaint, contact the Equality Advisory and Support Service (EASS).'])
    break

  case 'technical info':
    verify('heading', ['Technical information about this website’s accessibility'])

    verify('paragraph', ['Defra is committed to making its website accessible, in accordance with the Public Sector Bodies (Websites and Mobile Applications) (No. 2) Accessibility Regulations 2018.'])
    break

  case 'compliance status':
    verify('heading', ['Compliance status'])

    verify('paragraph', ['This website is fully compliant with the Web Content Accessibility Guidelines version 2.2 AA standard.'])
    break

  case 'improving accessiblity':
    verify('heading', ['What we\'re doing to improve accessibility'])

    verify('paragraph', ['We are committed to maintaining accessibility standards. Our ongoing activities include:'])

    verify('listItem', ['conducting regular accessibility audits', 'training our team on accessibility best practices'])
    break

  case 'preparation of statement':
    verify('heading', ['Preparation of this accessibility statement'])

    verify('paragraph', ['This statement was prepared on', 'It was last reviewed on', 'This website was last tested on', 'The test was carried out using automated testing tools against WCAG 2.2 AA criteria.'])
    break
  }

  cy.log(`Confirmed that ${element} is displayed`)
  console.log(`Confirmed that ${element} is displayed`)
})