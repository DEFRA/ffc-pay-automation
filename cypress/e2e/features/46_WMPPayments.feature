Feature: 46 WMP Payments

# npm run cypress:dev:one -- "\cypress\e2e\features\46_WMPPayments.feature"
# npm run cypress:local:one -- "\cypress\e2e\features\46_WMPPayments.feature"

#This feature file is designed to test the end-to-end journey of WMP payment in the local environment.


#---------------------------------------------------------

# ██╗    ██╗███╗   ███╗ ██████╗
# ██║    ██║████╗ ████║ ██╔══██╗
# ██║ █╗ ██║██╔████╔██║ ██████╔╝
# ██║███╗██║██║╚██╔╝██║ ██╔═══╝
# ╚███╔███╔╝██║ ╚═╝ ██║ ██║
#  ╚══╝╚══╝ ╚═╝     ╚═╝ ╚═╝

# COMMENTED OUT DEV SCENARIOS - WMP NOT SWITCHED ON IN DEV YET
#--------------------------------------------------------

  # @dev
  # Scenario: 01 insert incorrect WMP test data via service bus message to ffc-pay-request

  #   When I send "wmp error" test data message to the service bus topic "ffc-pay-request-dev"

  #   Then I confirm that payment test data in dev has not been inserted into the ffc-pay-processing database
  #   Then I confirm that payment test data in dev has not been inserted into the ffc-pay-submission database

  # @dev
  # Scenario: 02 insert test data via service bus message to ffc-pay-request

  # #For E2E journey in Dev the scenarios have been consolidated into one in order to facilitate reuse of variables used for 
  # #test data

  #   # Given I visit the "Payment management" homepage
  #   # When I click on the "View payment events by scheme" link
  #   # And I select "Woodland Management Plan" from the monitor schemes dropdown
  #   # And I click on the "Continue" button
  #   # Then I store the number of payments and total value of payments for the current scheme

  # #Scans DB for highest values and then iterates them by 1, this ensures the script can be reran
  # #without the risk of data conflicts  

  #   When I send "wmp payment" test data message to the service bus topic "ffc-pay-request-dev"

  #   Then I confirm that payment test data in dev has been inserted into the ffc-pay-processing database
  #   Then I confirm that payment test data in dev has been inserted into the ffc-pay-submission database

  #   Then I pull wmp file from Azure Blob Storage and confirm that correct values have been generated

  # #Updates template values with values used in payment message  

  #   When I send "wmp return" test data message to the service bus topic "ffc-pay-return-dev"
  #   Then I confirm that "return" test data in dev has been inserted into ffc-pay-processing database

  # #Updates template values with values used in payment message
  #  #Please note that WMP PPA files do not result in a routing to Request Editor as is
  # #the case with most other schemes but instead is handled as a separated payment and goes straight to submission  


  #   When I send "wmp ppa" test data message to the service bus topic "ffc-pay-request-dev"
  #   Then I confirm that "ppa" test data in dev has been inserted into ffc-pay-processing database


  #   Given I visit the "Payment management" homepage
  #   When I click on the "View payment events by scheme" link
  #   And I select "Woodland Management Plan" from the monitor schemes dropdown
  #   And I click on the "Continue" button
  #   Then I confirm that number of payments has increased by 2 and total value of payments has increased by "£110,000"
  #   Then I take a screenshot

  @local
  Scenario: 01 insert incorrect WMP test data via service bus message to ffc-pay-request

 #First ensure that incorrect data will not be processed

    Given I restart the local environment
    Given I visit the "Request Editor" homepage
    When I send the updated "wmpError-paymentFileMessage" message to the service bus topic "ffc-pay-request-auto"
    Then I confirm that payment test data has not been inserted into the ffc-pay-processing database

  @local
  Scenario: 02 insert test data via service bus message to ffc-pay-request

    When I send the updated "wmp-paymentFileMessage" message to the service bus topic "ffc-pay-request-auto"

#The following steps confirm that the data has been passed along to the correct services and that the data
#has been processed correctly

    Then I confirm that payment test data has been inserted into the ffc-pay-processing database
    Then I confirm that payment test data has been inserted into the ffc-pay-submission database

#The following step downloads file from Azure Blob Storage and confirms that the values given in the data inserted into the 
#Pay Submission Service have been correctly added to the generated statement

    Then I pull wmp file from Azure Blob Storage and confirm that correct values have been generated

  @local
  Scenario: 03 send return file message and confirm processing

#This scenario confirms that a return file message can be sent and processed correctly

    When I send the updated "wmp-returnFileMessage" message to the service bus topic "ffc-pay-return-auto"
    Then I confirm that "return" test data has been inserted into the "ffc-pay-processing" database

  @local
  Scenario: 04 send WMP PPA file message and confirm processing

  #This scenario confirms that a PPA file message can be sent and processed correctly

    When I send the updated "wmp-ppaFileMessage" message to the service bus topic "ffc-pay-request-auto"
    Then I confirm that "ppa" test data has been inserted into the "ffc-pay-processing" database

  @local
  Scenario: 05 Confirm payment request processed in Payment Management

    Given I visit the "Payment management" homepage
    When I click on the "View payment events by scheme" link
    And I select "Woodland Management Plan" from the monitor schemes dropdown
    And I click on the "Continue" button
    Then I confirm that payment for "Woodland Management Plan" scheme with "2" payment installments totalling "£110,000" is displayed
    Then I take a screenshot