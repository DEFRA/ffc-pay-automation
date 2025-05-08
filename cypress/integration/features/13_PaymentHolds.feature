@ppa
Feature: 13 Payment Holds

  Scenario Outline: 01 Send debit payment request message (payment1)
    Given I start the messaging service for the service bus topic "<sendToTopic>"
    And I visit the "Payment management" homepage
    And I click on the "Manage holds" link
    And I am on the "payment-holds" subpage
    And I click on the "Create new hold" link
    And I type a random FRN in the FRN field
    And I click the hold category option for "SFI22"
    And I click on the "Create" button
    And I create a message with the filename "paymentFileMessage" and update the following keys:
      | invoiceNumber   |
      | agreementNumber |
      | contractNumber  |
    And I update the "paymentFileMessage" file with the newly generated FRN
    And I update the value of "paymentFileMessage" to "100000"
    And I send the updated "paymentFileMessage" message to the service bus topic "<sendToTopic>"
    And I enter the newly generated FRN in the search field
    Then I click on the FRN search button
    When I click on the "Remove" button
    Then the "paymentFileMessage" message should be received successfully for the service bus topic "<receiveOnTopic>"

    @dev
    Examples:
      | sendToTopic         | receiveOnTopic     |
      | ffc-pay-request-dev | ffc-pay-submit-dev |

    @test
    Examples:
      | sendToTopic          | receiveOnTopic      |
      | ffc-pay-request-test | ffc-pay-submit-test |