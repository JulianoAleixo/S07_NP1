import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import MainPage from "../../pages/MainPage";

Given("I am on the portfolio home page", () => {
  MainPage.visit();
});

Given("I navigate to the {string} section", (sectionLabel: string) => {
  MainPage.clickLink(sectionLabel);
});

Then("I should see the contact invitation text", () => {
  MainPage.containsText("Have a question or a project in mind?").should(
    "be.visible",
  );
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

When(
  "I submit the contact form leaving the {string} field empty",
  (field: string) => {
    cy.fixture("contact").then((contact) => {
      const data: { name?: string; email?: string; message?: string } = {
        name: contact.validName,
        email: contact.validEmail,
        message: contact.validMessage,
      };
      delete data[field as keyof typeof data];

      MainPage.fillContactForm(data);
      MainPage.clickButton("Submit");
    });
  },
);

When(
  "I submit the contact form with a malformed email {string}",
  (label: string) => {
    const fixtureKeyMap: Record<string, string> = {
      "no @": "malformedEmailNoAt",
      "no domain": "malformedEmailNoDomain",
      "no TLD": "malformedEmailNoTld",
      "with space": "malformedEmailWithSpace",
    };

    if (
      label === "with space" &&
      (Cypress.browser.name === "chrome" || Cypress.browser.name === "electron")
    ) {
      cy.log(
        "SKIP: Chrome filtra espaço em input[type=email] durante a digitação — " +
          "este cenário não é executável via teclado real neste navegador.",
      );
      return;
    }

    cy.fixture("contact").then((contact) => {
      const emailValue = contact[fixtureKeyMap[label]];

      MainPage.fillContactForm({
        name: contact.validName,
        email: emailValue,
        message: contact.validMessage,
      });

      cy.get("input[name=from_email]").should("have.value", emailValue);

      MainPage.clickButton("Submit");
    });
  },
);

Then("the {word} field should be marked as invalid", (field: string) => {
  const selectorMap: Record<string, string> = {
    name: "input[name=from_name]",
    email: "input[name=from_email]",
    message: "textarea[name=message]",
  };
  MainPage.getInvalidField(selectorMap[field]).should("exist");
  cy.get("body").should("not.contain", "Message sent successfully!");
});

When(
  "I submit the contact form with whitespace-only in the {string} field",
  (field: string) => {
    cy.fixture("contact").then((contact) => {
      const whitespaceValue =
        field === "name"
          ? contact.whitespaceOnlyName
          : contact.whitespaceOnlyMessage;

      const data: { name?: string; email?: string; message?: string } = {
        name: contact.validName,
        email: contact.validEmail,
        message: contact.validMessage,
      };

      data[field as keyof typeof data] = whitespaceValue;

      MainPage.fillContactForm(data);
      MainPage.clickButton("Submit");
    });
  },
);

Then("I should not see the success message", () => {
  cy.get("body").should("not.contain", "Message sent successfully!");
});
