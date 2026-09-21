import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import MainPage from "../../pages/MainPage";

const VIEWPORTS: Record<string, { width: number; height: number }> = {
  mobile: { width: 390, height: 844 },
  tablet: { width: 768, height: 1024 },
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

// SPA: não usar cy.visit("/#ancora") — causa timeout esperando evento load
// A página já está carregada; basta forçar o scroll até a seção pela âncora
Given("I navigate to the {string} section", (sectionLabel: string) => {
  const anchorMap: Record<string, string> = {
    Contact: "#contact",
    Projects: "#projects",
    Home: "#home",
  };
  const anchor = anchorMap[sectionLabel];
  if (anchor) {
    cy.get(`a[href='${anchor}']`).first().click({ force: true });
  }
});

When("I click on the {string} menu link", (label: string) => {
  const anchorMap: Record<string, string> = {
    Contact: "#contact",
    Projects: "#projects",
    Home: "#home",
  };
  const anchor = anchorMap[label];
  if (anchor) {
    cy.get(`a[href='${anchor}']`).first().click({ force: true });
  }
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

// CSS case-insensitive flag 'i' não é suportado pelo Sizzle/jQuery do Cypress
// — filtra via JS com toLowerCase()
Then("the navigation should be accessible on mobile", () => {
  cy.get("body").then(($body) => {
    const hasHamburger = $body
      .find("button")
      .toArray()
      .some((el) => {
        const label = (el.getAttribute("aria-label") ?? "").toLowerCase();
        return label.includes("menu") || label.includes("navigation");
      });

    if (hasHamburger) {
      cy.get("button")
        .filter((_, el) => {
          const label = (el.getAttribute("aria-label") ?? "").toLowerCase();
          return label.includes("menu") || label.includes("navigation");
        })
        .first()
        .click();
    }

    // Independente de hamburger, as âncoras devem existir no DOM
    cy.get("a[href='#projects']").should("exist");
    cy.get("a[href='#contact']").should("exist");
  });
});

Then("the like button should be visible on mobile", () => {
  MainPage.getLikeButton().scrollIntoView().should("be.visible");
});