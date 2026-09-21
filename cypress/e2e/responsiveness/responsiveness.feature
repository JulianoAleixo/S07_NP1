Feature: Responsiveness
  As a visitor of Juliano Aleixo's portfolio using different devices
  I want the page to adapt its layout to my screen size
  So that I can have a good reading and navigation experience on any device

  @TC-027 @valid
  Scenario: Hero section is visible on mobile viewport
    Given I am on the portfolio home page at "mobile" viewport
    Then I should see the greeting "Hi, I'm Juliano Aleixo"
    And the page should not scroll horizontally

  @TC-028 @valid
  Scenario: Hero section is visible on tablet viewport
    Given I am on the portfolio home page at "tablet" viewport
    Then I should see the greeting "Hi, I'm Juliano Aleixo"
    And the page should not scroll horizontally

  @TC-029 @valid
  Scenario: Contact form is usable on mobile viewport
    Given I am on the portfolio home page at "mobile" viewport
    And I navigate to the "Contact" section
    Then I should see the "Submit" button
    And the contact fields should be visible on screen

  @TC-030 @valid
  Scenario: Projects section is visible on mobile viewport
    Given I am on the portfolio home page at "mobile" viewport
    When I click on the "Projects" menu link
    Then I should see the "Projects" section heading

  @TC-031 @valid
  Scenario: Navigation is accessible on mobile
    Given I am on the portfolio home page at "mobile" viewport
    Then the navigation should be accessible on mobile

  @TC-032 @valid
  Scenario: Like button is visible on mobile viewport
    Given I am on the portfolio home page at "mobile" viewport
    Then the like button should be visible on mobile