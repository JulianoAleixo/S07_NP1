Feature: Navigation and Hero
  As a visitor of Juliano Aleixo's portfolio
  I want to see the hero section and navigate through the menu
  So that I can quickly understand who Juliano is and reach any section of the site

  Background:
    Given I am on the portfolio home page

  @TC-001
  Scenario: Viewing the main heading
    Then I should see the greeting "Hi, I'm Juliano Aleixo"
    And I should see the heading "Software Engineer"

  @TC-002
  Scenario: Viewing the menu links
    Then I should see the "Home" menu link
    And I should see the "Projects" menu link
    And I should see the "Contact" menu link

  @TC-003
  Scenario: Viewing the social links in the hero section
    Then the "LinkedIn" link should point to "linkedin.com"
    And the "Github" link should point to "github.com"

  @TC-004
  Scenario: Navigating to the Projects section
    When I click on the "Projects" menu link
    Then I should see the "Projects" section heading
