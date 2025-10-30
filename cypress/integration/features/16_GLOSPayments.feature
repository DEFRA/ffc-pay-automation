@local
Feature: 16 GLOS Payments

# This feature file is designed to test the end-to-end journey of GLOS payment in the local environment.

  Scenario: 01 insert test data via service bus message to ffc-pay-request

    Given I restart the local environment
    When I send the updated "glos-paymentFileMessage" message to the service bus topic "ffc-pay-request-aw"

#The following steps confirm that the data has been passed along to the correct services and that the data
#has been processed correctly

    Then I confirm that payment test data has been inserted into the ffc-pay-processing database
    Then I confirm that payment test data has been inserted into the ffc-pay-submission database

#The following step downloads file from Azure Blob Storage and confirms that the values given in the data inserted into the 
#Pay Submission Service have been correctly added to the generated statement

    Then I pull glos payments file from Azure Blob Storage and confirm that correct values have been generated

  Scenario: 02 send return file message and confirm processing

#This scenario confirms that a return file message can be sent and processed correctly

    When I send the updated "glos-returnFileMessage" message to the service bus topic "ffc-pay-return-aw"
    Then I confirm that return test data has been inserted into the ffc-pay-processing database

  Scenario: 03 insert incorrect test data via service bus message to ffc-pay-request and confirm data is rejected

#This scenario confirms that attempting to insert data that does not conform to the database limits is rejected correctly

    Given I restart the local environment
    When I send the updated "glosError-paymentFileMessage" message to the service bus topic "ffc-pay-request-aw"
    Then I confirm that payment test data has not been inserted into the ffc-pay-processing database