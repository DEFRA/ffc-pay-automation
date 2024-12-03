Feature: 11 Standard Payments E2E Journey

  Scenario Outline: 01 Process the payment file
    Given I start the messaging service on for the service bus topic "<sendToTopic>"
    And I create a message with the filename "paymentFileMessage" and update the following keys:
      | frn             |
      | invoiceNumber   |
      | agreementNumber |
      | contractNumber  |
    When I send the updated message to the service bus topic "<sendToTopic>"
    Then the message should be received successfully for the service bus topic "<receiveOnTopic>"

    @dev
    Examples:
      | sendToTopic         | receiveOnTopic         |
      | ffc-pay-request-dev | ffc-pay-processing-dev |

  #   @test
  #   Examples:
  #     | sendToTopic          | receiveOnTopic      |
  #     | ffc-pay-request-test | ffc-pay-submit-test |

  Scenario Outline: 02 Process the return file
    Given I start the messaging service on for the service bus topic "<sendToTopic>"
    And I create a return file message with the filename "returnFileMessage" and update the following keys:
      | frn           |
      | invoiceNumber |
      | reference     |
    When I send the updated return file message to the service bus topic "<sendToTopic>"
    Then the response message should be received successfully for the service bus topic "<receiveOnTopic>"

    @dev
    Examples:
      | sendToTopic        | receiveOnTopic     |
      | ffc-pay-return-dev | ffc-pay-submit-dev |

  #   @test
  #   Examples:
  #     | sendToTopic         | receiveOnTopic      |
  #     | ffc-pay-return-test | ffc-pay-submit-test |