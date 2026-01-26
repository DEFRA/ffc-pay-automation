@local
Feature: 35 PPA Reduction Scenarios

# This feature file is designed to test PPA Reduction processing at various stages of payment installments

  Scenario: 01 PPA Reduction before first installment

  #This scenario tests the processing of a PPA Reduction prior to any payment installments being made  

    Given I restart the local environment
    Given I visit the "Request Editor" homepage
    When I send the updated "ppaScenarios-paymentMessageOne" message to the service bus topic "ffc-pay-request-aw"

#The following steps confirm that the data has been passed along to the correct services and that the data
#has been processed correctly

    Then I confirm that payment test data has been inserted into the ffc-pay-processing database
    Then I confirm that payment test data has been inserted into the ffc-pay-submission database

    #PPA Reduction processed prior to first installment payment

    When I send the updated "ppaScenarios-reductionMessageOne" message to the service bus topic "ffc-pay-request-aw"
    Then I confirm that ppa test data has been inserted into the ffc-pay-processing database

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
    Then I take a screenshot for Feature 35 and Scenario 1
    And I click on the "Yes" edited correctly radio button
    And I click on the "Submit" button

    #First installment payment including PPA Reduction 

    When I update the "value" in message "ppaScenarios-returnMessageOne" to "25000000"
    When I update the "settlementDate" in message "ppaScenarios-returnMessageOne" to "2025-01-02T00:00:00.000Z"
    When I send the updated "ppaScenarios-returnMessageOne" message to the service bus topic "ffc-pay-return-aw"

    When I update the "value" in message "ppaScenarios-reductionReturnMessageOne" to "-5000000"
    When I update the "settlementDate" in message "ppaScenarios-reductionReturnMessageOne" to "2025-01-02T00:00:00.000Z"
    When I send the updated "ppaScenarios-reductionReturnMessageOne" message to the service bus topic "ffc-pay-return-aw"

    Then I confirm that the settled value of Return is 25000000 in database
    Then I confirm that the settled value of PPA is -5000000 in database


    #Second installment payment including PPA Reduction 

    When I update the "value" in message "ppaScenarios-returnMessageOne" to "50000000"
    When I update the "settlementDate" in message "ppaScenarios-returnMessageOne" to "2025-04-02T00:00:00.000Z"
    When I send the updated "ppaScenarios-returnMessageOne" message to the service bus topic "ffc-pay-return-aw"

    When I update the "value" in message "ppaScenarios-reductionReturnMessageOne" to "-10000000"
    When I update the "settlementDate" in message "ppaScenarios-reductionReturnMessageOne" to "2025-04-02T00:00:00.000Z"
    When I send the updated "ppaScenarios-reductionReturnMessageOne" message to the service bus topic "ffc-pay-return-aw"

    Then I confirm that the settled value of Return is 50000000 in database
    Then I confirm that the settled value of PPA is -10000000 in database

    #Third installment payment including PPA Reduction 

    When I update the "value" in message "ppaScenarios-returnMessageOne" to "75000000"
    When I update the "settlementDate" in message "ppaScenarios-returnMessageOne" to "2025-06-02T00:00:00.000Z"
    When I send the updated "ppaScenarios-returnMessageOne" message to the service bus topic "ffc-pay-return-aw"

    When I update the "value" in message "ppaScenarios-reductionReturnMessageOne" to "-15000000"
    When I update the "settlementDate" in message "ppaScenarios-reductionReturnMessageOne" to "2025-06-02T00:00:00.000Z"
    When I send the updated "ppaScenarios-reductionReturnMessageOne" message to the service bus topic "ffc-pay-return-aw"

    Then I confirm that the settled value of Return is 75000000 in database
    Then I confirm that the settled value of PPA is -15000000 in database

    #Fourth installment payment including PPA Reduction 

    When I update the "value" in message "ppaScenarios-returnMessageOne" to "100000000"
    When I update the "settlementDate" in message "ppaScenarios-returnMessageOne" to "2025-09-02T00:00:00.000Z"
    When I send the updated "ppaScenarios-returnMessageOne" message to the service bus topic "ffc-pay-return-aw"

    When I update the "value" in message "ppaScenarios-reductionReturnMessageOne" to "-20000000"
    When I update the "settlementDate" in message "ppaScenarios-reductionReturnMessageOne" to "2025-09-02T00:00:00.000Z"
    When I send the updated "ppaScenarios-reductionReturnMessageOne" message to the service bus topic "ffc-pay-return-aw"

    Then I confirm that the settled value of Return is 100000000 in database
    Then I confirm that the settled value of PPA is -20000000 in database

    Then I pull ppa scenarios payments file from Azure Blob Storage and confirm that correct values have been generated
    Then I pull ppa scenarios reductions file from Azure Blob Storage and confirm that correct values have been generated

  Scenario: 02 PPA Reduction after first installment

  #This scenario tests the processing of a PPA Reduction after first payment installment is made  

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

  #PPA Reduction processed after first installment payment

    When I send the updated "ppaScenarios-reductionMessageOne" message to the service bus topic "ffc-pay-request-aw"
    Then I confirm that ppa test data has been inserted into the ffc-pay-processing database

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
    Then I take a screenshot for Feature 35 and Scenario 2
    And I click on the "Yes" edited correctly radio button
    And I click on the "Submit" button

    #First installment payment including PPA Reduction 

    When I update the "value" in message "ppaScenarios-reductionReturnMessageOne" to "-5000000"
    When I update the "settlementDate" in message "ppaScenarios-reductionReturnMessageOne" to "2025-01-02T00:00:00.000Z"
    When I send the updated "ppaScenarios-reductionReturnMessageOne" message to the service bus topic "ffc-pay-return-aw"
    Then I confirm that the settled value of PPA is -5000000 in database

    #Second installment payment including PPA Reduction 

    When I update the "value" in message "ppaScenarios-returnMessageOne" to "50000000"
    When I update the "settlementDate" in message "ppaScenarios-returnMessageOne" to "2025-04-02T00:00:00.000Z"
    When I send the updated "ppaScenarios-returnMessageOne" message to the service bus topic "ffc-pay-return-aw"

    When I update the "value" in message "ppaScenarios-reductionReturnMessageOne" to "-10000000"
    When I update the "settlementDate" in message "ppaScenarios-reductionReturnMessageOne" to "2025-04-02T00:00:00.000Z"
    When I send the updated "ppaScenarios-reductionReturnMessageOne" message to the service bus topic "ffc-pay-return-aw"

    Then I confirm that the settled value of Return is 50000000 in database
    Then I confirm that the settled value of PPA is -10000000 in database

    #Third installment payment including PPA Reduction 

    When I update the "value" in message "ppaScenarios-returnMessageOne" to "75000000"
    When I update the "settlementDate" in message "ppaScenarios-returnMessageOne" to "2025-06-02T00:00:00.000Z"
    When I send the updated "ppaScenarios-returnMessageOne" message to the service bus topic "ffc-pay-return-aw"

    When I update the "value" in message "ppaScenarios-reductionReturnMessageOne" to "-15000000"
    When I update the "settlementDate" in message "ppaScenarios-reductionReturnMessageOne" to "2025-06-02T00:00:00.000Z"
    When I send the updated "ppaScenarios-reductionReturnMessageOne" message to the service bus topic "ffc-pay-return-aw"

    Then I confirm that the settled value of Return is 75000000 in database
    Then I confirm that the settled value of PPA is -15000000 in database

    #Fourth installment payment including PPA Reduction 

    When I update the "value" in message "ppaScenarios-returnMessageOne" to "100000000"
    When I update the "settlementDate" in message "ppaScenarios-returnMessageOne" to "2025-09-02T00:00:00.000Z"
    When I send the updated "ppaScenarios-returnMessageOne" message to the service bus topic "ffc-pay-return-aw"

    When I update the "value" in message "ppaScenarios-reductionReturnMessageOne" to "-20000000"
    When I update the "settlementDate" in message "ppaScenarios-reductionReturnMessageOne" to "2025-09-02T00:00:00.000Z"
    When I send the updated "ppaScenarios-reductionReturnMessageOne" message to the service bus topic "ffc-pay-return-aw"

    Then I confirm that the settled value of Return is 100000000 in database
    Then I confirm that the settled value of PPA is -20000000 in database

    Then I pull ppa scenarios payments file from Azure Blob Storage and confirm that correct values have been generated
    Then I pull ppa scenarios reductions file from Azure Blob Storage and confirm that correct values have been generated

  Scenario: 03 PPA Reduction after second installment

  #This scenario tests the processing of a PPA Reduction after second payment installment is made  

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

  #PPA Reduction processed after second installment payment

    When I send the updated "ppaScenarios-reductionMessageOne" message to the service bus topic "ffc-pay-request-aw"
    Then I confirm that ppa test data has been inserted into the ffc-pay-processing database

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
    Then I take a screenshot for Feature 35 and Scenario 3
    And I click on the "Yes" edited correctly radio button
    And I click on the "Submit" button

    #First PPA Reduction 

    When I update the "value" in message "ppaScenarios-reductionReturnMessageOne" to "-10000000"
    When I update the "settlementDate" in message "ppaScenarios-reductionReturnMessageOne" to "2025-04-02T00:00:00.000Z"
    When I send the updated "ppaScenarios-reductionReturnMessageOne" message to the service bus topic "ffc-pay-return-aw"
    Then I confirm that the settled value of PPA is -10000000 in database

    #Third installment payment including PPA Reduction 

    When I update the "value" in message "ppaScenarios-returnMessageOne" to "75000000"
    When I update the "settlementDate" in message "ppaScenarios-returnMessageOne" to "2025-06-02T00:00:00.000Z"
    When I send the updated "ppaScenarios-returnMessageOne" message to the service bus topic "ffc-pay-return-aw"

    When I update the "value" in message "ppaScenarios-reductionReturnMessageOne" to "-15000000"
    When I update the "settlementDate" in message "ppaScenarios-reductionReturnMessageOne" to "2025-06-02T00:00:00.000Z"
    When I send the updated "ppaScenarios-reductionReturnMessageOne" message to the service bus topic "ffc-pay-return-aw"

    Then I confirm that the settled value of Return is 75000000 in database
    Then I confirm that the settled value of PPA is -15000000 in database

    #Fourth installment payment including PPA Reduction 

    When I update the "value" in message "ppaScenarios-returnMessageOne" to "100000000"
    When I update the "settlementDate" in message "ppaScenarios-returnMessageOne" to "2025-09-02T00:00:00.000Z"
    When I send the updated "ppaScenarios-returnMessageOne" message to the service bus topic "ffc-pay-return-aw"

    When I update the "value" in message "ppaScenarios-reductionReturnMessageOne" to "-20000000"
    When I update the "settlementDate" in message "ppaScenarios-reductionReturnMessageOne" to "2025-09-02T00:00:00.000Z"
    When I send the updated "ppaScenarios-reductionReturnMessageOne" message to the service bus topic "ffc-pay-return-aw"

    Then I confirm that the settled value of Return is 100000000 in database
    Then I confirm that the settled value of PPA is -20000000 in database

    Then I pull ppa scenarios payments file from Azure Blob Storage and confirm that correct values have been generated
    Then I pull ppa scenarios reductions file from Azure Blob Storage and confirm that correct values have been generated

  Scenario: 04 PPA Reduction after third installment

  #This scenario tests the processing of a PPA Reduction after third payment installment is made  

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

  #PPA Reduction processed after third installment payment
    When I send the updated "ppaScenarios-reductionMessageOne" message to the service bus topic "ffc-pay-request-aw"
    Then I confirm that ppa test data has been inserted into the ffc-pay-processing database

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
    Then I take a screenshot for Feature 35 and Scenario 4
    And I click on the "Yes" edited correctly radio button
    And I click on the "Submit" button

    #First PPA Reduction 

    When I update the "value" in message "ppaScenarios-reductionReturnMessageOne" to "-15000000"
    When I update the "settlementDate" in message "ppaScenarios-reductionReturnMessageOne" to "2025-06-02T00:00:00.000Z"
    When I send the updated "ppaScenarios-reductionReturnMessageOne" message to the service bus topic "ffc-pay-return-aw"
    Then I confirm that the settled value of PPA is -15000000 in database

    #Fourth installment payment including PPA Reduction 

    When I update the "value" in message "ppaScenarios-returnMessageOne" to "100000000"
    When I update the "settlementDate" in message "ppaScenarios-returnMessageOne" to "2025-09-02T00:00:00.000Z"
    When I send the updated "ppaScenarios-returnMessageOne" message to the service bus topic "ffc-pay-return-aw"

    When I update the "value" in message "ppaScenarios-reductionReturnMessageOne" to "-20000000"
    When I update the "settlementDate" in message "ppaScenarios-reductionReturnMessageOne" to "2025-09-02T00:00:00.000Z"
    When I send the updated "ppaScenarios-reductionReturnMessageOne" message to the service bus topic "ffc-pay-return-aw"

    Then I confirm that the settled value of Return is 100000000 in database
    Then I confirm that the settled value of PPA is -20000000 in database

    Then I pull ppa scenarios payments file from Azure Blob Storage and confirm that correct values have been generated
    Then I pull ppa scenarios reductions file from Azure Blob Storage and confirm that correct values have been generated

  