@test @dev
Feature: 17 Payment Calculator

#This feature tests confirms the elements Payment Calculator pages

  Scenario: 01 Confirm elements on Calculate your delinked payment homepage

    #This scenario confirms the elements on the Calculate your delinked payment homepage

    Given I visit the "Calculate your delinked payment " homepage
    Then on the Payment Calculator page I confirm that "page title" is correctly displayed
    Then on the Payment Calculator page I confirm that "paragraph one" is correctly displayed
    Then on the Payment Calculator page I confirm that "paragraph two" is correctly displayed
    Then on the Payment Calculator page I confirm that "paragraph three" is correctly displayed
    Then on the Payment Calculator page I confirm that "paragraph four" is correctly displayed
    Then on the Payment Calculator page I confirm that "start button" is correctly displayed
    Then on the Payment Calculator page I confirm that "paragraph five" is correctly displayed
    Then on the Payment Calculator page I confirm that "paragraph six" is correctly displayed
    Then on the Payment Calculator page I confirm that "paragraph seven" is correctly displayed
    Then on the Payment Calculator page I confirm that "paragraph eight" is correctly displayed
    Then I take a screenshot for Feature 17 and Scenario 01

  Scenario: 02 Confirm elements on Enter your delinked payment reference amount

    #This scenario confirms the elements on the delinked payment reference amount page

    Given I visit the "Calculate your delinked payment " homepage
    When on the Payment Calculator page I click the "start button"
    Then I confirm that I am on the "delinked-calculator" subpage
    Then on the Enter your delinked payment reference amount page I confirm that "page title" is correctly displayed
    Then on the Enter your delinked payment reference amount page I confirm that "paragraph one" is correctly displayed
    Then on the Enter your delinked payment reference amount page I confirm that "paragraph two" is correctly displayed
    Then on the Enter your delinked payment reference amount page I confirm that "paragraph three" is correctly displayed
    Then on the Enter your delinked payment reference amount page I confirm that "bullet line one" is correctly displayed
    Then on the Enter your delinked payment reference amount page I confirm that "bullet line two" is correctly displayed
    Then on the Enter your delinked payment reference amount page I confirm that "paragraph four" is correctly displayed
    Then on the Enter your delinked payment reference amount page I confirm that "paragraph five" is correctly displayed
    Then on the Enter your delinked payment reference amount page I confirm that "amount input field" is correctly displayed
    Then on the Enter your delinked payment reference amount page I confirm that "calculate button" is correctly displayed
    Then I take a screenshot for Feature 17 and Scenario 02

  Scenario: 03 Confirm elements on Delinked payment calculation page

  #This scenario confirms the elements on the Delinked payment calculation page
  
    Given I visit the "Calculate your delinked payment " homepage
    When on the Payment Calculator page I click the "start button"
    Then I confirm that I am on the "delinked-calculator" subpage
    When on the Enter your delinked payment reference amount page I enter amount of "20000"
    Then on the Enter your delinked payment reference amount page I click the "calculate button"
    Then on the Delinked payment calculation page I confirm that default year is "2025"
    Then on the Delinked payment calculation page I confirm that "page title" is correctly displayed
    Then on the Delinked payment calculation page I confirm that "2024 tab" is correctly displayed
    Then on the Delinked payment calculation page I confirm that "2025 tab" is correctly displayed
    Then on the Delinked payment calculation page I confirm that "2026 tab" is correctly displayed
    Then on the Delinked payment calculation page I confirm that "2027 tab" is correctly displayed
    Then on the Delinked payment calculation page I confirm that "paragraph one" is correctly displayed
    Then on the Delinked payment calculation page I confirm that "estimated payment header" is correctly displayed
    Then on the Delinked payment calculation page I confirm that "scheme year" is correctly displayed
    Then on the Delinked payment calculation page I confirm that "total estimated reduction" is correctly displayed
    Then on the Delinked payment calculation page I confirm that "total estimated payment" is correctly displayed
    Then on the Delinked payment calculation page I confirm that "paragraph two" is correctly displayed
    Then on the Delinked payment calculation page I confirm that "progressive reduction header" is correctly displayed
    Then on the Delinked payment calculation page I confirm that "payment band" is correctly displayed
    Then on the Delinked payment calculation page I confirm that "£30,000.00 or less" is correctly displayed
    Then on the Delinked payment calculation page I confirm that "total progressive reduction" is correctly displayed
    Then on the Delinked payment calculation page I confirm that "percentageReductionHeader" is correctly displayed
    Then on the Delinked payment calculation page I confirm that "scheme year two" is correctly displayed
    Then on the Delinked payment calculation page I confirm that "payment band" is correctly displayed
    Then on the Delinked payment calculation page I confirm that "30,000.00 or less two" is correctly displayed
    Then I take a screenshot for Feature 17 and Scenario 03

  Scenario: 04 Confirm amount format error message on Delinked payment reference amount page

  #This scenario confirms the elements on the delinked payment reference amount page

    Given I visit the "Calculate your delinked payment " homepage
    When on the Payment Calculator page I click the "start button"
    Then I confirm that I am on the "delinked-calculator" subpage
    When on the Enter your delinked payment reference amount page I enter amount of "20,000"
    Then on the Enter your delinked payment reference amount page I click the "calculate button"
    Then on the Enter your delinked payment reference amount page I confirm that "amount format error message" is correctly displayed
    Then I take a screenshot for Feature 17 and Scenario 04

  Scenario: 05 Confirm that delinked payments guidance link functions correctly

    #This scenario confirms that the delinked payments guidance link on the Payment Calculator pages functions correctly

    Given I visit the "Calculate your delinked payment " homepage
    When I click on the "delinked payments guidance" link
    Then I confirm that I am on the "delinked-payments-calculated" page
    Then I take a screenshot for Feature 17 and Scenario 05


  Scenario: 06 Confirm that new schemes and grants link functions correctly

    #This scenario confirms that the new schemes and grants link on the Payment Calculator pages functions correctly

    Given I visit the "Calculate your delinked payment " homepage
    When I click on the "new schemes and grants" link
    Then I confirm that I am on the "funding-for-farmers" page
    Then I take a screenshot for Feature 17 and Scenario 06

  Scenario: 07 Confirm that replacing the Basic Payment Scheme link functions correctly

    #This scenario confirms that the replacing the Basic Payment Scheme link on the Payment Calculator pages functions correctly

    Given I visit the "Calculate your delinked payment " homepage
    When I click on the "delinked payments: replacing the Basic Payment Scheme." link
    Then I confirm that I am on the "delinked-payments-replacing-the-basic-payment-scheme" page
    Then I take a screenshot for Feature 17 and Scenario 07

  Scenario: 08 Confirm that Rural Payments service link functions correctly

    #This scenario confirms that the Rural Payments service link on the Payment Calculator pages functions correctly.
    #As this is an external link, functionality is confirmed via status code 200 response.

    Given I visit the "Calculate your delinked payment " homepage
    When on the Payment Calculator page I click the "start button"
    Then I confirm that I am on the "delinked-calculator" subpage
    When I verify status of external link - "Rural Payments service."

    






  
  
