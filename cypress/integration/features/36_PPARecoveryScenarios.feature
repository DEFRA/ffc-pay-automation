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

    When I send the updated "ppaScenarios-returnMessageOne" message to the service bus topic "ffc-pay-return-aw"
    Then I confirm that the settled value of Return is 250000 in database

#PPA Recovery processed after first installment payment

    When I send the updated "ppaScenarios-recoveryMessageOne" message to the service bus topic "ffc-pay-request-aw"
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
    Then I take a screenshot for Feature 36 and Scenario 1
    And I click on the "Yes" edited correctly radio button
    And I click on the "Submit" button

#Recover 50,000 of first installment to bring overall payment amount to 200,000

    When I send the updated "ppaScenarios-recoveryReturnMessageOne" message to the service bus topic "ffc-pay-return-aw"

    Then I confirm that the settled value of PPA is -50000 in database

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

    When I send the updated "ppaScenarios-returnMessageOne" message to the service bus topic "ffc-pay-return-aw"
    Then I confirm that the settled value of Return is 250000 in database

#Second installment payment

    When I send the updated "ppaScenarios-returnMessageTwo" message to the service bus topic "ffc-pay-return-aw"
    Then I confirm that the settled value of Return is 500000 in database

#PPA Recovery processed after second installment payment

    When I send the updated "ppaScenarios-recoveryMessageOne" message to the service bus topic "ffc-pay-request-aw"
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
    Then I take a screenshot for Feature 36 and Scenario 2
    And I click on the "Yes" edited correctly radio button
    And I click on the "Submit" button

#Recover 300,000 of previous installments to bring overall payment amount to 200,000

    When I send the updated "ppaScenarios-recoveryReturnMessageTwo" message to the service bus topic "ffc-pay-return-aw"

    Then I confirm that the settled value of PPA is -300000 in database

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

    When I send the updated "ppaScenarios-returnMessageOne" message to the service bus topic "ffc-pay-return-aw"
    Then I confirm that the settled value of Return is 250000 in database

#Second installment payment

    When I send the updated "ppaScenarios-returnMessageTwo" message to the service bus topic "ffc-pay-return-aw"
    Then I confirm that the settled value of Return is 500000 in database

#Third installment payment

    When I send the updated "ppaScenarios-returnMessageThree" message to the service bus topic "ffc-pay-return-aw"
    Then I confirm that the settled value of Return is 750000 in database

#PPA Recovery processed after third installment payment

    When I send the updated "ppaScenarios-recoveryMessageOne" message to the service bus topic "ffc-pay-request-aw"
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
    Then I take a screenshot for Feature 36 and Scenario 3
    And I click on the "Yes" edited correctly radio button
    And I click on the "Submit" button

#Recover 550,000 of previous installments to bring overall payment amount to 200,000

    When I send the updated "ppaScenarios-recoveryReturnMessageThree" message to the service bus topic "ffc-pay-return-aw"

    Then I confirm that the settled value of PPA is -550000 in database

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

    When I send the updated "ppaScenarios-returnMessageOne" message to the service bus topic "ffc-pay-return-aw"
    Then I confirm that the settled value of Return is 250000 in database

#Second installment payment

    When I send the updated "ppaScenarios-returnMessageTwo" message to the service bus topic "ffc-pay-return-aw"
    Then I confirm that the settled value of Return is 500000 in database

#Third installment payment

    When I send the updated "ppaScenarios-returnMessageThree" message to the service bus topic "ffc-pay-return-aw"
    Then I confirm that the settled value of Return is 750000 in database

#Fourth installment payment

    When I send the updated "ppaScenarios-returnMessageFour" message to the service bus topic "ffc-pay-return-aw"
    Then I confirm that the settled value of Return is 1000000 in database

#PPA Recovery processed after fourth installment payment

    When I send the updated "ppaScenarios-recoveryMessageOne" message to the service bus topic "ffc-pay-request-aw"
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
    Then I take a screenshot for Feature 36 and Scenario 4
    And I click on the "Yes" edited correctly radio button
    And I click on the "Submit" button

#Recover 800,000 of previous installments to bring overall payment amount to 200,000

    When I send the updated "ppaScenarios-recoveryReturnMessageFour" message to the service bus topic "ffc-pay-return-aw"

    Then I confirm that the settled value of PPA is -800000 in database

    
