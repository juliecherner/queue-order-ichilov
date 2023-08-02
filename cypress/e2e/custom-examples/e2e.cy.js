context("Navigation", () => {
  beforeEach(() => {
    cy.visit("http://localhost:4200");
  });

  it("Basic route redirects to /registration", () => {
    cy.location("pathname").should("include", "registration");
  });
});

describe("Registration form", () => {
  beforeEach(() => {
    cy.visit("http://localhost:4200");
  });

  it("4 option of languages are used", () => {
    cy.get(".form-lang-tab-button").should("have.length", 4);
  });

  it("logo appears", () => {
    cy.get(".form-image").should("exist");
  });

  it("form inputs are writable and contain text input", () => {
    const name = "Julie";
    const surname = "Cherner";
    const id = 123456789;
    const phone = 123456789;

    cy.get("[name=lastName] .form-input-container--input").type(`${surname}`);
    cy.get("[name=firstName] .form-input-container--input").type(`${name}`);
    cy.get("[name=idNumber] .form-input-container--input").type(`${id}`);
    cy.get("[name=phoneBase] .form-input-container--input").type(`${phone}`);

    cy.get("[name=lastName] .form-input-container--input").contains(
      `${surname}`
    );
    cy.get("[name=firstName] .form-input-container--input").contains(`${name}`);
    cy.get("[name=idNumber] .form-input-container--input").contains(`${id}`);
    cy.get("[name=phoneBase] .form-input-container--input").contains(
      `${phone}`
    );
  });
});
