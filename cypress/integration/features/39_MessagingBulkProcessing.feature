@dev @local
Feature: 39 Messaging Bulk Processing

# This feature file is designed to load a high amount of payment messages into pay-enrichment
# for the purpose of performance testing of the service and its ability to process messages in bulk

  Scenario: 01 Load 5000 payment messages into pay-enrichment

  #Due to call stack limits, 5000 has been determined as the best amount of messages to send in one batch. 
  #This scenario can be re-run multiple times to increase the total number of messages sent however instructions
  #found in Step Definition 'When I send 10000 payment messages using template -
  #'When I send 10000 payment messages using template "paymentFileMessage" to the service bus topic "ffc-pay-request-aw"'
  #must be followed and the correct code must be commented/uncommented to avoid data duplication

    Given I start the messaging service for the service bus topic "ffc-pay-request-aw"
    When I send 5000 payment messages using template "paymentFileMessage" to the service bus topic "ffc-pay-request-aw"