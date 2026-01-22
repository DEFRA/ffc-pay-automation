@local
Feature: 34 PPA Top-up Scenarios

# This feature file is designed to test PPA Top-up processing at various stages of payment installments

  Scenario: 01 PPA Top-up before first installment

#This scenario tests the processing of a PPA Top-up prior to any payment installments being made  

    Given I restart the local environment
    Given I visit the "Payment management" homepage
    When I send the updated "ppaScenarios-paymentMessageOne" message to the service bus topic "ffc-pay-request-aw"

#The following steps confirm that the data has been passed along to the correct services and that the data
#has been processed correctly

    Then I confirm that payment test data has been inserted into the ffc-pay-processing database
    Then I confirm that payment test data has been inserted into the ffc-pay-submission database

#PPA File processed prior to first installment payment

    When I send the updated "ppaScenarios-ppaMessageOne" message to the service bus topic "ffc-pay-request-aw"
    Then I confirm that ppa test data has been inserted into the ffc-pay-processing database

#First installment payment including PPA Top-up    

    When I update the "value" in message "ppaScenarios-returnMessageOne" to "25000000"
    When I update the "settlementDate" in message "ppaScenarios-returnMessageOne" to "2025-01-02T00:00:00.000Z"
    When I send the updated "ppaScenarios-returnMessageOne" message to the service bus topic "ffc-pay-return-aw"

    When I update the "value" in message "ppaScenarios-ppaReturnMessageOne" to "10000000"
    When I update the "settlementDate" in message "ppaScenarios-ppaReturnMessageOne" to "2025-01-02T00:00:00.000Z"
    When I send the updated "ppaScenarios-ppaReturnMessageOne" message to the service bus topic "ffc-pay-return-aw"

#Confirm settled values in database    

    Then I confirm that the settled value of Return is 25000000 in database
    Then I confirm that the settled value of PPA is 10000000 in database

#Second installment payment including PPA Top-up    

    When I update the "value" in message "ppaScenarios-returnMessageOne" to "50000000"
    When I update the "settlementDate" in message "ppaScenarios-returnMessageOne" to "2025-04-02T00:00:00.000Z"
    When I send the updated "ppaScenarios-returnMessageOne" message to the service bus topic "ffc-pay-return-aw"

    When I update the "value" in message "ppaScenarios-ppaReturnMessageOne" to "20000000"
    When I update the "settlementDate" in message "ppaScenarios-ppaReturnMessageOne" to "2025-04-02T00:00:00.000Z"
    When I send the updated "ppaScenarios-ppaReturnMessageOne" message to the service bus topic "ffc-pay-return-aw"

#Confirm settled values in database

    Then I confirm that the settled value of Return is 50000000 in database
    Then I confirm that the settled value of PPA is 20000000 in database

#Third installment payment including PPA Top-up      

    When I update the "settlementDate" in message "ppaScenarios-returnMessageOne" to "2025-06-02T00:00:00.000Z"
    When I update the "value" in message "ppaScenarios-returnMessageOne" to "75000000"
    When I send the updated "ppaScenarios-returnMessageOne" message to the service bus topic "ffc-pay-return-aw"

    When I update the "settlementDate" in message "ppaScenarios-ppaReturnMessageOne" to "2025-06-02T00:00:00.000Z"
    When I update the "value" in message "ppaScenarios-ppaReturnMessageOne" to "30000000"
    When I send the updated "ppaScenarios-ppaReturnMessageOne" message to the service bus topic "ffc-pay-return-aw"

#Confirm settled values in database
    
    Then I confirm that the settled value of Return is 75000000 in database
    Then I confirm that the settled value of PPA is 30000000 in database

#Fourth installment payment including PPA Top-up     

    When I update the "settlementDate" in message "ppaScenarios-returnMessageOne" to "2025-09-02T00:00:00.000Z"
    When I update the "value" in message "ppaScenarios-returnMessageOne" to "100000000"
    When I send the updated "ppaScenarios-returnMessageOne" message to the service bus topic "ffc-pay-return-aw"

    When I update the "settlementDate" in message "ppaScenarios-ppaReturnMessageOne" to "2025-09-02T00:00:00.000Z"
    When I update the "value" in message "ppaScenarios-ppaReturnMessageOne" to "40000000"
    When I send the updated "ppaScenarios-ppaReturnMessageOne" message to the service bus topic "ffc-pay-return-aw"

#Confirm settled values in database    

    Then I confirm that the settled value of Return is 100000000 in database
    Then I confirm that the settled value of PPA is 40000000 in database

#Confirm correct payment request values in Payment Management UI    

    Given I visit the "Payment management" homepage
    When I click on the "View processed payment requests" link
    And I select "Expanded SFI Offer" from the monitor schemes dropdown
    And I click on the "Continue" button
    Then I confirm that payment for "Expanded SFI Offer" scheme with "2" payment installments totalling "£1,400,000.00" is displayed
    Then I take a screenshot for Feature 34 and Scenario 1

  Scenario: 02 PPA Top-up after first installment

#This scenario tests the processing of a PPA Top-up after the first payment installment has been made  

    Given I restart the local environment
    Given I visit the "Payment management" homepage
    When I send the updated "ppaScenarios-paymentMessageOne" message to the service bus topic "ffc-pay-request-aw"

#The following steps confirm that the data has been passed along to the correct services and that the data
#has been processed correctly

    Then I confirm that payment test data has been inserted into the ffc-pay-processing database
    Then I confirm that payment test data has been inserted into the ffc-pay-submission database

#First installment payment prior to PPA Top-up
    

    When I update the "value" in message "ppaScenarios-returnMessageOne" to "25000000"
    When I update the "settlementDate" in message "ppaScenarios-returnMessageOne" to "2025-01-02T00:00:00.000Z"
    When I send the updated "ppaScenarios-returnMessageOne" message to the service bus topic "ffc-pay-return-aw"
    Then I confirm that the settled value of Return is 25000000 in database

#PPA File processed after first installment payment

    When I send the updated "ppaScenarios-ppaMessageOne" message to the service bus topic "ffc-pay-request-aw"
    Then I confirm that ppa test data has been inserted into the ffc-pay-processing database

#First PPA top up payment

    When I update the "value" in message "ppaScenarios-ppaReturnMessageOne" to "10000000"
    When I update the "settlementDate" in message "ppaScenarios-ppaReturnMessageOne" to "2025-01-02T00:00:00.000Z"
    When I send the updated "ppaScenarios-ppaReturnMessageOne" message to the service bus topic "ffc-pay-return-aw"
    Then I confirm that the settled value of PPA is 10000000 in database

#Second installment payment including PPA Top-up    

    When I update the "value" in message "ppaScenarios-returnMessageOne" to "50000000"
    When I update the "settlementDate" in message "ppaScenarios-returnMessageOne" to "2025-04-02T00:00:00.000Z"
    When I send the updated "ppaScenarios-returnMessageOne" message to the service bus topic "ffc-pay-return-aw"

    When I update the "value" in message "ppaScenarios-ppaReturnMessageOne" to "20000000"
    When I update the "settlementDate" in message "ppaScenarios-ppaReturnMessageOne" to "2025-04-02T00:00:00.000Z"
    When I send the updated "ppaScenarios-ppaReturnMessageOne" message to the service bus topic "ffc-pay-return-aw"

    Then I confirm that the settled value of Return is 50000000 in database
    Then I confirm that the settled value of PPA is 20000000 in database

#Third installment payment including PPA Top-up    

    When I update the "value" in message "ppaScenarios-returnMessageOne" to "75000000"
    When I update the "settlementDate" in message "ppaScenarios-returnMessageOne" to "2025-06-02T00:00:00.000Z"
    When I send the updated "ppaScenarios-returnMessageOne" message to the service bus topic "ffc-pay-return-aw"

    When I update the "value" in message "ppaScenarios-ppaReturnMessageOne" to "30000000"
    When I update the "settlementDate" in message "ppaScenarios-ppaReturnMessageOne" to "2025-06-02T00:00:00.000Z"
    When I send the updated "ppaScenarios-ppaReturnMessageOne" message to the service bus topic "ffc-pay-return-aw"

    Then I confirm that the settled value of Return is 75000000 in database
    Then I confirm that the settled value of PPA is 30000000 in database

#Fourth installment payment including PPA Top-up

    When I update the "value" in message "ppaScenarios-returnMessageOne" to "100000000"
    When I update the "settlementDate" in message "ppaScenarios-returnMessageOne" to "2025-09-02T00:00:00.000Z"
    When I send the updated "ppaScenarios-returnMessageOne" message to the service bus topic "ffc-pay-return-aw"

    When I update the "value" in message "ppaScenarios-ppaReturnMessageOne" to "40000000"
    When I update the "settlementDate" in message "ppaScenarios-ppaReturnMessageOne" to "2025-09-02T00:00:00.000Z"
    When I send the updated "ppaScenarios-ppaReturnMessageOne" message to the service bus topic "ffc-pay-return-aw"

    Then I confirm that the settled value of Return is 100000000 in database
    Then I confirm that the settled value of PPA is 40000000 in database

#Confirm correct payment request values in Payment Management UI    

    Given I visit the "Payment management" homepage
    When I click on the "View processed payment requests" link
    And I select "Expanded SFI Offer" from the monitor schemes dropdown
    And I click on the "Continue" button
    Then I confirm that payment for "Expanded SFI Offer" scheme with "2" payment installments totalling "£1,400,000.00" is displayed
    Then I take a screenshot for Feature 34 and Scenario 2

  Scenario: 03 PPA Top-up after second installment

#This scenario tests the processing of a PPA Top-up after the second payment installment has been made  

    Given I restart the local environment
    Given I visit the "Payment management" homepage
    When I send the updated "ppaScenarios-paymentMessageOne" message to the service bus topic "ffc-pay-request-aw"

#The following steps confirm that the data has been passed along to the correct services and that the data
#has been processed correctly

    Then I confirm that payment test data has been inserted into the ffc-pay-processing database
    Then I confirm that payment test data has been inserted into the ffc-pay-submission database

#First installment payment prior to PPA Top-up

    When I update the "value" in message "ppaScenarios-returnMessageOne" to "25000000"
    When I update the "settlementDate" in message "ppaScenarios-returnMessageOne" to "2025-01-02T00:00:00.000Z"
    When I send the updated "ppaScenarios-returnMessageOne" message to the service bus topic "ffc-pay-return-aw"
    Then I confirm that the settled value of Return is 25000000 in database

#Second installment payment prior to PPA Top-up

    When I update the "value" in message "ppaScenarios-returnMessageOne" to "50000000"
    When I update the "settlementDate" in message "ppaScenarios-returnMessageOne" to "2025-04-02T00:00:00.000Z"
    When I send the updated "ppaScenarios-returnMessageOne" message to the service bus topic "ffc-pay-return-aw"
    Then I confirm that the settled value of Return is 50000000 in database

#PPA File processed after second installment payment

    When I send the updated "ppaScenarios-ppaMessageOne" message to the service bus topic "ffc-pay-request-aw"
    Then I confirm that ppa test data has been inserted into the ffc-pay-processing database

#First PPA top up payment

    When I update the "value" in message "ppaScenarios-ppaReturnMessageOne" to "20000000"
    When I update the "settlementDate" in message "ppaScenarios-ppaReturnMessageOne" to "2025-04-02T00:00:00.000Z"
    When I send the updated "ppaScenarios-ppaReturnMessageOne" message to the service bus topic "ffc-pay-return-aw"
    Then I confirm that the settled value of PPA is 20000000 in database

#Third installment payment including PPA Top-up

    When I update the "value" in message "ppaScenarios-returnMessageOne" to "75000000"
    When I update the "settlementDate" in message "ppaScenarios-returnMessageOne" to "2025-06-02T00:00:00.000Z"
    When I send the updated "ppaScenarios-returnMessageOne" message to the service bus topic "ffc-pay-return-aw"

    When I update the "value" in message "ppaScenarios-ppaReturnMessageOne" to "30000000"
    When I update the "settlementDate" in message "ppaScenarios-ppaReturnMessageOne" to "2025-06-02T00:00:00.000Z"
    When I send the updated "ppaScenarios-ppaReturnMessageOne" message to the service bus topic "ffc-pay-return-aw"

    Then I confirm that the settled value of Return is 75000000 in database
    Then I confirm that the settled value of PPA is 30000000 in database

#Fourth installment payment including PPA Top-up

    When I update the "value" in message "ppaScenarios-returnMessageOne" to "100000000"
    When I update the "settlementDate" in message "ppaScenarios-returnMessageOne" to "2025-09-02T00:00:00.000Z"
    When I send the updated "ppaScenarios-returnMessageOne" message to the service bus topic "ffc-pay-return-aw"

    When I update the "value" in message "ppaScenarios-ppaReturnMessageOne" to "40000000"
    When I update the "settlementDate" in message "ppaScenarios-ppaReturnMessageOne" to "2025-09-02T00:00:00.000Z"
    When I send the updated "ppaScenarios-ppaReturnMessageOne" message to the service bus topic "ffc-pay-return-aw"

    Then I confirm that the settled value of Return is 100000000 in database
    Then I confirm that the settled value of PPA is 40000000 in database

#Confirm correct payment request values in Payment Management UI

    Given I visit the "Payment management" homepage
    When I click on the "View processed payment requests" link
    And I select "Expanded SFI Offer" from the monitor schemes dropdown
    And I click on the "Continue" button
    Then I confirm that payment for "Expanded SFI Offer" scheme with "2" payment installments totalling "£1,400,000.00" is displayed
    Then I take a screenshot for Feature 34 and Scenario 3

  Scenario: 04 PPA Top-up after third installment

#This scenario tests the processing of a PPA Top-up after the third payment installment has been made

    Given I restart the local environment
    Given I visit the "Payment management" homepage
    When I send the updated "ppaScenarios-paymentMessageOne" message to the service bus topic "ffc-pay-request-aw"

#The following steps confirm that the data has been passed along to the correct services and that the data
#has been processed correctly

    Then I confirm that payment test data has been inserted into the ffc-pay-processing database
    Then I confirm that payment test data has been inserted into the ffc-pay-submission database

#First installment payment prior to PPA Top-up    

    When I update the "value" in message "ppaScenarios-returnMessageOne" to "25000000"
    When I update the "settlementDate" in message "ppaScenarios-returnMessageOne" to "2025-01-02T00:00:00.000Z"
    When I send the updated "ppaScenarios-returnMessageOne" message to the service bus topic "ffc-pay-return-aw"
    Then I confirm that the settled value of Return is 25000000 in database

#Second installment payment prior to PPA Top-up    

    When I update the "value" in message "ppaScenarios-returnMessageOne" to "50000000"
    When I update the "settlementDate" in message "ppaScenarios-returnMessageOne" to "2025-04-02T00:00:00.000Z"
    When I send the updated "ppaScenarios-returnMessageOne" message to the service bus topic "ffc-pay-return-aw"
    Then I confirm that the settled value of Return is 50000000 in database

#Third installment payment prior to PPA Top-up    

    When I update the "value" in message "ppaScenarios-returnMessageOne" to "75000000"
    When I update the "settlementDate" in message "ppaScenarios-returnMessageOne" to "2025-06-02T00:00:00.000Z"
    When I send the updated "ppaScenarios-returnMessageOne" message to the service bus topic "ffc-pay-return-aw"
    Then I confirm that the settled value of Return is 75000000 in database

#PPA File processed after third installment payment

    When I send the updated "ppaScenarios-ppaMessageOne" message to the service bus topic "ffc-pay-request-aw"
    Then I confirm that ppa test data has been inserted into the ffc-pay-processing database

#First PPA top up payment

    When I update the "value" in message "ppaScenarios-ppaReturnMessageOne" to "30000000"
    When I update the "settlementDate" in message "ppaScenarios-ppaReturnMessageOne" to "2025-06-02T00:00:00.000Z"
    When I send the updated "ppaScenarios-ppaReturnMessageOne" message to the service bus topic "ffc-pay-return-aw"
    Then I confirm that the settled value of PPA is 30000000 in database

#Fourth installment payment including PPA Top-up

    When I update the "value" in message "ppaScenarios-returnMessageOne" to "100000000"
    When I update the "settlementDate" in message "ppaScenarios-returnMessageOne" to "2025-09-02T00:00:00.000Z"
    When I send the updated "ppaScenarios-returnMessageOne" message to the service bus topic "ffc-pay-return-aw"

    When I update the "value" in message "ppaScenarios-ppaReturnMessageOne" to "40000000"
    When I update the "settlementDate" in message "ppaScenarios-ppaReturnMessageOne" to "2025-09-02T00:00:00.000Z"
    When I send the updated "ppaScenarios-ppaReturnMessageOne" message to the service bus topic "ffc-pay-return-aw"

    Then I confirm that the settled value of Return is 100000000 in database
    Then I confirm that the settled value of PPA is 40000000 in database

#Confirm correct payment request values in Payment Management UI

    Given I visit the "Payment management" homepage
    When I click on the "View processed payment requests" link
    And I select "Expanded SFI Offer" from the monitor schemes dropdown
    And I click on the "Continue" button
    Then I confirm that payment for "Expanded SFI Offer" scheme with "2" payment installments totalling "£1,400,000.00" is displayed
    Then I take a screenshot for Feature 34 and Scenario 4

  Scenario: 05 PPA Top-up after fourth installment

#This scenario tests the processing of a PPA Top-up after all payment installments have been made

    Given I restart the local environment
    Given I visit the "Payment management" homepage
    When I send the updated "ppaScenarios-paymentMessageOne" message to the service bus topic "ffc-pay-request-aw"

#The following steps confirm that the data has been passed along to the correct services and that the data
#has been processed correctly

    Then I confirm that payment test data has been inserted into the ffc-pay-processing database
    Then I confirm that payment test data has been inserted into the ffc-pay-submission database

#First installment payment prior to PPA Top-up

    When I update the "value" in message "ppaScenarios-returnMessageOne" to "25000000"
    When I update the "settlementDate" in message "ppaScenarios-returnMessageOne" to "2025-01-02T00:00:00.000Z"
    When I send the updated "ppaScenarios-returnMessageOne" message to the service bus topic "ffc-pay-return-aw"
    Then I confirm that the settled value of Return is 25000000 in database

#Second installment payment prior to PPA Top-up

    When I update the "value" in message "ppaScenarios-returnMessageOne" to "50000000"
    When I update the "settlementDate" in message "ppaScenarios-returnMessageOne" to "2025-04-02T00:00:00.000Z"
    When I send the updated "ppaScenarios-returnMessageOne" message to the service bus topic "ffc-pay-return-aw"
    Then I confirm that the settled value of Return is 50000000 in database

#Third installment payment prior to PPA Top-up

    When I update the "value" in message "ppaScenarios-returnMessageOne" to "75000000"
    When I update the "settlementDate" in message "ppaScenarios-returnMessageOne" to "2025-06-02T00:00:00.000Z"
    When I send the updated "ppaScenarios-returnMessageOne" message to the service bus topic "ffc-pay-return-aw"
    Then I confirm that the settled value of Return is 75000000 in database

#Fourth installment payment prior to PPA Top-up

    When I update the "value" in message "ppaScenarios-returnMessageOne" to "100000000"
    When I update the "settlementDate" in message "ppaScenarios-returnMessageOne" to "2025-09-02T00:00:00.000Z"
    When I send the updated "ppaScenarios-returnMessageOne" message to the service bus topic "ffc-pay-return-aw"
    Then I confirm that the settled value of Return is 100000000 in database

#PPA File processed after fourth installment payment

    When I send the updated "ppaScenarios-ppaMessageOne" message to the service bus topic "ffc-pay-request-aw"
    Then I confirm that ppa test data has been inserted into the ffc-pay-processing database

#PPA top up payment

    When I update the "value" in message "ppaScenarios-ppaReturnMessageOne" to "40000000"
    When I update the "settlementDate" in message "ppaScenarios-ppaReturnMessageOne" to "2025-09-02T00:00:00.000Z"
    When I send the updated "ppaScenarios-ppaReturnMessageOne" message to the service bus topic "ffc-pay-return-aw"
    Then I confirm that the settled value of PPA is 40000000 in database

#Confirm correct payment request values in Payment Management UI

    Given I visit the "Payment management" homepage
    When I click on the "View processed payment requests" link
    And I select "Expanded SFI Offer" from the monitor schemes dropdown
    And I click on the "Continue" button
    Then I confirm that payment for "Expanded SFI Offer" scheme with "2" payment installments totalling "£1,400,000.00" is displayed
    Then I take a screenshot for Feature 34 and Scenario 5