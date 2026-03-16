@local
Feature: 45 Gitleaks detection

# This feature file is designed to test the functionality of Gitleaks commit detection

  Scenario: 01 ffc-doc-statement-data

    Given I add file containing dummy Github token to service "ffc-doc-statement-data" and confirm that commit is rejected with correct error