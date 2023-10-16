/* global When */

import paymentManagementPage from '../pages/paymentManagementPage';

When(/^I can see "(.*)" as the header$/, (text) => {
  paymentManagementPage.header().should('have.text', text);
});