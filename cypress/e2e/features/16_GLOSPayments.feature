Feature: 16 GLOS Payments

# npm run cypress:dev:one -- "cypress\e2e\features\16_GLOSPayments.feature"
# npm run cypress:local:one -- "cypress\e2e\features\16_GLOSPayments.feature"

# This feature file is designed to test the end-to-end journey of GLOS payment in the local environment.

  @dev
  Scenario: 01 insert incorrect test data via service bus message to ffc-pay-request and confirm data is rejected

    When I send "glos error" test data message to the service bus topic "ffc-pay-request-dev"

    Then I confirm that payment test data in dev has not been inserted into the ffc-pay-processing database
    Then I confirm that payment test data in dev has not been inserted into the ffc-pay-submission database

  @dev
  Scenario: 02 insert test data via service bus message to ffc-pay-request

  #For E2E journey in Dev the scenarios have been consolidated into one in order to facilitate reuse of variables used for 
  #test data

  #Scans DB for highest values and then iterates them by 1, this ensures the script can be reran
  #without the risk of data conflicts  

  #Following section gets values from View processed payment request page and stores them in variables to be used later in the scenario
  #the scenario to confirm that the new payment request has been added

    Given I visit the "Payment management" homepage
    When I click on the "View processed payment requests" link
    And I select "FC" from the monitor schemes dropdown
    And I click on the "Continue" button
    Then I store the number of payments and total value of payments for the current scheme

    When I send "glos payment" test data message to the service bus topic "ffc-pay-request-dev"

    Then I confirm that payment test data in dev has been inserted into the ffc-pay-processing database
    Then I confirm that payment test data in dev has been inserted into the ffc-pay-submission database

    Then I pull glos payments file from Azure Blob Storage and confirm that correct values have been generated

  #Updates template values with values used in payment message  

    When I send "glos return" test data message to the service bus topic "ffc-pay-return-dev"
    Then I confirm that "return" test data in dev has been inserted into ffc-pay-processing database

    Given I visit the "Payment management" homepage
    When I click on the "View processed payment requests" link
    And I select "FC" from the monitor schemes dropdown
    And I click on the "Continue" button

    Then I confirm that number of payments has increased by 1 and total value of payments has increased by "227.70"

    Then I take a screenshot for Feature 16 and Scenario 2

  @local
  Scenario: 01 insert incorrect test data via service bus message to ffc-pay-request and confirm data is rejected

#This scenario confirms that attempting to insert data that does not conform to the database limits is rejected correctly

    Given I restart the local environment
    When I send the updated "glosError-paymentFileMessage" message to the service bus topic "ffc-pay-request-aw"
    Then I confirm that payment test data has not been inserted into the ffc-pay-processing database

  @local
  Scenario: 02 insert test data via service bus message to ffc-pay-request

    When I send the updated "glos-paymentFileMessage" message to the service bus topic "ffc-pay-request-aw"

#The following steps confirm that the data has been passed along to the correct services and that the data
#has been processed correctly

    Then I confirm that payment test data has been inserted into the ffc-pay-processing database
    Then I confirm that payment test data has been inserted into the ffc-pay-submission database

#The following step downloads file from Azure Blob Storage and confirms that the values given in the data inserted into the 
#Pay Submission Service have been correctly added to the generated statement

    Then I pull glos payments file from Azure Blob Storage and confirm that correct values have been generated

  @local
  Scenario: 03 send return file message and confirm processing

#This scenario confirms that a return file message can be sent and processed correctly

    When I send the updated "glos-returnFileMessage" message to the service bus topic "ffc-pay-return-aw"
    Then I confirm that "return" test data has been inserted into the "ffc-pay-processing" database

  @local
  Scenario: 04 Confirm payment request processed in Payment Management

    Given I visit the "Payment management" homepage
    When I click on the "View processed payment requests" link
    And I select "FC" from the monitor schemes dropdown
    And I click on the "Continue" button
    Then I confirm that payment for "FC" scheme with "1" payment installments totalling "£227.70" is displayed
    Then I take a screenshot for Feature 16 and Scenario 4
