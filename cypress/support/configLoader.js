const environments = require('./environments.json');

function getEnvironmentConfig () {
  const env = Cypress.env('env');

  return {
    paymentManagementUrl: environments.paymentManagement[`${env}Url`],
    requestEditorUrl: environments.requestEditor[`${env}Url`]
  };
}

module.exports = { getEnvironmentConfig };