Feature: Navigation and Hero
  As a visitor of Juliano Aleixo's portfolio
  I want to see the hero section and navigate through the menu
  So that I can quickly understand who Juliano is and reach any section of the site

  Background:
    Given I am on the portfolio home page

  @TC-001 @valid
  Scenario: Viewing the main heading
    Then I should see the greeting "Hi, I'm Juliano Aleixo"
    And I should see the heading "Software Engineer"

  @TC-002 @valid
  Scenario: Viewing the menu links
    Then I should see the "Home" menu link
    And I should see the "Projects" menu link
    And I should see the "Contact" menu link

  @TC-003 @valid
  Scenario: Viewing the social links in the hero section
    Then the "LinkedIn" link should point to "linkedin.com"
    And the "Github" link should point to "github.com"

  @TC-004 @valid
  Scenario: Navigating to the Projects section
    When I click on the "Projects" menu link
    Then I should see the "Projects" section heading

  @TC-022 @valid
  Scenario: Not showing a non-existent menu item "Blog"
    Then I should not see a menu link labeled "Blog"

  @TC-023 @valid
  Scenario: Not showing a non-existent menu item "Shop"
    Then I should not see a menu link labeled "Shop"

  @TC-024 @valid
  Scenario: Social links should not point to wrong domains
    Then the "LinkedIn" link should not point to "twitter.com"
    And the "Github" link should not point to "linkedin.com"