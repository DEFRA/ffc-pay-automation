Feature: 11 PPA E2E Journey

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

    @test
    Examples:
      | sendToTopic          | receiveOnTopic          |
      | ffc-pay-request-test | ffc-pay-processing-test |

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

    @test
    Examples:
      | sendToTopic         | receiveOnTopic      |
      | ffc-pay-return-test | ffc-pay-submit-test |

# process the ppa file - send to ffc-pay-request-dev, receive on ffc-pay-manual-check-data-dev
# update frn from previous scenario
# increase invoiceNumber by +1 from previous scenario
# update agreementNumber from previous scenario
# update contractNumber from previous scenario
  Scenario Outline: 03 Process the PPA file
    Given I visit the "Request Editor" homepage
    Given I start the messaging service on for the service bus topic "<sendToTopic>"
    And I make a note of the "<box>" count
    And I create a message with the filename "ppa" and update the following keys to match the previous scenario:
      | frn             |
      | invoiceNumber   |
      | agreementNumber |
      | contractNumber  |
    When I send the updated PPA message to the service bus topic "<sendToTopic>"
    Then the PPA message should be received successfully for the service bus topic "<receiveOnTopic>"
    # And I visit the "Request Editor" homepage
    Then the "<box>" count has increased by 1

    @dev
    Examples:
      | sendToTopic         | receiveOnTopic                | box                        |
      | ffc-pay-request-dev | ffc-pay-manual-check-data-dev | Awaiting ledger assignment |

    @test
    Examples:
      | sendToTopic          | receiveOnTopic                 | box                        |
      | ffc-pay-request-test | ffc-pay-manual-check-data-test | Awaiting ledger assignment |

  # Scenario Outline: 01 Add an entry to the "<box>" box on Request Editor
  #   Given I visit the "Request Editor" homepage
  #   And I start the messaging service on for the service bus topic "<sendToTopicName>"
  #   And I make a note of the "<box>" count
  #   And I create a message with the filename "<sendToTopicName>" and update the following keys:
  #     | sbi           |
  #     | frn           |
  #     | value         |
  #     | invoiceNumber |
  #   When I send the updated message to the service bus topic "<sendToTopicName>"
  #   Then the "<box>" count has increased by 1
  #   And I stop the messaging service

    # @test
    # Examples:
    #   | sendToTopicName                | box                        |
    #   | ffc-pay-manual-check-data-test | Awaiting ledger assignment |

    # @dev
    # Examples:
    #   | sendToTopicName               | box                        |
    #   | ffc-pay-manual-check-data-dev | Awaiting ledger assignment |
    
    # search for the record via automation in request editor UI (possibly searching for an FRN)
    # review and approve the payment
  @ignore
  Scenario: 02 Search, review, and approve payment for newly generated FRN
    Given I visit the "Request Editor" homepage
    And I click on the "View awaiting ledger assignment" link
    And I enter the newly generated FRN in the search field
    When I click on the FRN search button
    Then I should see the first FRN in the results matches the newly generated FRN
    And I click on the "Review" link
    And I click on the "Yes" provisional values radio button
    And I click on the "Continue" button
    And I am on the "quality-check" subpage
    And I click on the "Sign out" link

# review and approve the payment from Requests awaiting quality check
    And I click on the "View awaiting quality check" link
    And I enter the newly generated FRN in the search field
    When I click on the FRN search button
    Then I should see the first FRN in the results matches the newly generated FRN
    And I click on the "Review" link
    And I click on the "Yes" edited correctly radio button
    And I click on the "Submit" button

    # validate the message that comes out of request editor and goes into ffc-pay-quality-check topic
    Then I check service bus topic "ffc-pay-quality-check-dev" for received messages