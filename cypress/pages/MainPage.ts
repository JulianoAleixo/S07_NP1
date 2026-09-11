class MainPage {
    visit(): void {
        cy.visitHome();
    }

    containsText(text: string | RegExp): Cypress.Chainable {
        return cy.contains(text).scrollIntoView();
    }


    getHeading(text: string): Cypress.Chainable {
        const pattern = new RegExp(text.trim().split(/\s+/).join("\\s*"));
        return cy.contains("h1", pattern);
    }

    getLink(label: string): Cypress.Chainable {
        return cy.contains("a", label);
    }

    clickLink(label: string): void {
        this.getLink(label).click();
    }

    getButton(label: string): Cypress.Chainable {
        return cy.contains("button", label);
    }

    clickButton(label: string): void {
        this.getButton(label).click();
    }

    getSectionHeading(text: string): Cypress.Chainable {
        return cy.contains("h1, h2, h3", text, { matchCase: false });
    }

    getProjectCardImage(title: string): Cypress.Chainable {
        return cy.contains(title).scrollIntoView().parents("div").find("img");
    }

    getInvalidField(selector: string): Cypress.Chainable {
        return cy.get(`${selector}:invalid`);
    }
}

export default new MainPage();
