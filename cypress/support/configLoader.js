const environments = require('./environments.json');

function getEnvironmentConfig () {
  const env = Cypress.env('env') || 'test';  // default to local if not specified

  return {
    paymentManagementUrl: environments.paymentManagement[`${env}Url`],
    requestEditorUrl: environments.requestEditor[`${env}Url`]
  };
}

module.exports = { getEnvironmentConfig };