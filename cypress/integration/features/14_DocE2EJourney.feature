@local @dev @documents
Feature: 14 Doc E2E Journey

# This feature file is designed to test the end-to-end journey of document services in the local environment.

  Scenario: 01 insert test data into Statement Data service
    Given I restart and clear the local doc environment
    When I insert test data into Statement Data service

#Statement-Data Docker container may need to be restarted to ensure processing begins

#The following steps confirm that the data has been passed along to the correct services and that the data
#has been processed correctly

    Then I confirm that test data has been inserted into the ffc-doc-statement-data database
    Then I confirm that test data has been inserted into the ffc-doc-statement-constructor database
    Then I confirm that test data has been inserted into the ffc-doc-statement-generator database
    Then I confirm that test data has been inserted into the ffc-doc-statement-publisher database

#Finally the last step downloads file from Azure Blob Storage and confirms that the values given in the data inserted into the 
#Statement Data Service have been correctly added to the generated statement

    Then I pull statements file from Azure Blob Storage and confirm that correct values have been generated

  Scenario: 02 insert incorrect test data into Statement Data service and confirm errors

    Given I restart and clear the local doc environment

#The following line also confirms that the correct error message is produced upon attempting to insert data that does not conform
#to the database limits

    When I insert incorrect test data into Statement Data service
    Then I confirm that test data has not been inserted into the ffc-doc-statement-data database

  Scenario: 03 insert incorrect test data into Statement Constructor service and confirm errors

#No need to restart local env here as no data will be in Statement Constructor from previous scenario

#The following line also confirms that the correct error message is produced upon attempting to insert data that does not conform
#to the database limits

    When I insert incorrect test data into Statement Constructor service
    Then I confirm that test data has not been inserted into the ffc-doc-statement-constructor database

  Scenario: 04 insert incorrect test data into Statement Generator service and confirm errors

#No need to restart local env here as no data will be in Statement Generator from previous scenario

#The following line also confirms that the correct error message is produced upon attempting to insert data that does not conform
#to the database limits

    When I insert incorrect test data into Statement Generator service
    Then I confirm that test data has not been inserted into the ffc-doc-statement-generator database

  Scenario: 05 insert incorrect test data into Statement Publisher service and confirm errors

#No need to restart local env here as no data will be in Statement Publisher from previous scenario

#The following line also confirms that the correct error message is produced upon attempting to insert data that does not conform
#to the database limits

    When I insert incorrect test data into Statement Publisher service
    Then I confirm that test data has not been inserted into the ffc-doc-statement-publisher database
