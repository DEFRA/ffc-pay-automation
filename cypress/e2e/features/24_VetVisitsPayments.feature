Feature: 24 Vet Visits Payments

# This feature file is designed to test the end-to-end journey of Vet Visits payment in the local environment.

# npm run cypress:dev:one -- "cypress\e2e\features\24_VetVisitsPayments.feature"
# npm run cypress:local:one -- "cypress\e2e\features\24_VetVisitsPayments.feature"

  @dev
  Scenario: 01 insert incorrect test data via service bus message to ffc-pay-request and confirm data is rejected

    When I send "vet visits error" test data message to the service bus topic "ffc-pay-request-dev"

    Then I confirm that payment test data in dev has not been inserted into the ffc-pay-processing database
    Then I confirm that payment test data in dev has not been inserted into the ffc-pay-submission database

  @dev
  Scenario: 02 insert test data via service bus message to ffc-pay-request

  #For E2E journey in Dev the scenarios have been consolidated into one in order to facilitate reuse of variables used for 
  #test data

    Given I visit the "Payment management" homepage
    When I click on the "View processed payment requests" link
    And I select "Vet Visits" from the monitor schemes dropdown
    And I click on the "Continue" button
    Then I store the number of payments and total value of payments for the current scheme

  #Scans DB for highest values and then iterates them by 1, this ensures the script can be reran
  #without the risk of data conflicts  

    When I send "vet visits payment" test data message to the service bus topic "ffc-pay-request-dev"

    Then I confirm that payment test data in dev has been inserted into the ffc-pay-processing database
    Then I confirm that payment test data in dev has been inserted into the ffc-pay-submission database

    Then I pull vet visits file from Azure Blob Storage and confirm that correct values have been generated

  #Updates template values with values used in payment message  

    When I send "vet visits return" test data message to the service bus topic "ffc-pay-return-dev"
    Then I confirm that "return" test data in dev has been inserted into ffc-pay-processing database

    When I click on the "View processed payment requests" link
    And I select "Vet Visits" from the monitor schemes dropdown
    And I click on the "Continue" button

    Then I take a screenshot for Feature 24 and Scenario 2
    Then I confirm that number of payments has increased by 1 and total value of payments has increased by "£16,002.00"

  @dev
  Scenario: 03 Confirm that new AWHR standard code is functioning correctly

#This scenario confirms that Vet Visits payments can be processed correctly using the new AWHR standard code and that the
#correct scheme code of 18005 will be added by enrichment

    When I send the updated "awhrPoultry-paymentFileMessage" message to the service bus topic "ffc-pay-request-dev"
    Then I confirm that payment test data in dev has been inserted into the ffc-pay-processing database
    Then I confirm that payment test data in dev has been inserted into the ffc-pay-submission database
    Then I pull vet visits file from Azure Blob Storage and confirm that correct values have been generated

    Then I confirm that payment for current FRN has scheme code of "18005" in ffc-pay-processing database

  @local
  Scenario: 01 insert incorrect test data via service bus message to ffc-pay-request and confirm data is rejected

#This scenario confirms that attempting to insert data that does not conform to the database limits is rejected correctly

    Given I restart the local environment
    When I send the updated "vetVisitsError-paymentFileMessage" message to the service bus topic "ffc-pay-request-aw"
    Then I confirm that payment test data has not been inserted into the ffc-pay-processing database

  @local
  Scenario: 02 insert test data via service bus message to ffc-pay-request

    When I send the updated "vetVisits-paymentFileMessage" message to the service bus topic "ffc-pay-request-aw"

#The following steps confirm that the data has been passed along to the correct services and that the data
#has been processed correctly

    Then I confirm that payment test data has been inserted into the ffc-pay-processing database
    Then I confirm that payment test data has been inserted into the ffc-pay-submission database

#The following step downloads file from Azure Blob Storage and confirms that the values given in the data inserted into the 
#Pay Submission Service have been correctly added to the generated statement

    Then I pull vet visits file from Azure Blob Storage and confirm that correct values have been generated

  @local
  Scenario: 03 send return file message and confirm processing

#This scenario confirms that a return file message can be sent and processed correctly

    When I send the updated "vetVisits-returnFileMessage" message to the service bus topic "ffc-pay-return-aw"
    Then I confirm that "return" test data has been inserted into the "ffc-pay-processing" database

  @local
  Scenario: 04 Confirm payment request processed in Payment Management

    Given I visit the "Payment management" homepage
    When I click on the "View processed payment requests" link
    And I select "Vet Visits" from the monitor schemes dropdown
    And I click on the "Continue" button
    Then I confirm that payment for "Vet Visits" scheme with "1" payment installments totalling "£16,002.00" is displayed
    Then I take a screenshot for Feature 24 and Scenario 4

  @local
  Scenario: 05 Confirm that new AWHR standard code is functioning correctly

#This scenario confirms that Vet Visits payments can be processed correctly using the new AWHR standard code and that the
#correct scheme code of 18005 will be added by enrichment

    Given I restart the local environment
    When I send the updated "awhrPoultry-paymentFileMessage" message to the service bus topic "ffc-pay-request-aw"
    Then I confirm that payment test data has been inserted into the ffc-pay-processing database
    Then I confirm that payment test data has been inserted into the ffc-pay-submission database
    Then I pull vet visits file from Azure Blob Storage and confirm that correct values have been generated

    Then I confirm that payment for current FRN has scheme code of "18005" in ffc-pay-processing database