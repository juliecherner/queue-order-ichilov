context("Navigation", () => {
  beforeEach(() => {
    cy.visit("http://localhost:4200");
  });

  it("Basic route redirects to /registration", () => {
    cy.location("pathname").should("include", "registration");
  });
});

describe("Language checks", () => {
  beforeEach(() => {
    cy.visit("http://localhost:4200");
  });

  it("4 option of languages are introduced on the first load", () => {
    cy.get(".form-lang-tab-button").should("have.length", 4);
  });
});

describe("Non intarrctive elements and labels appear", () => {
  beforeEach(() => {
    cy.visit("http://localhost:4200");
  });

  it("logo appears", () => {
    cy.get(".form-image").should("exist");
  });

  it("Agreement condition appears", () => {
    cy.get(".form-input-container-agreement")
      .siblings("div")
      .should("not.be.empty");
  });

  it("Form labels and title appear", () => {
    cy.get(".form-title").should("not.be.empty");

    cy.get(".form-input-container").each(($container) => {
      cy.wrap($container).siblings("label").should("not.be.empty");
    });

    cy.get(".radio-button").each(($button) => {
      cy.wrap($button).siblings("label").should("not.be.empty");
    });

    cy.get("mat-label").each(($label) => {
      cy.wrap($label).should("not.be.empty");
    });

    cy.get(
      ".form-input-container .phones-container mat-select div div span span"
    ).should("not.be.empty");
  });
});

describe("Registration form fillin check", () => {
  beforeEach(() => {
    cy.visit("http://localhost:4200");
  });

  it("form inputs are writable and contain text input", () => {
    const firstName = "Julie";
    const lastName = "Cherner";
    const idNumber = 123456789;
    const phoneBase = 123456789;

    cy.get("input[name=firstName]")
      .type(firstName)
      .should("have.value", firstName);

    cy.get("input[name=lastName]")
      .type(lastName)
      .should("have.value", lastName);

    cy.get("input[name=idNumber]")
      .type(idNumber)
      .should("have.value", idNumber);

    cy.get("input[name=phoneBase]")
      .type(phoneBase)
      .should("have.value", phoneBase);
  });

  it("checkbox is clickable and save its checked/unchecked status by clicking", () => {
    cy.get(".form-input-container-agreement input[type=checkbox]")
      .check()
      .should("have.class", "ng-valid");
  });

  it("checkbox may be unchecked", () => {
    cy.get(".form-input-container-agreement input[type=checkbox]")
      .check()
      .should("have.class", "ng-valid")
      .uncheck()
      .should("have.class", "ng-invalid");
  });
});
