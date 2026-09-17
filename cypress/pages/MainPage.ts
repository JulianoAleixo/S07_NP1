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

  getLikeButton(): Cypress.Chainable {
    return cy.contains("button", /\d+\s*likes/i);
  }

  getLikeCount(): Cypress.Chainable<number> {
    return this.getLikeButton()
      .invoke("text")
      .then((text) => {
        const match = text.match(/\d+/);
        return match ? parseInt(match[0], 10) : NaN;
      });
  }

  getStableLikeCount(attemptsLeft = 5): Cypress.Chainable<number> {
    return this.getLikeCount().then((count) => {
      if ((count === 0 || Number.isNaN(count)) && attemptsLeft > 0) {
        cy.wait(300);
        return this.getStableLikeCount(attemptsLeft - 1);
      }
      return cy.wrap(count);
    });
  }

  clickLikeButton(): void {
    this.getLikeButton().click();
    cy.wait(500);
  }

  reloadUntilLikeCountIs(expected: number, attemptsLeft = 5): void {
    cy.reload();
    this.getStableLikeCount().then((count) => {
      if (count !== expected && attemptsLeft > 0) {
        this.reloadUntilLikeCountIs(expected, attemptsLeft - 1);
      }
    });
  }
}

export default new MainPage();
