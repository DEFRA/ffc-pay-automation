@dev
Feature: 06 Standard Payments E2E Journey

  Scenario Outline: 01 Process the payment file
    Given I start the messaging service for the service bus topic "<sendToTopic>"
    And I create a message with the filename "paymentFileMessage" and update the following keys:
      | frn             |
      | invoiceNumber   |
      | agreementNumber |
      | contractNumber  |
    When I send the updated "paymentFileMessage" message to the service bus topic "<sendToTopic>"
    Then the "paymentFileMessage" message should be received successfully for the service bus topic "<receiveOnTopic>"

    Examples:
      | sendToTopic         | receiveOnTopic         |
      | ffc-pay-request-dev | ffc-pay-processing-dev |

  Scenario Outline: 02 Process the return file
    Given I start the messaging service for the service bus topic "<sendToTopic>"
    And I create a message with the filename "returnFileMessage" and update the following keys:
      | frn           |
      | invoiceNumber |
      | reference     |
    When I send the updated "returnFileMessage" message to the service bus topic "<sendToTopic>"
    Then the "returnFileMessage" message should be received successfully for the service bus topic "<receiveOnTopic>"

    Examples:
      | sendToTopic        | receiveOnTopic     |
      | ffc-pay-return-dev | ffc-pay-submit-dev |