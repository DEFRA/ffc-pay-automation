Feature: Service Bus Messaging

  Scenario Outline: Add an entry to the "<box>" box on Request Editor
    Given I start the messaging service on for the service bus topic "<sendToTopicName>"
    And I visit the "Request Editor" homepage
    And I make a note of the "<box>" count
    And I create a message for the service bus topic "<sendToTopicName>" and update the following keys:
      | sbi           |
      | frn           |
      | value         |
      | invoiceNumber |
    When I send the updated message to the service bus topic "<sendToTopicName>"
    Then the "<box>" count has increased by 1

    @test
    Examples:
      | sendToTopicName                | box                              |
      | ffc-pay-debt-data-test         | Requests awaiting reporting data |
      | ffc-pay-manual-check-data-test | Awaiting ledger assignment       |

    @dev
    Examples:
      | sendToTopicName               | box                              |
      | ffc-pay-debt-data-dev         | Requests awaiting reporting data |
      | ffc-pay-manual-check-data-dev | Awaiting ledger assignment       |

  @ignore
  Scenario Outline: Sending a message to the service bus topic "<sendToTopicName>"
    Given I start the messaging service on for the service bus topic "<sendToTopicName>"
    And I create a message for the service bus topic "<sendToTopicName>" and update the following keys:
      | sbi   |
      | frn   |
      | value |
    When I send the updated message to the service bus topic "<sendToTopicName>"
    Then the message should be received successfully for the service bus topic "<receiveOnTopicName>"

    Examples:
      | sendToTopicName            | receiveOnTopicName         |
      | ffc-pay-processing-test    | ffc-pay-processing-test    |
      | ffc-pay-quality-check-test | ffc-pay-quality-check-test |
      | ffc-pay-request-test       | ffc-pay-request-test       |
      | ffc-pay-return-test        | ffc-pay-return-test        |
      | ffc-pay-submit-test        | ffc-pay-submit-test        |