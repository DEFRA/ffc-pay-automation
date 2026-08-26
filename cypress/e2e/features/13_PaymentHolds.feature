@dev @local
Feature: 13 Payment Holds

# npm run cypress:dev:one -- "cypress\e2e\features\13_PaymentHolds.feature"
# npm run cypress:local:one -- "cypress\e2e\features\13_PaymentHolds.feature"

  Scenario Outline: 01 Send debit payment request message (payment1)
    Given I start the messaging service for the service bus topic "<sendToTopic>"
    And I visit the "Payment management" homepage
    And I click on the "Manage payment holds" link
    And I click on the "Create a new payment hold" link
    And I enter "random frn" into the "frn" field
    And I select the scheme "COHT Capital"
    Then on the Payment Holds page I enter "Dax rejection" hold for scheme "COHT Capital"
    And I take a screenshot
    And I click on the "Continue" button
    And I click on the "Create payment hold" button
    And I create a message with the filename "paymentFileMessage" and update the following keys:
      | invoiceNumber   |
      | agreementNumber |
      | contractNumber  |
    And I update the "paymentFileMessage" file with the newly generated FRN
    And I update the value of "paymentFileMessage" to "100000"
    And I send the updated "paymentFileMessage" message to the service bus topic "<sendToTopic>"

    And I click on the "Search for a payment hold" link
    When on the Payment Holds page I enter the newly generated FRN in the search field
    And I click on the "Search" button
    When I click on the "Remove" button
    And I click on the "Yes, remove" button
    Then the "paymentFileMessage" message should be received successfully for the service bus topic "<receiveOnTopic>"

    Examples:
      | sendToTopic         | receiveOnTopic     |
      | ffc-pay-request-dev | ffc-pay-submit-dev |

  Scenario: 02 Confirm scheme filter functional

    Given I visit the "Payment management" homepage
    And I click on the "Manage payment holds" link
    And I click on the "Create a new payment hold" link
    Then on the Payment Holds page I confirm that scheme filter box is visible
    Then on the Payment Holds page all schemes have correct holds
    And I take a screenshot
  
