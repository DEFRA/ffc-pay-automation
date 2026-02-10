@local @documents
Feature: 14 Doc E2E Journey

 #This feature file is designed to test the end-to-end journey of document services in the local environment.

  Scenario: 01 insert test data into Statement Data service
    Given I restart and clear the local doc environment
    When I insert 2025 test data into Statement Data service

#Statement-Data Docker container may need to be restarted to ensure processing begins

#The following steps confirm that the data has been passed along to the correct services and that the data
#has been processed correctly

    Then I confirm that test data has been inserted into the ffc-doc-statement-data database
    Then I confirm that test data has been inserted into the ffc-doc-statement-constructor database
    Then I confirm that test data has been inserted into the ffc-doc-statement-generator database
    Then I confirm that test data has been inserted into the ffc-doc-statement-publisher database

#Finally the last step downloads file from Azure Blob Storage and confirms that the values given in the data inserted into the 
#Statement Data Service have been correctly added to the generated statement

    Then I pull 2025 statements file from Azure Blob Storage and confirm that correct values have been generated

  Scenario: 02 insert 2024 test data into Statement Data service

  #The following scenario follow same pattern as the first scenario but uses 2024 Delinked data

    Given I restart and clear the local doc environment
    When I insert 2024 test data into Statement Data service

#Statement-Data Docker container may need to be restarted to ensure processing begins

#The following steps confirm that the data has been passed along to the correct services and that the data
#has been processed correctly

    Then I confirm that test data has been inserted into the ffc-doc-statement-data database
    Then I confirm that test data has been inserted into the ffc-doc-statement-constructor database
    Then I confirm that test data has been inserted into the ffc-doc-statement-generator database

#Finally the last step downloads file from Azure Blob Storage and confirms that the values given in the data inserted into the 
#Statement Data Service have been correctly added to the generated statement

    Then I pull 2024 statements file from Azure Blob Storage and confirm that correct values have been generated

  Scenario: 03 insert incorrect test data into Statement Data service and confirm errors

    Given I restart and clear the local doc environment

#The following line also confirms that the correct error message is produced upon attempting to insert data that does not conform
#to the database limits

    When I send incorrect test data into ffc-doc-statement-data service
    Then I confirm that test data has not been inserted into the ffc-doc-statement-data database

  Scenario: 04 insert incorrect test data into Statement Constructor service and confirm errors

#The following line also confirms that the correct error message is produced upon attempting to insert data that does not conform
#to the database limits

    When I send incorrect test data into ffc-doc-statement-constructor service
    Then I confirm that test data has not been inserted into the ffc-doc-statement-constructor database

  Scenario: 05 insert incorrect test data into Statement Generator service and confirm errors

#The following line also confirms that the correct error message is produced upon attempting to insert data that does not conform
#to the database limits

    When I send incorrect test data into ffc-doc-statement-generator service
    Then I confirm that test data has not been inserted into the ffc-doc-statement-generator database

  Scenario: 06 insert incorrect test data into Statement Publisher service and confirm errors

#The following line also confirms that the correct error message is produced upon attempting to insert data that does not conform
#to the database limits

    When I send incorrect test data into ffc-doc-statement-publisher service
    Then I confirm that test data has not been inserted into the ffc-doc-statement-publisher database

  Scenario: 07 insert 20 instances of test data into Statement Data service simultaneously, 10 of 2024 and 10 of 2025

#The following step sends 20 instances of test data into the Statement Data service simultaneously, 10 of 2024 and 10 of 2025

    When I send bulk test data for 2024 into Statement Data service
    When I send bulk test data for 2025 into Statement Data service

#The following steps confirm that the data has been passed along to the correct services and that the data
#has been processed correctly

    Then I confirm that bulk test data has been successfully inserted into the "ffc-doc-statement-data" database
    Then I confirm that bulk test data has been successfully inserted into the "ffc-doc-statement-constructor" database
    Then I confirm that bulk test data has been successfully inserted into the "ffc-doc-statement-generator" database
