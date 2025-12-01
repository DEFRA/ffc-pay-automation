@local
Feature: 31 Notify API

  #This feature file sends email message to Notify through it's API and confirms that the email
  #has been received with expected values. 

  Scenario: 01 send email to Notify API
    
    Given I send email to Notify API
    When I pull new email from Notify API
    Then I confirm that received email contains expected values
