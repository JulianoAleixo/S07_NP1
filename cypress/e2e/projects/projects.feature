Feature: Projects section
  As a visitor of Juliano Aleixo's portfolio
  I want to see his projects
  So that I can learn about his work and access the deployed projects or repositories

  Background:
    Given I am on the portfolio home page

  @TC-015
  Scenario: Listing the expected projects
    Then all the projects from the portfolio should be visible

  @TC-016
  Scenario: Each project card displays an image
    Then the project "Divide Aí" card should display an image

  @TC-017
  Scenario: Accessing more projects on Github
    Then I should see a link to see more projects on Github

  @TC-018
  Scenario: Displaying a project without a repository link
    Then the project "Dra Maria Luiza Rennó's Website" card should not display a repository link
