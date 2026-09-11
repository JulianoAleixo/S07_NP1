Feature: Projects section
  As a visitor of Juliano Aleixo's portfolio
  I want to see his projects
  So that I can learn about his work and access the deployed projects or repositories

  Background:
    Given I am on the portfolio home page

  Scenario: Listing the expected projects
    Then all the projects from the portfolio should be visible

  Scenario: Each project card displays an image
    Then the project "Divide Aí" card should display an image

  Scenario: Accessing more projects on Github
    Then I should see a link to see more projects on Github
