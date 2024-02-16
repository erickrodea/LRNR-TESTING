describe("My First Test", () => {
  it("visits the homepage", () => {
    cy.visit("http://localhost:3000");
  });
});

describe("second test", () => {
  it("visits the categories page", () => {
    cy.visit("http://localhost:3000/categories");
  });
});

describe("third test", () => {
  it("visits the quiz page", () => {
    cy.visit("http://localhost:3000/quiz");
  });
});

describe("fourth test", () => {
  it("visits the account page", () => {
    cy.visit("http://localhost:3000/account");
  });
});

describe("sixth test", () => {
  it("Checks the header", () => {
    cy.visit("http://localhost:3000").get(".header").should("contain", "lrnr");
  });
});

describe("fifth test", () => {
  it("checks the navigator language", () => {
    cy.visit("http://localhost:3000")
      .its("navigator.language")
      .should("equal", "en-US");
  });
});
