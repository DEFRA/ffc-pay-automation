Feature: Service Bus Messaging

  Scenario: Sending a message to the service bus
    Given I send a message to the service bus "topic"
    Then the message should be received successfully
