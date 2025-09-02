@local @documents
Feature: 14 Doc E2E Journey

# This feature file is designed to test the end-to-end journey of document services in the local environment.

  Scenario: 01 insert test data into Statement Data service
    Given I restart and clear the local doc environment
    When I insert test data into Statement Data service

#The following steps confirm that the data has been passed along to the correct services and that the data
#has been processed correctly

    Then I confirm that test data has been inserted into the ffc-doc-statement-data database
    Then I confirm that test data has been inserted into the ffc-doc-statement-constructor database
    Then I confirm that test data has been inserted into the ffc-doc-statement-generator database
    Then I confirm that test data has been inserted into the ffc-doc-statement-publisher database

#Finally the last step downloads file from Azure Blob Storage and confirms that the values given in the data inserted into the 
#Statement Data Service have been correctly added to the generated statement

    Then I pull file from Azure Blob Storage and confirm that correct values have been generated