describe("Navigation Tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("visits the homepage", () => {});

  it("visits the categories page", () => {
    cy.visit("http://localhost:3000/categories");
  });

  it("visits the quiz page", () => {
    cy.visit("http://localhost:3000/quiz");
  });

  it("visits the account page", () => {
    cy.visit("http://localhost:3000/account");
  });

  it("checks the navigator language", () => {
    cy.visit("http://localhost:3000")
      .its("navigator.language")
      .should("equal", "en-US");
  });

  it("Checks the logo to see if lrnr appears", () => {
    cy.get("#logo-container").contains("lrnr");
  });

  it("checks the viewport", () => {
    cy.viewport(320, 480);
    cy.get("#logo-container").should("be.visible");
  });

  it("should display the menu button", () => {
    cy.get(".sidenav-trigger").should("exist");
  });
});
describe("Home page testing", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("this displays the Home elements (static)", () => {
    cy.get("i").contains("flash_on");
    cy.get("i").contains("payments");
    cy.get("i").contains("person");
  });
});
describe("Account page testing", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/account");
  });

  it("this displays the account stats (static)", () => {
    cy.get("h1").should("have.text", "Account");
    cy.get("i").contains("whatshot");
    cy.get("i").contains("view_list");
    cy.get("i").contains("person");
  });
});

describe("Categories Page Tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/categories");
  });

  // forced true due to select not being visible This element <select#topic> is not visible because it has CSS property: display: none

  //Fix this problem, or use {force: true} to disable error checking.Learn more
  it(" check if the dropdown work had to force display ", () => {
    cy.get("#topic").select("aws", { force: true }).should("have.value", "aws");
    cy.get("#expertise")
      .select("novice", { force: true })
      .should("have.value", "novice");
    cy.get("#numquestions")
      .select("5", { force: true })
      .should("have.value", "5");
    cy.get("#questionstyle")
      .select("master oogway", { force: true })
      .should("have.value", "master oogway");
  });
});
