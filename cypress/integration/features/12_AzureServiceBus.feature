@dev
Feature: 12 Azure Service Bus Test Client

  Scenario: Sending a message
    Given I visit the "Azure Service Bus Test Client" homepage
    And I fill in the Connection String
    And I fill in the Queue or Topic name with "ffc-pay-request-dev"
    And I fill in the Message with the fixture file "paymentFileMessage"
    And I check the Auto Generate Correlation ID checkbox
    And I select "json" as the message format
    And I set Total messages to send to "1"
    And I click the Send button
    And I should see a confirmation that the message was sent
    And I fill in the Queue or Topic name with "ffc-pay-processing-dev"
    And I fill in the Subscription name with "ffc-pay-automation"
    And I select "complete" as the receive method
    And I set Total messages to receive to "1"
    And I click the Receive button
    And I should see a confirmation that messages were received
    When I should see "1" messages displayed
    Then I verify the received message contents
