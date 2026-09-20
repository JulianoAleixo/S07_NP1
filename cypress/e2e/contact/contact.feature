Feature: Contact section
  As a visitor of Juliano Aleixo's portfolio
  I want to get in touch with him
  So that I can ask questions or discuss a project opportunity

  Background:
    Given I am on the portfolio home page
    And I navigate to the "Contact" section

  @TC-005
  Scenario: Displaying the contact form
    Then I should see the contact invitation text
    And I should see the "Submit" button

  @TC-006
  Scenario: Displaying the location
    Then I should see the location "Brazil, Minas Gerais"

  @TC-007
  Scenario: Validating required fields on empty submission
    When I submit the contact form without filling it
    Then the email field should be marked as invalid

  @TC-008
  Scenario: Rejecting submission with empty name
    When I submit the contact form leaving the "name" field empty
    Then the name field should be marked as invalid

  @TC-009
  Scenario: Rejecting submission without email
    When I submit the contact form leaving the "email" field empty
    Then the email field should be marked as invalid

  @TC-010
  Scenario: Rejecting submission with email missing "@"
    When I submit the contact form with a malformed email "no @"
    Then the email field should be marked as invalid

  @TC-011
  Scenario: Rejecting submission with email missing domain
    When I submit the contact form with a malformed email "no domain"
    Then the email field should be marked as invalid

  @TC-012
  Scenario: Rejecting submission with email missing TLD
    When I submit the contact form with a malformed email "no TLD"
    Then the email field should be marked as invalid

  @TC-013
  Scenario: Rejecting submission with email containing space
    When I submit the contact form with a malformed email "with space"
    Then the email field should be marked as invalid

  @TC-014
  Scenario: Rejecting submission with empty message
    When I submit the contact form leaving the "message" field empty
    Then the message field should be marked as invalid
