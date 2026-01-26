@local
Feature: 36 PPA Recovery Scenarios

# This feature file is designed to test PPA Recovery processing at various stages of payment installments

  Scenario: 01 PPA Recovery after first installment
  
#This scenario tests the processing of a PPA Recovery after first payment installment is made  

    Given I restart the local environment
    Given I visit the "Request Editor" homepage
    When I send the updated "ppaScenarios-paymentMessageOne" message to the service bus topic "ffc-pay-request-aw"

#The following steps confirm that the data has been passed along to the correct services and that the data
#has been processed correctly

    Then I confirm that payment test data has been inserted into the ffc-pay-processing database
    Then I confirm that payment test data has been inserted into the ffc-pay-submission database

#First installment payment

    When I update the "value" in message "ppaScenarios-returnMessageOne" to "25000000"
    When I update the "settlementDate" in message "ppaScenarios-returnMessageOne" to "2025-01-02T00:00:00.000Z"
    When I send the updated "ppaScenarios-returnMessageOne" message to the service bus topic "ffc-pay-return-aw"
    Then I confirm that the settled value of Return is 25000000 in database

#PPA Recovery processed after first installment payment

    When I send the updated "ppaScenarios-recoveryMessageOne" message to the service bus topic "ffc-pay-request-aw"
    Then I confirm that ppa test data has been inserted into the ffc-pay-processing database

    Given I visit the "Request Editor" homepage
    And I click on the "View awaiting reporting data" link
    And I click on the "Enrich" link
    And I click on the "Irregular" debt type radio button
    And I enter a valid debt discovered date in the past
    And I click on the "Continue" button
    And I click on the "Back" link
    And I click on the "Sign Out" link

    Given I visit the "Request Editor" homepage
    And I click on the "View awaiting ledger assignment" link
    When I search for FRN "1043959492"
    When I click on the FRN search button
    And I click on the "Review" link
    And I click on the "Yes" provisional values radio button
    And I click on the "Continue" button
    And I am on the "quality-check" subpage
    And I click on the "Sign Out" link


    Given I visit the "Request Editor" homepage
    And I click on the "View awaiting quality check" link
    When I search for FRN "1043959492"
    When I click on the FRN search button
    And I click on the "Review" link
    Then I take a screenshot for Feature 36 and Scenario 1
    And I click on the "Yes" edited correctly radio button
    And I click on the "Submit" button

#Q2 payment - Original AP settlement increases to 50000000 while PR2 AP settlement is -25000000

    When I update the "value" in message "ppaScenarios-returnMessageOne" to "50000000"
    When I update the "settlementDate" in message "ppaScenarios-returnMessageOne" to "2025-04-02T00:00:00.000Z"
    When I send the updated "ppaScenarios-returnMessageOne" message to the service bus topic "ffc-pay-return-aw"
    Then I confirm that the settled value of Return is 50000000 in database

    When I update the "value" in message "ppaScenarios-recoveryReturnMessageOne" to "-25000000"
    When I update the "settlementDate" in message "ppaScenarios-recoveryReturnMessageOne" to "2025-04-02T00:00:00.000Z"
    When I send the updated "ppaScenarios-recoveryReturnMessageOne" message to the service bus topic "ffc-pay-return-aw"

    Then I confirm that the settled value of PPA Recovery is -25000000 in database

#Q3 payment - Original AP settlement increases to 75000000 while PR2 AP settlement is -50000000 

    When I update the "value" in message "ppaScenarios-returnMessageOne" to "75000000"
    When I update the "settlementDate" in message "ppaScenarios-returnMessageOne" to "2025-06-02T00:00:00.000Z"
    When I send the updated "ppaScenarios-returnMessageOne" message to the service bus topic "ffc-pay-return-aw"
    Then I confirm that the settled value of Return is 75000000 in database

    When I update the "value" in message "ppaScenarios-recoveryReturnMessageOne" to "-50000000"
    When I update the "settlementDate" in message "ppaScenarios-recoveryReturnMessageOne" to "2025-06-02T00:00:00.000Z"
    When I send the updated "ppaScenarios-recoveryReturnMessageOne" message to the service bus topic "ffc-pay-return-aw"

    Then I confirm that the settled value of PPA Recovery is -50000000 in database
    
#Q4 payment - Original AP settlement increases to 100000000 while PR2 AP settlement is 75000000

    When I update the "value" in message "ppaScenarios-returnMessageOne" to "100000000"
    When I update the "settlementDate" in message "ppaScenarios-returnMessageOne" to "2025-09-02T00:00:00.000Z"
    When I send the updated "ppaScenarios-returnMessageOne" message to the service bus topic "ffc-pay-return-aw"
    Then I confirm that the settled value of Return is 100000000 in database

    When I update the "value" in message "ppaScenarios-recoveryReturnMessageOne" to "-75000000"
    When I update the "settlementDate" in message "ppaScenarios-recoveryReturnMessageOne" to "2025-09-02T00:00:00.000Z"
    When I send the updated "ppaScenarios-recoveryReturnMessageOne" message to the service bus topic "ffc-pay-return-aw"
 
    Then I confirm that the settled value of PPA Recovery is -75000000 in database

    Then I pull ppa scenarios payments file from Azure Blob Storage and confirm that correct values have been generated
    Then I pull ppa scenarios recoveries file from Azure Blob Storage and confirm that correct values have been generated

  Scenario: 02 PPA Recovery after second installment

#This scenario tests the processing of a PPA Recovery after second payment installment is made  

    Given I restart the local environment
    Given I visit the "Request Editor" homepage
    When I send the updated "ppaScenarios-paymentMessageOne" message to the service bus topic "ffc-pay-request-aw"

#The following steps confirm that the data has been passed along to the correct services and that the data
#has been processed correctly

    Then I confirm that payment test data has been inserted into the ffc-pay-processing database
    Then I confirm that payment test data has been inserted into the ffc-pay-submission database

#First installment payment

    When I update the "value" in message "ppaScenarios-returnMessageOne" to "25000000"
    When I update the "settlementDate" in message "ppaScenarios-returnMessageOne" to "2025-01-02T00:00:00.000Z"
    When I send the updated "ppaScenarios-returnMessageOne" message to the service bus topic "ffc-pay-return-aw"
    Then I confirm that the settled value of Return is 25000000 in database

#Second installment payment

    When I update the "value" in message "ppaScenarios-returnMessageOne" to "50000000"
    When I update the "settlementDate" in message "ppaScenarios-returnMessageOne" to "2025-04-02T00:00:00.000Z"
    When I send the updated "ppaScenarios-returnMessageOne" message to the service bus topic "ffc-pay-return-aw"
    Then I confirm that the settled value of Return is 50000000 in database

#PPA Recovery processed after second installment payment

    When I send the updated "ppaScenarios-recoveryMessageOne" message to the service bus topic "ffc-pay-request-aw"
    Then I confirm that ppa test data has been inserted into the ffc-pay-processing database

    Given I visit the "Request Editor" homepage
    And I click on the "View awaiting reporting data" link
    And I click on the "Enrich" link
    And I click on the "Irregular" debt type radio button
    And I enter a valid debt discovered date in the past
    And I click on the "Continue" button
    And I click on the "Back" link
    And I click on the "Sign Out" link

    Given I visit the "Request Editor" homepage
    And I click on the "View awaiting ledger assignment" link
    When I search for FRN "1043959492"
    When I click on the FRN search button
    And I click on the "Review" link
    And I click on the "Yes" provisional values radio button
    And I click on the "Continue" button
    And I am on the "quality-check" subpage
    And I click on the "Sign Out" link


    Given I visit the "Request Editor" homepage
    And I click on the "View awaiting quality check" link
    When I search for FRN "1043959492"
    When I click on the FRN search button
    And I click on the "Review" link
    Then I take a screenshot for Feature 36 and Scenario 2
    And I click on the "Yes" edited correctly radio button
    And I click on the "Submit" button

#3rd installment payment - Original AP settlement increases to 75000000 and PPA Recovery is -25000000

    When I update the "value" in message "ppaScenarios-returnMessageOne" to "75000000"
    When I update the "settlementDate" in message "ppaScenarios-returnMessageOne" to "2025-06-02T00:00:00.000Z"
    When I send the updated "ppaScenarios-returnMessageOne" message to the service bus topic "ffc-pay-return-aw"
    Then I confirm that the settled value of Return is 75000000 in database

    When I update the "value" in message "ppaScenarios-recoveryReturnMessageOne" to "-25000000"
    When I update the "settlementDate" in message "ppaScenarios-recoveryReturnMessageOne" to "2025-06-02T00:00:00.000Z"
    When I send the updated "ppaScenarios-recoveryReturnMessageOne" message to the service bus topic "ffc-pay-return-aw"
    Then I confirm that the settled value of PPA Recovery is -25000000 in database

#4th installment payment - Original AP settlement increases to 100000000 and PPA Recovery is -50000000

    When I update the "value" in message "ppaScenarios-returnMessageOne" to "100000000"
    When I update the "settlementDate" in message "ppaScenarios-returnMessageOne" to "2025-09-02T00:00:00.000Z"
    When I send the updated "ppaScenarios-returnMessageOne" message to the service bus topic "ffc-pay-return-aw"
    Then I confirm that the settled value of Return is 100000000 in database

    When I update the "value" in message "ppaScenarios-recoveryReturnMessageOne" to "-50000000"
    When I update the "settlementDate" in message "ppaScenarios-recoveryReturnMessageOne" to "2025-09-02T00:00:00.000Z"
    When I send the updated "ppaScenarios-recoveryReturnMessageOne" message to the service bus topic "ffc-pay-return-aw"
    Then I confirm that the settled value of PPA Recovery is -50000000 in database

    Then I pull ppa scenarios payments file from Azure Blob Storage and confirm that correct values have been generated
    Then I pull ppa scenarios recoveries file from Azure Blob Storage and confirm that correct values have been generated

  Scenario: 03 PPA Recovery after third installment

#This scenario tests the processing of a PPA Recovery after third payment installment is made  

    Given I restart the local environment
    Given I visit the "Request Editor" homepage
    When I send the updated "ppaScenarios-paymentMessageOne" message to the service bus topic "ffc-pay-request-aw"

#The following steps confirm that the data has been passed along to the correct services and that the data
#has been processed correctly

    Then I confirm that payment test data has been inserted into the ffc-pay-processing database
    Then I confirm that payment test data has been inserted into the ffc-pay-submission database

#First installment payment

    When I update the "value" in message "ppaScenarios-returnMessageOne" to "25000000"
    When I update the "settlementDate" in message "ppaScenarios-returnMessageOne" to "2025-01-02T00:00:00.000Z"
    When I send the updated "ppaScenarios-returnMessageOne" message to the service bus topic "ffc-pay-return-aw"
    Then I confirm that the settled value of Return is 25000000 in database

#Second installment payment

    When I update the "value" in message "ppaScenarios-returnMessageOne" to "50000000"
    When I update the "settlementDate" in message "ppaScenarios-returnMessageOne" to "2025-04-02T00:00:00.000Z"
    When I send the updated "ppaScenarios-returnMessageOne" message to the service bus topic "ffc-pay-return-aw"
    Then I confirm that the settled value of Return is 50000000 in database

#Third installment payment

    When I update the "value" in message "ppaScenarios-returnMessageOne" to "75000000"
    When I update the "settlementDate" in message "ppaScenarios-returnMessageOne" to "2025-06-02T00:00:00.000Z"
    When I send the updated "ppaScenarios-returnMessageOne" message to the service bus topic "ffc-pay-return-aw"
    Then I confirm that the settled value of Return is 75000000 in database

#PPA Recovery processed after third installment payment

    When I send the updated "ppaScenarios-recoveryMessageOne" message to the service bus topic "ffc-pay-request-aw"
    Then I confirm that ppa test data has been inserted into the ffc-pay-processing database

    Given I visit the "Request Editor" homepage
    And I click on the "View awaiting reporting data" link
    And I click on the "Enrich" link
    And I click on the "Irregular" debt type radio button
    And I enter a valid debt discovered date in the past
    And I click on the "Continue" button
    And I click on the "Back" link
    And I click on the "Sign Out" link

    Given I visit the "Request Editor" homepage
    And I click on the "View awaiting ledger assignment" link
    When I search for FRN "1043959492"
    When I click on the FRN search button
    And I click on the "Review" link
    And I click on the "Yes" provisional values radio button
    And I click on the "Continue" button
    And I am on the "quality-check" subpage
    And I click on the "Sign Out" link


    Given I visit the "Request Editor" homepage
    And I click on the "View awaiting quality check" link
    When I search for FRN "1043959492"
    When I click on the FRN search button
    And I click on the "Review" link
    Then I take a screenshot for Feature 36 and Scenario 3
    And I click on the "Yes" edited correctly radio button
    And I click on the "Submit" button

    #4th installment payment - Original AP settlement increases to 100000000 and PPA Recovery is -25000000

    When I update the "value" in message "ppaScenarios-returnMessageOne" to "100000000"
    When I update the "settlementDate" in message "ppaScenarios-returnMessageOne" to "2025-09-02T00:00:00.000Z"
    When I send the updated "ppaScenarios-returnMessageOne" message to the service bus topic "ffc-pay-return-aw"
    Then I confirm that the settled value of Return is 100000000 in database

    When I update the "value" in message "ppaScenarios-recoveryReturnMessageOne" to "-25000000"
    When I update the "settlementDate" in message "ppaScenarios-recoveryReturnMessageOne" to "2025-09-02T00:00:00.000Z"
    When I send the updated "ppaScenarios-recoveryReturnMessageOne" message to the service bus topic "ffc-pay-return-aw"
 
    Then I confirm that the settled value of PPA Recovery is -25000000 in database

    Then I pull ppa scenarios payments file from Azure Blob Storage and confirm that correct values have been generated
    Then I pull ppa scenarios recoveries file from Azure Blob Storage and confirm that correct values have been generated

  Scenario: 04 PPA Recovery after fourth installment

#This scenario tests the processing of a PPA Recovery after fourth payment installment is made  

    Given I restart the local environment
    Given I visit the "Request Editor" homepage
    When I send the updated "ppaScenarios-paymentMessageOne" message to the service bus topic "ffc-pay-request-aw"

#The following steps confirm that the data has been passed along to the correct services and that the data
#has been processed correctly

    Then I confirm that payment test data has been inserted into the ffc-pay-processing database
    Then I confirm that payment test data has been inserted into the ffc-pay-submission database

#First installment payment

    When I update the "value" in message "ppaScenarios-returnMessageOne" to "25000000"
    When I update the "settlementDate" in message "ppaScenarios-returnMessageOne" to "2025-01-02T00:00:00.000Z"
    When I send the updated "ppaScenarios-returnMessageOne" message to the service bus topic "ffc-pay-return-aw"
    Then I confirm that the settled value of Return is 25000000 in database

#Second installment payment

    When I update the "value" in message "ppaScenarios-returnMessageOne" to "50000000"
    When I update the "settlementDate" in message "ppaScenarios-returnMessageOne" to "2025-04-02T00:00:00.000Z"
    When I send the updated "ppaScenarios-returnMessageOne" message to the service bus topic "ffc-pay-return-aw"
    Then I confirm that the settled value of Return is 50000000 in database

#Third installment payment

    When I update the "value" in message "ppaScenarios-returnMessageOne" to "75000000"
    When I update the "settlementDate" in message "ppaScenarios-returnMessageOne" to "2025-06-02T00:00:00.000Z"
    When I send the updated "ppaScenarios-returnMessageOne" message to the service bus topic "ffc-pay-return-aw"
    Then I confirm that the settled value of Return is 75000000 in database

#Fourth installment payment

    When I update the "value" in message "ppaScenarios-returnMessageOne" to "100000000"
    When I update the "settlementDate" in message "ppaScenarios-returnMessageOne" to "2025-09-02T00:00:00.000Z"
    When I send the updated "ppaScenarios-returnMessageOne" message to the service bus topic "ffc-pay-return-aw"
    Then I confirm that the settled value of Return is 100000000 in database

    Then I pull ppa scenarios payments file from Azure Blob Storage and confirm that correct values have been generated

#PPA Recovery processed after fourth installment payment

    When I send the updated "ppaScenarios-recoveryMessageOne" message to the service bus topic "ffc-pay-request-aw"
    Then I confirm that ppa test data has been inserted into the ffc-pay-processing database

    Given I visit the "Request Editor" homepage
    And I click on the "View awaiting reporting data" link
    And I click on the "Enrich" link
    And I click on the "Irregular" debt type radio button
    And I enter a valid debt discovered date in the past
    And I click on the "Continue" button
    And I click on the "Back" link
    And I click on the "Sign Out" link

    Given I visit the "Request Editor" homepage
    And I click on the "View awaiting ledger assignment" link
    When I search for FRN "1043959492"
    When I click on the FRN search button
    And I click on the "Review" link
    And I click on the "Yes" provisional values radio button
    And I click on the "Continue" button
    And I am on the "quality-check" subpage
    And I click on the "Sign Out" link

#Following steps complete the journey as full value of initial payment has been made and PPA Recovery processed

    Given I visit the "Request Editor" homepage
    And I click on the "View awaiting quality check" link
    When I search for FRN "1043959492"
    When I click on the FRN search button
    And I click on the "Review" link
    Then I take a screenshot for Feature 36 and Scenario 4
    And I click on the "Yes" edited correctly radio button
    And I click on the "Submit" button
    