Feature: 11 PPA E2E Journey

  Scenario Outline: 01 Process the payment file
    Given I start the messaging service for the service bus topic "<sendToTopic>"
    And I create a message with the filename "paymentFileMessage" and update the following keys:
      | frn             |
      | invoiceNumber   |
      | agreementNumber |
      | contractNumber  |
    When I send the updated "paymentFileMessage" message to the service bus topic "<sendToTopic>"
    Then the "paymentFileMessage" message should be received successfully for the service bus topic "<receiveOnTopic>"

    @dev
    Examples:
      | sendToTopic         | receiveOnTopic         |
      | ffc-pay-request-dev | ffc-pay-processing-dev |

    @test
    Examples:
      | sendToTopic          | receiveOnTopic          |
      | ffc-pay-request-test | ffc-pay-processing-test |

  Scenario Outline: 02 Process the return file
    Given I start the messaging service for the service bus topic "<sendToTopic>"
    And I synchronize keys in "returnFileMessage" with values from "<outputMessage>"
    And I regenerate the invoice number for "returnFileMessage" using the invoice number from "<outputMessage>"
    When I send the updated "returnFileMessage" message to the service bus topic "<sendToTopic>"
    Then the "returnFileMessage" message should be received successfully for the service bus topic "<receiveOnTopic>"

    @dev
    Examples:
      | sendToTopic        | receiveOnTopic     | outputMessage          |
      | ffc-pay-return-dev | ffc-pay-submit-dev | ffc-pay-processing-dev |

    @test
    Examples:
      | sendToTopic         | receiveOnTopic      | outputMessage           |
      | ffc-pay-return-test | ffc-pay-submit-test | ffc-pay-processing-test |

  Scenario Outline: 03 Process the PPA file
    Given I visit the "Request Editor" homepage
    And I start the messaging service for the service bus topic "<sendToTopic>"
    And I make a note of the "<box>" count
    And I synchronize keys in "ppa" with values from "<outputMessage>"
    And I increase the invoice number by "1" for "ppa" using the invoice number from "<outputMessage>"
    When I send the updated "ppa" message to the service bus topic "<sendToTopic>"
    Then the "<box>" count has increased by 1

    And I click on the "View awaiting ledger assignment" link
    And I enter the random FRN in the search field
    When I click on the FRN search button
    Then I should see the first FRN in the results matches the random FRN

    # pass through the steps on UI, it'll end it back to pay-processing
# payment should then be sucesful and we can verify a mesage o pay-submit




    @dev
    Examples:
      | sendToTopic         | box                        | outputMessage          |
      | ffc-pay-request-dev | Awaiting ledger assignment | ffc-pay-processing-dev |

    @test
    Examples:
      | sendToTopic          | box                        | outputMessage       |
      | ffc-pay-request-test | Awaiting ledger assignment | ffc-pay-submit-test |
    
#     # search for the record via automation in request editor UI (possibly searching for an FRN)
#     # review and approve the payment
#   @ignore
  # Scenario: 02 Search, review, and approve payment for newly generated FRN
  #   Given I visit the "Request Editor" homepage
  #   And I click on the "View awaiting ledger assignment" link
  #   And I enter the newly generated FRN in the search field
  #   When I click on the FRN search button
  #   Then I should see the first FRN in the results matches the newly generated FRN
  #   And I click on the "Review" link
  #   And I click on the "Yes" provisional values radio button
  #   And I click on the "Continue" button
  #   And I am on the "quality-check" subpage
  #   And I click on the "Sign out" link

# # review and approve the payment from Requests awaiting quality check
#     And I click on the "View awaiting quality check" link
#     And I enter the newly generated FRN in the search field
#     When I click on the FRN search button
#     Then I should see the first FRN in the results matches the newly generated FRN
#     And I click on the "Review" link
#     And I click on the "Yes" edited correctly radio button
#     And I click on the "Submit" button

#     # validate the message that comes out of request editor and goes into ffc-pay-quality-check topic
#     Then I check service bus topic "ffc-pay-quality-check-dev" for received messages