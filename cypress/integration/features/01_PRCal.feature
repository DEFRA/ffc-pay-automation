@PRCal
Feature: 01 Progressive Reductions Calculations
  
  Background: Navigate to the Calculation page
    Given I visit the "Progressive Reductions Calculations" homepage
    And I click on "Start new calculation"
    When I set "5000" as the starting amount value

  Scenario: 01 Verify page shows correctly (positive test)
    Then I should see "Calculation complete"

  Scenario: 02 Verify page shows correctly (negative test)
    Then I should see "Calculations complete"
