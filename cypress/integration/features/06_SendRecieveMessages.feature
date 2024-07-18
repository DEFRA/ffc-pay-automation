Feature: Service Bus Messaging

  Scenario Outline: Sending a message to the service bus topic "<sendToTopicName>"
    Given I visit the "Request Editor" homepage
    And I make a note of the "Requests awaiting reporting data" count
    When I create a message for the service bus topic "<sendToTopicName>" and update the following keys:
      | sbi   |
      | frn   |
      | value |
    When I send the updated message to the service bus topic "<sendToTopicName>"
    Then the message should be received successfully for the service bus topic "<receiveOnTopicName>"
    And the "Requests awaiting reporting data" count has increased by 1

    Examples:
      | sendToTopicName        | receiveOnTopicName     |
      | ffc-pay-debt-data-test | ffc-pay-debt-data-test |