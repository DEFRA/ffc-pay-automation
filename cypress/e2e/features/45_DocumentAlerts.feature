Feature: 45 Document Alerts

# npm run cypress:dev:one -- "cypress\e2e\features\45_DocumentAlerts.feature"
# npm run cypress:local:one -- "cypress\e2e\features\45_DocumentAlerts.feature"

# This feature file is designed to test the generation of alerts in the Document services. First a message is sent to the
# service bus topic, then the test confirms that an alert has been generated in the respective service.

  @local
  Scenario: 01 Ensure alerts are working on statement-publisher
    Given I restart and clear the local doc environment

    When I send the updated "statementGenerator-alertGenerationMessage" message to the service bus topic "ffc-doc-statement-publish-aw"
    Then I confirm that alert has been generated from "statement-publisher"

  @local
  Scenario: 02 Ensure alerts are working on statement-generator

    When I send the updated "statementConstructor-alertGenerationMessage" message to the service bus topic "ffc-doc-statements-aw"
    Then I confirm that alert has been generated from "statement-generator"

  @local
  Scenario: 03 Ensure alerts are working on statement-constructor

    When I send the updated "statementData-alertGenerationMessage" message to the service bus topic "ffc-doc-statement-data-aw"
    Then I confirm that alert has been generated from "statement-constructor"