/// <reference types="cypress" />

declare global {
    namespace Cypress {
        interface Chainable {
            visitHome(): Chainable<void>;
        }
    }
}

Cypress.Commands.add("visitHome", () => {
    cy.visit("/");
});

export {};
