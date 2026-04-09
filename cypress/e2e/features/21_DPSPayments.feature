@local
Feature: 21 DPS Payments

# This feature file is designed to test the end-to-end journey of DPS payments in the local environment.

  Scenario: 01 insert test data via file upload to Azure Blob Storage

  #This scenario uploads a DPS payment file to the relevant Azure Blob Storage container and then confirms that resulting CSV
  #is generated correctly with the correct values

    Given I start ffc-pay-dps service
    When I upload the dps payment file to the Azure Blob Storage container
    Then I pull dps payments file from Azure Blob Storage and confirm that correct values have been generated
