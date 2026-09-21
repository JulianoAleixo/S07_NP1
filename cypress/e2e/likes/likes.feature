Feature: Like button
  As a visitor of Juliano Aleixo's portfolio
  I want to like the portfolio
  So that I can show that I liked the content and the information within the page

  Background:
    Given I am on the portfolio home page 
    And the page has an non-negative integer number of likes

  @TC-019
  Scenario: Viewing the initial like state
    Then I should see the like button with a non-negative integer number of likes

  @TC-020 @skip
  Scenario: Liking the page 
    When I click on the like button
    Then I should see the like button count increased by 1

  @TC-021 @skip
  Scenario: Unliking the page 
    Given I have liked the page
    When I click on the like button
    Then I should see the like button count decreased by 1
