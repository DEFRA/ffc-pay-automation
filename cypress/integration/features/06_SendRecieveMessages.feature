Feature: Service Bus Messaging

  Scenario: Sending a message to the service bus topic
    Given I visit the "Request Editor" homepage
    And I make a note of the "Requests awaiting reporting data" count
    And I create a message with a unique agreement number
    When I send a message to the service bus topic "enrichment"
    Then the message should be received successfully for the service bus topic "enrichment"
    And the "Requests awaiting reporting data" count has increased by 1