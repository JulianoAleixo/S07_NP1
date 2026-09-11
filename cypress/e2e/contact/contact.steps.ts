import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import MainPage from "../../pages/MainPage";

Given("I am on the portfolio home page", () => {
    MainPage.visit();
});

Given("I navigate to the {string} section", (sectionLabel: string) => {
    MainPage.clickLink(sectionLabel);
});

Then("I should see the contact invitation text", () => {
    MainPage.containsText(
        "Have a question or a project in mind?",
    ).should("be.visible");
});

Then("I should see the {string} button", (label: string) => {
    MainPage.getButton(label).should("be.visible");
});

Then("I should see the location {string}", (location: string) => {
    MainPage.containsText(location).should("be.visible");
});

When("I submit the contact form without filling it", () => {
    MainPage.clickButton("Submit");
});

Then("the email field should be marked as invalid", () => {
    MainPage.getInvalidField("input[name=from_email]").should("exist");
});
