@dev
Feature: 11 PPA E2E Journey - Credit

  Scenario Outline: 01 Send payment request message (payment1)
    Given I start the messaging service for the service bus topic "<sendToTopic>"
    And I create a message with the filename "paymentFileMessage" and update the following keys:
      | frn             |
      | invoiceNumber   |
      | agreementNumber |
      | contractNumber  |
    And I update the value of "paymentFileMessage" to "100000"
    When I send the updated "paymentFileMessage" message to the service bus topic "<sendToTopic>"
    Then the "paymentFileMessage" message should be received successfully for the service bus topic "<receiveOnTopic>"

    Examples:
      | sendToTopic         | receiveOnTopic         |
      | ffc-pay-request-dev | ffc-pay-processing-dev |

  Scenario Outline: 02 Process return message with updated values (settlement)
    Given I start the messaging service for the service bus topic "<sendToTopic>"
    And I synchronize keys in "returnFileMessage" with values from "<outputMessage>"
    And I update the value of "returnFileMessage" to "25000"
    And I regenerate the invoice number for "returnFileMessage" using the invoice number from "<outputMessage>"
    When I send the updated "returnFileMessage" message to the service bus topic "<sendToTopic>"

    Examples:
      | sendToTopic        | receiveOnTopic     | outputMessage          |
      | ffc-pay-return-dev | ffc-pay-submit-dev | ffc-pay-processing-dev |

  Scenario Outline: 03 Send PPA message and verify queue increment (payment2)
    Given I visit the "Request Editor" homepage
    And I start the messaging service for the service bus topic "<sendToTopic>"
    And I make a note of the "<box>" count
    And I synchronize keys in "ppa" with values from "<outputMessage>"
    And I update the value of "ppa" to "40000"
    And I increase the invoice number by "1" for "ppa" using the invoice number from "<outputMessage>"
    When I send the updated "ppa" message to the service bus topic "<sendToTopic>"
    Then the "<box>" count has increased by 1
    Then I take a screenshot for Feature 11 and Scenario 3

    Examples:
      | sendToTopic         | box                        | outputMessage          |
      | ffc-pay-request-dev | Awaiting ledger assignment | ffc-pay-processing-dev |

  Scenario: 04 Approve payment in ledger assignment queue
    Given I visit the "Request Editor" homepage
    And I click on the "View awaiting ledger assignment" link
    And I enter the newly generated FRN in the search field
    When I click on the FRN search button
    Then I should see the first FRN in the results matches the newly generated FRN
    And I click on the "Review" link
    And I click on the "Yes" provisional values radio button
    And I click on the "Continue" button
    And I am on the "quality-check" subpage
    Then I take a screenshot for Feature 11 and Scenario 4
    And I click on the "Sign out" link

  Scenario: 05 Approve payment in quality check queue
    Given I visit the "Request Editor" homepage
    And I click on the "View awaiting quality check" link
    And I enter the newly generated FRN in the search field
    When I click on the FRN search button
    Then I should see the first FRN in the results matches the newly generated FRN
    Then I take a screenshot for Feature 11 and Scenario 5
    And I click on the "Review" link
    And I click on the "Yes" edited correctly radio button
    And I click on the "Submit" button

  Scenario Outline: 06 Validate final output from Request Editor
    Then I check service bus topic "<receiveOnTopic>" for received messages

    Examples:
      | receiveOnTopic     |
      | ffc-pay-submit-dev |