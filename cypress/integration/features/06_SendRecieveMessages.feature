@ignore
Feature: Service Bus Messaging

  Scenario: Sending a message to the service bus topic
    Given I send a message to the service bus topic with "value" set to "200"
    Then the message should be received successfully