Feature: Service Bus Messaging

  @ignore
  Scenario Outline: 01 Add an entry to the "<box>" box on Request Editor
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
    And I stop the messaging service

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

  Scenario Outline: 02 Sending a message to the service bus topic "<sendToTopicName>"
    Given I start the messaging service on for the service bus topic "<sendToTopicName>"
    And I create a message for the service bus topic "<sendToTopicName>" and update the following keys:
      | sbi   |
      | frn   |
      | value |
    When I send the updated message to the service bus topic "<sendToTopicName>"
    Then the message should be received successfully for the service bus topic "<receiveOnTopicName>"
    
    Examples:
      | sendToTopicName           | receiveOnTopicName        |
      | ffc-pay-processing-dev    | ffc-pay-processing-dev    |
      | ffc-pay-quality-check-dev | ffc-pay-quality-check-dev |
      | ffc-pay-request-dev       | ffc-pay-request-dev       |
      | ffc-pay-return-dev        | ffc-pay-return-dev        |
      | ffc-pay-submit-dev        | ffc-pay-submit-dev        |

  Scenario Outline: 03 Sending a message to the service bus topic "<sendToTopicName>"
    Given I start the messaging service on for the service bus topic "<sendToTopicName>"
    And I create a message for the service bus topics "<sendToTopicName>" and "<receiveOnTopicName>" and update the following keys:
      | sbi   |
      | frn   |
      | value |
    When I send the updated message to the service bus topic "<sendToTopicName>"
    Then the message should be matching the output message for the service bus topic "<receiveOnTopicName>"
    
    Examples:
      | sendToTopicName        | receiveOnTopicName |
      | ffc-pay-processing-dev | ffc-pay-submit-dev |