const environments = require('./environments.json');

function getEnvironmentConfig () {
  const env = Cypress.env('env');

  return {
    env,
    paymentManagementUrl: environments.paymentManagement[`${env}Url`],
    requestEditorUrl: environments.requestEditor[`${env}Url`]
  };
}

module.exports = { getEnvironmentConfig };