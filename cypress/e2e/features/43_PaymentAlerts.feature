@local
Feature: 43 Payment Alerts

# npm run cypress:local:one -- "cypress\e2e\features\43_PaymentAlerts.feature"

# This feature file is designed to test functionality of Payment Alerts section in Payment Management UI

  Scenario: 01 Confirm initial elements on page

  #This scenario confirms that all expected elements are present on initial page load

    Given I restart the local environment
    Given I visit the "Payment management" homepage
    When I click on the "View all alert recipients" link

    Then on the Alerts page I confirm that "sub header" is displayed
    Then on the Alerts page I confirm that "page description" is displayed
    Then on the Alerts page I confirm that "find out more" is displayed
    Then on the Alerts page I confirm that "alerts information link" is displayed
    Then on the Alerts page I confirm that "add new recipient button" is displayed
    Then on the Alerts page I confirm that "show all sections button" is displayed
    Then on the Alerts page I confirm that "sfi22 label" is displayed
    Then on the Alerts page I confirm that "sfi22 show button" is displayed
    Then on the Alerts page I confirm that "sfi pilot label" is displayed
    Then on the Alerts page I confirm that "sfi pilot show button" is displayed
    Then on the Alerts page I confirm that "lump sums label" is displayed
    Then on the Alerts page I confirm that "lump sums show button" is displayed
    Then on the Alerts page I confirm that "vet visits label" is displayed
    Then on the Alerts page I confirm that "vet visits show button" is displayed
    Then on the Alerts page I confirm that "countryside stewardship label" is displayed
    Then on the Alerts page I confirm that "countryside stewardship show button" is displayed
    Then on the Alerts page I confirm that "basic payment scheme label" is displayed
    Then on the Alerts page I confirm that "basic payment scheme show button" is displayed
    Then on the Alerts page I confirm that "manual injection label" is displayed
    Then on the Alerts page I confirm that "manual injection show button" is displayed
    Then on the Alerts page I confirm that "environmental stewardship label" is displayed
    Then on the Alerts page I confirm that "environmental stewardship show button" is displayed
    Then on the Alerts page I confirm that "imps label" is displayed
    Then on the Alerts page I confirm that "imps show button" is displayed
    Then on the Alerts page I confirm that "forestry commission label" is displayed
    Then on the Alerts page I confirm that "forestry commission show button" is displayed
    Then on the Alerts page I confirm that "sfi23 label" is displayed
    Then on the Alerts page I confirm that "sfi23 show button" is displayed
    Then on the Alerts page I confirm that "delinked payments label" is displayed
    Then on the Alerts page I confirm that "delinked payments show button" is displayed
    Then on the Alerts page I confirm that "expanded sfi label" is displayed
    Then on the Alerts page I confirm that "expanded sfi show button" is displayed
    Then on the Alerts page I confirm that "csht revenue label" is displayed
    Then on the Alerts page I confirm that "csht revenue show button" is displayed
    Then on the Alerts page I confirm that "csht capital label" is displayed
    Then on the Alerts page I confirm that "csht capital show button" is displayed
    Then I take a screenshot for Feature 43 and Scenario 1

  Scenario: 02 Confirm correct alert types for SFI-22

   #This scenario confirms that correct alert types are present for SFI-22 scheme

    Given I visit the "Payment management" homepage
    When I click on the "View all alert recipients" link
    Then on the Alerts page I click the "sfi22 show button"

  #The following alert types should now be visible  

    Then I should see "Batch Rejected"
    Then I should see "Batch Quarantined"
    Then I should see "Payment Rejected"
    Then I should see "Payment Dax Rejected"
    Then I should see "Payment Invalid Bank"
    Then I should see "Payment Processing Failed"
    Then I should see "Payment Settlement Unsettled"
    Then I should see "Payment Settlement Unmatched"
    Then I should see "Response Rejected"
    Then I should see "Payment Request Blocked"
    Then I should see "Payment Dax Unavailable"
    Then I should see "Receiver Connection Failed"
    Then I should see "Demographics Processing Failed"
    Then I should see "Demographics Update Failed"
    Then I should see "Event Save Alert"
    Then I should see "Table Create Alert"
    Then I should see "Responses Processing Failed"
    Then I should see "Customer Update Processing Failed"
    Then I should see "Tracking Update Failure"
    Then I take a screenshot for Feature 43 and Scenario 2

  Scenario: 03 Confirm correct alert types for SFI-Pilot

   #This scenario confirms that correct alert types are present for SFI-Pilot scheme

    Given I visit the "Payment management" homepage
    When I click on the "View all alert recipients" link
    Then on the Alerts page I click the "sfi pilot show button"

  #The following alert types should now be visible  

    Then I should see "Batch Rejected"
    Then I should see "Batch Quarantined"
    Then I should see "Payment Rejected"
    Then I should see "Payment Dax Rejected"
    Then I should see "Payment Invalid Bank"
    Then I should see "Payment Processing Failed"
    Then I should see "Payment Settlement Unsettled"
    Then I should see "Payment Settlement Unmatched"
    Then I should see "Response Rejected"
    Then I should see "Payment Request Blocked"
    Then I should see "Payment Dax Unavailable"
    Then I should see "Receiver Connection Failed"
    Then I should see "Demographics Processing Failed"
    Then I should see "Demographics Update Failed"
    Then I should see "Event Save Alert"
    Then I should see "Table Create Alert"
    Then I should see "Responses Processing Failed"
    Then I should see "Customer Update Processing Failed"
    Then I should see "Tracking Update Failure"
    Then I take a screenshot for Feature 43 and Scenario 3

  Scenario: 04 Confirm correct alert types for Lump Sums

   #This scenario confirms that correct alert types are present for Lump Sums scheme

    Given I visit the "Payment management" homepage
    When I click on the "View all alert recipients" link
    Then on the Alerts page I click the "lump sums show button"

  #The following alert types should now be visible  

    Then I should see "Batch Rejected"
    Then I should see "Batch Quarantined"
    Then I should see "Payment Rejected"
    Then I should see "Payment Dax Rejected"
    Then I should see "Payment Invalid Bank"
    Then I should see "Payment Processing Failed"
    Then I should see "Payment Settlement Unsettled"
    Then I should see "Payment Settlement Unmatched"
    Then I should see "Response Rejected"
    Then I should see "Payment Request Blocked"
    Then I should see "Payment Dax Unavailable"
    Then I should see "Receiver Connection Failed"
    Then I should see "Demographics Processing Failed"
    Then I should see "Demographics Update Failed"
    Then I should see "Event Save Alert"
    Then I should see "Table Create Alert"
    Then I should see "Responses Processing Failed"
    Then I should see "Customer Update Processing Failed"
    Then I should see "Tracking Update Failure"
    Then I take a screenshot for Feature 43 and Scenario 4

  Scenario: 05 Confirm correct alert types for Vet Visits

   #This scenario confirms that correct alert types are present for Vet Visits scheme

    Given I visit the "Payment management" homepage
    When I click on the "View all alert recipients" link
    Then on the Alerts page I click the "vet visits show button"

  #The following alert types should now be visible  

    Then I should see "Batch Rejected"
    Then I should see "Batch Quarantined"
    Then I should see "Payment Rejected"
    Then I should see "Payment Dax Rejected"
    Then I should see "Payment Invalid Bank"
    Then I should see "Payment Processing Failed"
    Then I should see "Payment Settlement Unsettled"
    Then I should see "Payment Settlement Unmatched"
    Then I should see "Response Rejected"
    Then I should see "Payment Request Blocked"
    Then I should see "Payment Dax Unavailable"
    Then I should see "Receiver Connection Failed"
    Then I should see "Demographics Processing Failed"
    Then I should see "Demographics Update Failed"
    Then I should see "Event Save Alert"
    Then I should see "Table Create Alert"
    Then I should see "Responses Processing Failed"
    Then I should see "Customer Update Processing Failed"
    Then I should see "Tracking Update Failure"
    Then I take a screenshot for Feature 43 and Scenario 5

  Scenario: 06 Confirm correct alert types for Countryside Stewardship

   #This scenario confirms that correct alert types are present for Countryside Stewardship scheme

    Given I visit the "Payment management" homepage
    When I click on the "View all alert recipients" link
    Then on the Alerts page I click the "countryside stewardship show button"

  #The following alert types should now be visible  

    Then I should see "Batch Rejected"
    Then I should see "Batch Quarantined"
    Then I should see "Payment Rejected"
    Then I should see "Payment Dax Rejected"
    Then I should see "Payment Invalid Bank"
    Then I should see "Payment Processing Failed"
    Then I should see "Payment Settlement Unsettled"
    Then I should see "Payment Settlement Unmatched"
    Then I should see "Response Rejected"
    Then I should see "Payment Request Blocked"
    Then I should see "Payment Dax Unavailable"
    Then I should see "Receiver Connection Failed"
    Then I should see "Demographics Processing Failed"
    Then I should see "Demographics Update Failed"
    Then I should see "Event Save Alert"
    Then I should see "Table Create Alert"
    Then I should see "Responses Processing Failed"
    Then I should see "Customer Update Processing Failed"
    Then I should see "Tracking Update Failure"
    Then I take a screenshot for Feature 43 and Scenario 6

  Scenario: 07 Confirm correct alert types for Basic Payment Scheme

   #This scenario confirms that correct alert types are present for Basic Payment Scheme

    Given I visit the "Payment management" homepage
    When I click on the "View all alert recipients" link
    Then on the Alerts page I click the "basic payment scheme show button"

  #The following alert types should now be visible  

    Then I should see "Batch Rejected"
    Then I should see "Batch Quarantined"
    Then I should see "Payment Rejected"
    Then I should see "Payment Dax Rejected"
    Then I should see "Payment Invalid Bank"
    Then I should see "Payment Processing Failed"
    Then I should see "Payment Settlement Unsettled"
    Then I should see "Payment Settlement Unmatched"
    Then I should see "Response Rejected"
    Then I should see "Payment Request Blocked"
    Then I should see "Payment Dax Unavailable"
    Then I should see "Receiver Connection Failed"
    Then I should see "Demographics Processing Failed"
    Then I should see "Demographics Update Failed"
    Then I should see "Event Save Alert"
    Then I should see "Table Create Alert"
    Then I should see "Responses Processing Failed"
    Then I should see "Customer Update Processing Failed"
    Then I should see "Tracking Update Failure"
    Then I take a screenshot for Feature 43 and Scenario 7

  Scenario: 08 Confirm correct alert types for Manual Injection scheme

   #This scenario confirms that correct alert types are present for Manual Injection scheme

    Given I visit the "Payment management" homepage
    When I click on the "View all alert recipients" link
    Then on the Alerts page I click the "manual injection show button"

  #The following alert types should now be visible  

    Then I should see "Batch Rejected"
    Then I should see "Batch Quarantined"
    Then I should see "Payment Rejected"
    Then I should see "Payment Dax Rejected"
    Then I should see "Payment Invalid Bank"
    Then I should see "Payment Processing Failed"
    Then I should see "Payment Settlement Unsettled"
    Then I should see "Payment Settlement Unmatched"
    Then I should see "Response Rejected"
    Then I should see "Payment Request Blocked"
    Then I should see "Payment Dax Unavailable"
    Then I should see "Receiver Connection Failed"
    Then I should see "Demographics Processing Failed"
    Then I should see "Demographics Update Failed"
    Then I should see "Event Save Alert"
    Then I should see "Table Create Alert"
    Then I should see "Responses Processing Failed"
    Then I should see "Customer Update Processing Failed"
    Then I should see "Tracking Update Failure"
    Then I take a screenshot for Feature 43 and Scenario 8

  Scenario: 09 Confirm correct alert types for Environmental Stewardship scheme

   #This scenario confirms that correct alert types are present for Environmental Stewardship scheme

    Given I visit the "Payment management" homepage
    When I click on the "View all alert recipients" link
    Then on the Alerts page I click the "environmental stewardship show button"

  #The following alert types should now be visible  

    Then I should see "Batch Rejected"
    Then I should see "Batch Quarantined"
    Then I should see "Payment Rejected"
    Then I should see "Payment Dax Rejected"
    Then I should see "Payment Invalid Bank"
    Then I should see "Payment Processing Failed"
    Then I should see "Payment Settlement Unsettled"
    Then I should see "Payment Settlement Unmatched"
    Then I should see "Response Rejected"
    Then I should see "Payment Request Blocked"
    Then I should see "Payment Dax Unavailable"
    Then I should see "Receiver Connection Failed"
    Then I should see "Demographics Processing Failed"
    Then I should see "Demographics Update Failed"
    Then I should see "Event Save Alert"
    Then I should see "Table Create Alert"
    Then I should see "Responses Processing Failed"
    Then I should see "Customer Update Processing Failed"
    Then I should see "Tracking Update Failure"
    Then I take a screenshot for Feature 43 and Scenario 9

  Scenario: 10 Confirm correct alert types for IMPS scheme

   #This scenario confirms that correct alert types are present for IMPS scheme

    Given I visit the "Payment management" homepage
    When I click on the "View all alert recipients" link
    Then on the Alerts page I click the "imps show button"

  #The following alert types should now be visible  

    Then I should see "Batch Rejected"
    Then I should see "Batch Quarantined"
    Then I should see "Payment Rejected"
    Then I should see "Payment Dax Rejected"
    Then I should see "Payment Invalid Bank"
    Then I should see "Payment Processing Failed"
    Then I should see "Payment Settlement Unsettled"
    Then I should see "Payment Settlement Unmatched"
    Then I should see "Response Rejected"
    Then I should see "Payment Request Blocked"
    Then I should see "Payment Dax Unavailable"
    Then I should see "Receiver Connection Failed"
    Then I should see "Demographics Processing Failed"
    Then I should see "Demographics Update Failed"
    Then I should see "Event Save Alert"
    Then I should see "Table Create Alert"
    Then I should see "Responses Processing Failed"
    Then I should see "Customer Update Processing Failed"
    Then I should see "Tracking Update Failure"
    Then I take a screenshot for Feature 43 and Scenario 10

  Scenario: 11 Confirm correct alert types for Forestry Commission scheme

   #This scenario confirms that correct alert types are present for Forestry Commission scheme

    Given I visit the "Payment management" homepage
    When I click on the "View all alert recipients" link
    Then on the Alerts page I click the "forestry commission show button"

  #The following alert types should now be visible  

    Then I should see "Batch Rejected"
    Then I should see "Batch Quarantined"
    Then I should see "Payment Rejected"
    Then I should see "Payment Dax Rejected"
    Then I should see "Payment Invalid Bank"
    Then I should see "Payment Processing Failed"
    Then I should see "Payment Settlement Unsettled"
    Then I should see "Payment Settlement Unmatched"
    Then I should see "Response Rejected"
    Then I should see "Payment Request Blocked"
    Then I should see "Payment Dax Unavailable"
    Then I should see "Receiver Connection Failed"
    Then I should see "Demographics Processing Failed"
    Then I should see "Demographics Update Failed"
    Then I should see "Event Save Alert"
    Then I should see "Table Create Alert"
    Then I should see "Responses Processing Failed"
    Then I should see "Customer Update Processing Failed"
    Then I should see "Tracking Update Failure"
    Then I take a screenshot for Feature 43 and Scenario 11

  Scenario: 12 Confirm correct alert types for SFI-23 scheme

   #This scenario confirms that correct alert types are present for SFI-23 scheme

    Given I visit the "Payment management" homepage
    When I click on the "View all alert recipients" link
    Then on the Alerts page I click the "sfi23 show button"

  #The following alert types should now be visible  

    Then I should see "Batch Rejected"
    Then I should see "Batch Quarantined"
    Then I should see "Payment Rejected"
    Then I should see "Payment Dax Rejected"
    Then I should see "Payment Invalid Bank"
    Then I should see "Payment Processing Failed"
    Then I should see "Payment Settlement Unsettled"
    Then I should see "Payment Settlement Unmatched"
    Then I should see "Response Rejected"
    Then I should see "Payment Request Blocked"
    Then I should see "Payment Dax Unavailable"
    Then I should see "Receiver Connection Failed"
    Then I should see "Demographics Processing Failed"
    Then I should see "Demographics Update Failed"
    Then I should see "Event Save Alert"
    Then I should see "Table Create Alert"
    Then I should see "Responses Processing Failed"
    Then I should see "Customer Update Processing Failed"
    Then I should see "Tracking Update Failure"
    Then I take a screenshot for Feature 43 and Scenario 12

  Scenario: 13 Confirm correct alert types for Delinked Payments scheme

   #This scenario confirms that correct alert types are present for Delinked Payments scheme

    Given I visit the "Payment management" homepage
    When I click on the "View all alert recipients" link
    Then on the Alerts page I click the "delinked payments show button"

  #The following alert types should now be visible  

    Then I should see "Batch Rejected"
    Then I should see "Batch Quarantined"
    Then I should see "Payment Rejected"
    Then I should see "Payment Dax Rejected"
    Then I should see "Payment Invalid Bank"
    Then I should see "Payment Processing Failed"
    Then I should see "Payment Settlement Unsettled"
    Then I should see "Payment Settlement Unmatched"
    Then I should see "Response Rejected"
    Then I should see "Payment Request Blocked"
    Then I should see "Payment Dax Unavailable"
    Then I should see "Receiver Connection Failed"
    Then I should see "Demographics Processing Failed"
    Then I should see "Demographics Update Failed"
    Then I should see "Event Save Alert"
    Then I should see "Table Create Alert"
    Then I should see "Responses Processing Failed"
    Then I should see "Customer Update Processing Failed"
    Then I should see "Tracking Update Failure"
    Then I take a screenshot for Feature 43 and Scenario 13

  Scenario: 14 Confirm correct alert types for Expanded SFI Offer scheme

   #This scenario confirms that correct alert types are present for Expanded SFI Offer scheme

    Given I visit the "Payment management" homepage
    When I click on the "View all alert recipients" link
    Then on the Alerts page I click the "expanded sfi show button"

  #The following alert types should now be visible  

    Then I should see "Batch Rejected"
    Then I should see "Batch Quarantined"
    Then I should see "Payment Rejected"
    Then I should see "Payment Dax Rejected"
    Then I should see "Payment Invalid Bank"
    Then I should see "Payment Processing Failed"
    Then I should see "Payment Settlement Unsettled"
    Then I should see "Payment Settlement Unmatched"
    Then I should see "Response Rejected"
    Then I should see "Payment Request Blocked"
    Then I should see "Payment Dax Unavailable"
    Then I should see "Receiver Connection Failed"
    Then I should see "Demographics Processing Failed"
    Then I should see "Demographics Update Failed"
    Then I should see "Event Save Alert"
    Then I should see "Table Create Alert"
    Then I should see "Responses Processing Failed"
    Then I should see "Customer Update Processing Failed"
    Then I should see "Tracking Update Failure"
    Then I take a screenshot for Feature 43 and Scenario 14

  Scenario: 15 Confirm correct alert types for Countryside Stewardship Higher Tier (Revenue) scheme

   #This scenario confirms that correct alert types are present for Countryside Stewardship Higher Tier (Revenue) scheme

    Given I visit the "Payment management" homepage
    When I click on the "View all alert recipients" link
    Then on the Alerts page I click the "csht revenue show button"

  #The following alert types should now be visible  

    Then I should see "Batch Rejected"
    Then I should see "Batch Quarantined"
    Then I should see "Payment Rejected"
    Then I should see "Payment Dax Rejected"
    Then I should see "Payment Invalid Bank"
    Then I should see "Payment Processing Failed"
    Then I should see "Payment Settlement Unsettled"
    Then I should see "Payment Settlement Unmatched"
    Then I should see "Response Rejected"
    Then I should see "Payment Request Blocked"
    Then I should see "Payment Dax Unavailable"
    Then I should see "Receiver Connection Failed"
    Then I should see "Demographics Processing Failed"
    Then I should see "Demographics Update Failed"
    Then I should see "Event Save Alert"
    Then I should see "Table Create Alert"
    Then I should see "Responses Processing Failed"
    Then I should see "Customer Update Processing Failed"
    Then I should see "Tracking Update Failure"
    Then I take a screenshot for Feature 43 and Scenario 15

  Scenario: 16 Confirm correct alert types for Countryside Stewardship Higher Tier (Capital) scheme

   #This scenario confirms that correct alert types are present for Countryside Stewardship Higher Tier (Capital) scheme

    Given I visit the "Payment management" homepage
    When I click on the "View all alert recipients" link
    Then on the Alerts page I click the "csht capital show button"

  #The following alert types should now be visible  

    Then I should see "Batch Rejected"
    Then I should see "Batch Quarantined"
    Then I should see "Payment Rejected"
    Then I should see "Payment Dax Rejected"
    Then I should see "Payment Invalid Bank"
    Then I should see "Payment Processing Failed"
    Then I should see "Payment Settlement Unsettled"
    Then I should see "Payment Settlement Unmatched"
    Then I should see "Response Rejected"
    Then I should see "Payment Request Blocked"
    Then I should see "Payment Dax Unavailable"
    Then I should see "Receiver Connection Failed"
    Then I should see "Demographics Processing Failed"
    Then I should see "Demographics Update Failed"
    Then I should see "Event Save Alert"
    Then I should see "Table Create Alert"
    Then I should see "Responses Processing Failed"
    Then I should see "Customer Update Processing Failed"
    Then I should see "Tracking Update Failure"
    Then I take a screenshot for Feature 43 and Scenario 16

  Scenario: 17 Confirm that all schemes are successfully cascaded when Show All Sections is clicked

  #This scenario confirms that all schemes are successfully cascaded when Show All Sections is clicked
  #Please note, Cypress is unable to screenshot this scenario due to the extreme length of page when all schemes are cascaded

    Given I visit the "Payment management" homepage
    When I click on the "View all alert recipients" link
    Then on the Alerts page I click the "show all sections button"

  #The following line confirms that all "Show" chevrons have converted to "Hide"

    Then on the Alerts page I confirm that all schemes have successfully cascaded

  Scenario: 18 Confirm initial elements on Add new alert recipient page

    Given I visit the "Payment management" homepage
    When I click on the "View all alert recipients" link
    Then on the Alerts page I click the "add new alerts recipient button"

    Then on the Add new alert recipient page I confirm that "sub header" is displayed
    Then on the Add new alert recipient page I confirm that "email label" is displayed
    Then on the Add new alert recipient page I confirm that "email field" is displayed
    Then on the Add new alert recipient page I confirm that "select scheme label" is displayed
    Then on the Add new alert recipient page I confirm that "select scheme dropdown" is displayed

    #Following line confirms that there are 15 instances of all alert types, one for each current scheme

    Then on the Add new alert recipient page I confirm that all options are present when no filter selected
    Then I take a screenshot for Feature 43 and Scenario 18

  Scenario: 19 Confirm filter by scheme is functioning correctly

    Given I visit the "Payment management" homepage
    When I click on the "View all alert recipients" link
    Then on the Alerts page I click the "add new alerts recipient button"

#Cycle through options in Select Scheme dropdown to confirm all expected are present

    Then on the Add new alert recipient page I select "SFI-22" from Select Scheme dropdown
    Then on the Add new alert recipient page I select "SFI-Pilot" from Select Scheme dropdown
    Then on the Add new alert recipient page I select "Lump Sum Payments" from Select Scheme dropdown
    Then on the Add new alert recipient page I select "Vet Visits" from Select Scheme dropdown
    Then on the Add new alert recipient page I select "Countryside Stewardship" from Select Scheme dropdown
    Then on the Add new alert recipient page I select "Basic Payment Scheme" from Select Scheme dropdown
    Then on the Add new alert recipient page I select "Manual Injection" from Select Scheme dropdown
    Then on the Add new alert recipient page I select "Environmental Stewardship" from Select Scheme dropdown
    Then on the Add new alert recipient page I select "IMPS" from Select Scheme dropdown
    Then on the Add new alert recipient page I select "Forestry Commission" from Select Scheme dropdown
    Then on the Add new alert recipient page I select "SFI-23" from Select Scheme dropdown
    Then on the Add new alert recipient page I select "Delinked Payments" from Select Scheme dropdown
    Then on the Add new alert recipient page I select "Expanded SFI Offer" from Select Scheme dropdown
    Then on the Add new alert recipient page I select "Countryside Stewardship Higher Tier (Revenue)" from Select Scheme dropdown
    Then on the Add new alert recipient page I select "Countryside Stewardship Higher Tier (Capital)" from Select Scheme dropdown

#Filter by SFI-22 and confirm that all other scheme options are no longer displayed

    Then on the Add new alert recipient page I select "SFI-22" from Select Scheme dropdown
    Then on the Add new alert recipient page I confirm that only one set of options is displayed
    Then I take a screenshot for Feature 43 and Scenario 19

  Scenario: 20 Confirm that correct error message is displayed when invalid email used

  #This scenario confirms that correct error message is displayed when email with invalid format is used

    Given I visit the "Payment management" homepage
    When I click on the "View all alert recipients" link
    Then on the Alerts page I click the "add new alerts recipient button"

    Then on the Add new alert recipient page I enter "test@gmail.com" in the email field
    Then on the Add new alert recipient page I select "SFI-22" from Select Scheme dropdown
    Then on the Alerts page I click the "sfi22 all alerts button"
    Then on the Alerts page I click the "create new alert recipient button"
    Then on the Add new alert recipient page I confirm that "invalid email error message" is displayed
    Then I take a screenshot for Feature 43 and Scenario 20

  Scenario: 21 Confirm that new alert recipient can be successfully added

  #This scenario confirms that new alert recipient can be successfully added to all alert types

    Given I visit the "Payment management" homepage
    When I click on the "View all alert recipients" link
    Then on the Alerts page I click the "add new alerts recipient button"

    Then on the Add new alert recipient page I enter "fake.user@atos.net" in the email field
    Then on the Add new alert recipient page I select "SFI-22" from Select Scheme dropdown
    Then on the Alerts page I click the "sfi22 all alerts button"
    Then on the Alerts page I click the "create new alert recipient button"
    Then on the Alerts page I click the "sfi22 show button"

    Then on the Add new alert recipient page I confirm that recipient "fake.user@atos.net" has been added for each alert type
    Then I take a screenshot for Feature 43 and Scenario 21


    
