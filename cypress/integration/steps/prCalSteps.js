/* global When */

import prCal from '../pages/prCal';

When('I click on the Start New Calculation button', () => {
  prCal.startNewCalcButton().click();
});

When(/^I set "(.*)" as the starting amount value$/, (text) => {
  prCal.startingAmountField().type(text+'{enter}');
});