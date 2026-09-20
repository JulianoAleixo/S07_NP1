import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import MainPage from "../../pages/MainPage";

const VIEWPORTS: Record<string, { width: number; height: number }> = {
  mobile: { width: 390, height: 844 },   // iPhone 14
  tablet: { width: 768, height: 1024 },  // iPad portrait
  desktop: { width: 1280, height: 800 },
};

Given(
  "I am on the portfolio home page at {string} viewport",
  (device: string) => {
    const vp = VIEWPORTS[device];
    if (!vp) throw new Error(`Unknown viewport preset: "${device}"`);
    cy.viewport(vp.width, vp.height);
    MainPage.visit();
  },
);

Given("I navigate to the {string} section", (sectionLabel: string) => {
  MainPage.clickLink(sectionLabel);
});

When("I click on the {string} menu link", (label: string) => {
  MainPage.clickLink(label);
});

Then("I should see the greeting {string}", (greeting: string) => {
  MainPage.containsText(greeting).should("be.visible");
});

Then("I should see the {string} section heading", (heading: string) => {
  MainPage.getSectionHeading(heading).should("be.visible");
});

Then("I should see the {string} button", (label: string) => {
  MainPage.getButton(label).should("be.visible");
});

Then("the page should not scroll horizontally", () => {
  cy.window().then((win) => {
    const docWidth = win.document.documentElement.scrollWidth;
    const vpWidth = win.innerWidth;
    expect(
      docWidth,
      `scrollWidth (${docWidth}px) should not exceed viewport width (${vpWidth}px)`,
    ).to.be.lte(vpWidth);
  });
});

Then("the contact fields should be visible on screen", () => {
  cy.get("input[name=from_name]").should("be.visible");
  cy.get("input[name=from_email]").should("be.visible");
  cy.get("textarea[name=message]").should("be.visible");
});

Then("the navigation should be accessible on mobile", () => {
  cy.get("body").then(($body) => {
    const hasHamburger =
      $body.find("button[aria-label*='menu' i]").length > 0 ||
      $body.find("button[aria-label*='navigation' i]").length > 0;

    if (hasHamburger) {
      cy.get("button[aria-label*='menu' i], button[aria-label*='navigation' i]")
        .first()
        .click();
    }

    cy.contains("a", "Projects").should("be.visible");
    cy.contains("a", "Contact").should("be.visible");
  });
});

Then("the like button should be visible on mobile", () => {
  MainPage.getLikeButton().scrollIntoView().should("be.visible");
});