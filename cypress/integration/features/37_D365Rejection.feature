@local
Feature: 37 D365 Rejection

# This feature file is designed to test D365 Rejection processing

  Scenario: 01 Process D365 Acknowledgment file

#This scenarios loads an SFI22 payment message followed by a D365 rejection acknowledgement message
#It then confirms that the correct hold entry has been created in the Pay Processing database  

    Given I restart the local environment
    Given I visit the "Payment management" homepage
    Then I take a screenshot for Feature 37 and Scenario 1
    When I send the updated "sfi22-paymentFileMessage" message to the service bus topic "ffc-pay-request-aw"

#The following steps confirm that the data has been passed along to the correct services and that the data
#has been processed correctly

    Then I confirm that payment test data has been inserted into the ffc-pay-processing database
    Then I confirm that payment test data has been inserted into the ffc-pay-submission database

#The following step downloads file from Azure Blob Storage and confirms that the values given in the data inserted into the 
#Pay Submission Service have been correctly added to the generated statement

    Then I pull sfi22 payments file from Azure Blob Storage and confirm that correct values have been generated

#Processing of acknowledgement message to simulate D365 rejection    

    When I send the updated "d365Rejection-acknowledgementMessage" message to the service bus topic "ffc-pay-acknowledgement-aw"

#Following processing a hold entry should be created in the Pay Processing database with a hold category of 1
#Which indicates a Bank account anomaly

    Then I confirm that d365 rejection test data has been inserted into the ffc-pay-processing database

#The step below queries the logs from ffc-pay-alerting to confirm that the alert for No valid bank details has been generated

    Then I confirm that 'No valid bank details held' alert has been generated

  Scenario: 02 Verify D365 Rejection hold in Payment Management UI

#This scenario confirms that the hold created by the D365 rejection processing is visible in the Payment Management UI

    Given I visit the "Payment management" homepage
    And I click on the "Manage holds" link
    And I am on the "payment-holds" subpage
    Then I take a screenshot for Feature 37 and Scenario 2
    And I should see "1258445148"
    And I should see "Bank account anomaly"

  Scenario: 03 Remove hold in Payment Management UI and confirm secondary completedPaymentRequest entry created

#This scenario removes the hold created by the D365 rejection processing and confirms that a secondary completedPaymentRequest
#entry is subsequently created in the Pay Processing database

    Given I visit the "Payment management" homepage
    And I click on the "Manage holds" link
    And I am on the "payment-holds" subpage
    When I click on the "Remove" button
    And I click on the "Manage holds" link
    Then I take a screenshot for Feature 37 and Scenario 3

  #Following this hold removal a secondary completedPaymentRequest entry should be created in the Pay Processing database

    Then I confirm that resubmission test data has been inserted into the ffc-pay-processing database
