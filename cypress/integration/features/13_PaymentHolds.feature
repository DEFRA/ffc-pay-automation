@dev @local
Feature: 13 Payment Holds

  Scenario Outline: 01 Send debit payment request message (payment1)
    Given I start the messaging service for the service bus topic "<sendToTopic>"
    And I visit the "Payment management" homepage
    And I click on the "Manage holds" link
    And I am on the "payment-holds" subpage
    And I click on the "Create new hold" link
    And I type a random FRN in the FRN field
    And I click the hold category option for "SFI22"
    And I take a screenshot for Feature 13 and Scenario 1
    And I click on the "Create" button
    And I create a message with the filename "paymentFileMessage" and update the following keys:
      | invoiceNumber   |
      | agreementNumber |
      | contractNumber  |
    And I update the "paymentFileMessage" file with the newly generated FRN
    And I update the value of "paymentFileMessage" to "100000"
    And I send the updated "paymentFileMessage" message to the service bus topic "<sendToTopic>"
    When on the Payment Holds page I enter the newly generated FRN in the search field
    Then on the Payment Holds page I click the FRN search button
    When I click on the "Remove" button
    Then the "paymentFileMessage" message should be received successfully for the service bus topic "<receiveOnTopic>"

    Examples:
      | sendToTopic         | receiveOnTopic     |
      | ffc-pay-request-dev | ffc-pay-submit-dev |

  Scenario: 02 Confirm scheme filter functional

    Given I visit the "Payment management" homepage
    And I click on the "Manage holds" link
    And I am on the "payment-holds" subpage
    And I click on the "Create new hold" link
    Then on the Payment Holds page I confirm that scheme filter box is visible
    Then on the Payment Holds page I confirm that correct options are available for "COHT Capital" scheme
    Then on the Payment Holds page I confirm that correct options are available for "COHT Revenue" scheme
    Then on the Payment Holds page I confirm that correct options are available for "Expanded SFI Offer" scheme
    Then on the Payment Holds page I confirm that correct options are available for "Delinked" scheme
    Then on the Payment Holds page I confirm that correct options are available for "SFI23" scheme
    Then on the Payment Holds page I confirm that correct options are available for "IMPS" scheme
    Then on the Payment Holds page I confirm that correct options are available for "FC" scheme
    Then on the Payment Holds page I confirm that correct options are available for "ES" scheme
    Then on the Payment Holds page I confirm that correct options are available for "Manual Invoice" scheme
    Then on the Payment Holds page I confirm that correct options are available for "FDMR" scheme
    Then on the Payment Holds page I confirm that correct options are available for "BPS" scheme
    Then on the Payment Holds page I confirm that correct options are available for "CS" scheme
    Then on the Payment Holds page I confirm that correct options are available for "Annual Health and Welfare Review" scheme
    Then on the Payment Holds page I confirm that correct options are available for "Lump Sums" scheme
    Then on the Payment Holds page I confirm that correct options are available for "SFI Pilot" scheme
    Then on the Payment Holds page I confirm that correct options are available for "SFI22" scheme
    And I take a screenshot for Feature 13 and Scenario 2
  
