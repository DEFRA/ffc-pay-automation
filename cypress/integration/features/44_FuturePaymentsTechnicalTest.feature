@local
Feature: 44 Future Payments Technical Test

# This feature file is designed to test E2E journey of Future Payments Technical Test scheme

  Scenario: 01 Confirm that payment request will be rejected if there is a value mismatch

  #This scenario confirms that payment request will be rejected if there is a value mismatch between the values declared
  #In the main message body and the values declared in the invoice lines. It also confirms that expected error message is
  #generated

    Given I restart the local environment
    When I send the updated "fpttError-paymentFileMessage" message to the service bus topic "ffc-pay-request-aw"
    Then I confirm that payment test data has not been inserted into the ffc-pay-processing database
    Then I confirm that "invoice lines do not match" error message has been generated

  Scenario: 02 insert test data via service bus message to ffc-pay-request

    When I send the updated "fptt-paymentFileMessage" message to the service bus topic "ffc-pay-request-aw"

#The following steps confirm that the data has been passed along to the correct services and that the data
#has been processed correctly

    Then I confirm that payment test data has been inserted into the ffc-pay-processing database
    Then I confirm that payment test data has been inserted into the ffc-pay-submission database

#The following step downloads file from Azure Blob Storage and confirms that the values given in the data inserted into the 
#Pay Submission Service have been correctly added to the generated statement

    Then I pull fptt file from Azure Blob Storage and confirm that correct values have been generated

  Scenario: 03 send return file message and confirm processing

#This scenario confirms that a return file message can be sent and processed correctly

    When I send the updated "fptt-returnFileMessage" message to the service bus topic "ffc-pay-return-aw"
    Then I confirm that return test data has been inserted into the ffc-pay-processing database

  Scenario: 04 send PPA file message and confirm processing

#This scenario confirms that a PPA file message can be sent and processed correctly.

#Please note that FPTT PPA files do not result in a routing to Request Editor as is
#the case with most other schemes but instead is handled as a separated payment and goes straight to submission  

    When I send the updated "fptt-ppaFileMessage" message to the service bus topic "ffc-pay-request-aw"
    Then I confirm that ppa test data has been inserted into the ffc-pay-processing database