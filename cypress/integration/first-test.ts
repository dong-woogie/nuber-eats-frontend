describe("First Test", () => {
  it("should go home", () => {
    cy.visit("/").title().should("eq", "Login | Nuber Eats");
  });
});
