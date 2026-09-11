Feature: Contact section
  As a visitor of Juliano Aleixo's portfolio
  I want to get in touch with him
  So that I can ask questions or discuss a project opportunity

  Background:
    Given I am on the portfolio home page
    And I navigate to the "Contact" section

  Scenario: Displaying the contact form
    Then I should see the contact invitation text
    And I should see the "Submit" button

  Scenario: Displaying the location
    Then I should see the location "Brazil, Minas Gerais"

  Scenario: Validating required fields on empty submission
    When I submit the contact form without filling it
    Then the email field should be marked as invalid
