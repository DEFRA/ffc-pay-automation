@ignore
Feature: Service Bus Messaging

  Scenario Outline: Sending a message to the service bus <type>
    Given I send a message to the service bus "<type>"
    Then the message should be received successfully

    Examples:
      | type  |
      | queue |
      | topic |
