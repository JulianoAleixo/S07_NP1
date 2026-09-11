import { Given, Then } from "@badeball/cypress-cucumber-preprocessor";
import MainPage from "../../pages/MainPage";

interface Project {
    title: string;
    status: string;
    projectUrl: string | null;
    repositoryUrl: string | null;
}

Given("I am on the portfolio home page", () => {
    MainPage.visit();
});

Then("all the projects from the portfolio should be visible", () => {
    cy.fixture("projects.json").then((projects: Project[]) => {
        projects.forEach((project) => {
            MainPage.containsText(project.title).should("be.visible");
        });
    });
});

Then("the project {string} card should display an image", (title: string) => {
    MainPage.getProjectCardImage(title).should("be.visible");
});

Then("I should see a link to see more projects on Github", () => {
    MainPage.getLink("See more projects on Github")
        .should("have.attr", "href")
        .and("include", "github.com");
});
