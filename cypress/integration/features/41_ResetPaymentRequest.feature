@local
Feature: 41 Reset Payment Request

# This feature file is designed to test functionality of Reset Payment Request page in Payment Management UI

  Scenario: 01 Confirm initial elements on Reset Payment Request page

#This scenario confirms that the initial elements on the Reset Payment Request page are displayed correctly and
#that correct options are available in the select scheme dropdown

    Given I restart the local environment
    Given I visit the "Payment management" homepage
    When I click on the "Reset payment request" link

    Then on the Reset payment request page I confirm that "page title" is displayed
    Then on the Reset payment request page I confirm that "page description" is displayed
    Then on the Reset payment request page I confirm that "page instructions" is displayed
    Then on the Reset payment request page I confirm that "invoice number field" is displayed
    Then on the Reset payment request page I confirm that "reset button" is displayed
    Then I take a screenshot for Feature 41 and Scenario 1

  Scenario: 02 Attempt to reset payment request using invoice number that does not exist in database

#This scenario attempts to resets the payment request using an invoice number that does not exist in the database
# and confirms that the correct error message is displayed

    Given I visit the "Payment management" homepage
    When I click on the "Reset payment request" link
    Then on the Reset payment request page I enter "S279591940653785V001" into the "invoice number" field
    Then on the Reset payment request page I click the "reset button"
    Then on the Reset payment request page I confirm that "payment request does not exist error" is displayed
    Then I take a screenshot for Feature 41 and Scenario 2

  Scenario: 03 Attempt to reset payment request without entering an invoice number

#This scenario attempts to resets the payment request using an invoice number that does not exist in the database
# and confirms that the correct error message is displayed

    Given I visit the "Payment management" homepage
    When I click on the "Reset payment request" link
    Then on the Reset payment request page I click the "reset button"
    Then on the Reset payment request page I confirm that "enter a valid invoice number error" is displayed
    Then I take a screenshot for Feature 41 and Scenario 3

  Scenario: 04 Load payment request data

  #This scenario loads payment data into the local environment for use in next scenario

    Given I visit the "Payment management" homepage
    When I send the updated "sfi23-paymentFileMessage" message to the service bus topic "ffc-pay-request-aw"

#The following steps confirm that the data has been passed along to the correct services and that the data
#has been processed correctly

    Then I confirm that payment test data has been inserted into the ffc-pay-processing database
    Then I confirm that payment test data has been inserted into the ffc-pay-submission database

#The following step downloads file from Azure Blob Storage and confirms that the values given in the data inserted into the 
#Pay Submission Service have been correctly added to the generated statement

    Then I pull sfi23 payments file from Azure Blob Storage and confirm that correct values have been generated
    
  Scenario: 05 Reset payment request using valid invoice number

#This scenario resets the payment request using invoice number entered in previous scenario
#and confirms that the correct success message is displayed

    Given I visit the "Payment management" homepage
    When I click on the "Reset payment request" link
    Then on the Reset payment request page I enter "S279591940653785V001" into the "invoice number" field
    Then on the Reset payment request page I click the "reset button"
    Then I take a screenshot for Feature 41 and Scenario 5

    Then on the Reset payment request page I confirm that "payment request successfully reset message" is displayed
    Then on the Reset payment request page I confirm that "what happens next subheader" is displayed
    Then on the Reset payment request page I confirm that "what happens next message" is displayed
    Then on the Reset payment request page I confirm that "perform another action link" is displayed

    Then I confirm that second completedPaymentRequest entry has been made in database for invoice number "S279591940653785V001"

  Scenario: 06 Confirm that Perform another action link redirects correctly

  #This scenario confirms that clicking the Perform another action link after resetting a payment request redirects the user
  #back to the Payment Management homepage

    Given I visit the "Payment management" homepage
    When I click on the "Reset payment request" link
    Then on the Reset payment request page I enter "S279591940653785V001" into the "invoice number" field
    Then on the Reset payment request page I click the "reset button"
    Then on the Reset payment request page I click the "perform another action link"

  #Should redirect to the Payment Management homepage

    Then I confirm that I am on the "payment management" homepage
    Then I take a screenshot for Feature 41 and Scenario 6

   
  




    