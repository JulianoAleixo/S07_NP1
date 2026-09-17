import {
  Given,
  When,
  Then,
  After,
} from "@badeball/cypress-cucumber-preprocessor";
import MainPage from "../../pages/MainPage";

let initialCount: number;

Given("I am on the portfolio home page", () => {
  MainPage.visit();
});

Given(
  "the page has an non-negative integer number of likes",
  (_placeholder: string) => {
    MainPage.getStableLikeCount().then((count) => {
      initialCount = count;
    });
  },
);

Then(
  "I should see the like button with a non-negative integer number of likes",
  () => {
    MainPage.getLikeCount().should((count) => {
      expect(count).to.be.a("number");
      expect(Number.isInteger(count)).to.be.true;
      expect(count).to.be.at.least(0);
    });
  },
);

When("I click on the like button", () => {
  MainPage.clickLikeButton();
});

Then("I should see the like button count increased by 1", () => {
  MainPage.reloadUntilLikeCountIs(initialCount + 1);
  MainPage.getLikeCount().should("eq", initialCount + 1);
});

Given("I have liked the page", () => {
  MainPage.clickLikeButton();
  MainPage.reloadUntilLikeCountIs(initialCount + 1);
});

Then("I should see the like button count decreased by 1", () => {
  MainPage.reloadUntilLikeCountIs(initialCount);
  MainPage.getLikeCount().should("eq", initialCount);
});

After(() => {
  MainPage.getLikeCount().then((currentCount) => {
    if (currentCount !== initialCount) {
      MainPage.clickLikeButton();
      MainPage.reloadUntilLikeCountIs(initialCount);
    }
  });
});
