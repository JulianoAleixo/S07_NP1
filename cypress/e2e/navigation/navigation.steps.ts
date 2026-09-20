import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import MainPage from "../../pages/MainPage";

Given("I am on the portfolio home page", () => {
    MainPage.visit();
});

Then("I should see the greeting {string}", (greeting: string) => {
    MainPage.containsText(greeting).should("be.visible");
});

Then("I should see the heading {string}", (heading: string) => {
    MainPage.getHeading(heading).should("be.visible");
});

Then("I should see the {string} menu link", (label: string) => {
    MainPage.getLink(label).should("be.visible");
});

Then("I should not see a menu link labeled {string}", (label: string) => {
    cy.get("nav").within(() => {
        cy.contains("a", label).should("not.exist");
    });
});

Then(
    "the {string} link should point to {string}",
    (label: string, domain: string) => {
        MainPage.getLink(label)
            .should("have.attr", "href")
            .and("include", domain);
    },
);

Then(
    "the {string} link should not point to {string}",
    (label: string, domain: string) => {
        MainPage.getLink(label)
            .should("have.attr", "href")
            .and("not.include", domain);
    },
);

When("I click on the {string} menu link", (label: string) => {
    MainPage.clickLink(label);
});

Then("I should see the {string} section heading", (heading: string) => {
    MainPage.getSectionHeading(heading).should("be.visible");
});