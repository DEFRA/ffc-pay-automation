@PRCal
Feature: 02 Progressive Reductions Calculations
  
  Scenario: 01 Verify page shows correctly
    Given I visit the "Progressive Reductions Calculations" homepage
    And I click on the "Start new calculation" button
    When I set "5000" as the starting amount value
    Then I should see "Calculation complete"
