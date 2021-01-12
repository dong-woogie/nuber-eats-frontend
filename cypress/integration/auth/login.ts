describe("login", () => {
  const user = cy;
  it("should go home", () => {
    user.visit("/").title().should("eq", "Login | Nuber Eats");
  });

  it("can see email/password validation erros", () => {
    user.visit("/");
    user.findByPlaceholderText(/email/i).type("asd@test");
    user.findByRole("alert").should("have.text", "please enter a valid email");
    user.findByPlaceholderText(/email/i).clear();
    user.findByRole("alert").should("have.text", "Email is required");

    user.findByPlaceholderText(/email/i).type("com6511@google.com");
    user
      .findByPlaceholderText(/password/i)
      .type("a")
      .clear();
    user.findByRole("alert").should("have.text", "Password is required");
  });

  it("wrong password", () => {
    user.visit("/");
    user.findByPlaceholderText(/email/i).type("com6511@gmail.com");
    user.findByPlaceholderText(/password/i).type("wrong password");
    user
      .findByRole("button")
      .should("not.have.class", "point-events-none")
      .click();
    user.findByRole("alert").should("have.text", "Wrong password");
  });

  it("can fill out form and login", () => {
    user.visit("/");
    user.findByPlaceholderText(/email/i).type("com6511@gmail.com");
    user.findByPlaceholderText(/password/i).type("1234");
    user
      .findByRole("button")
      .should("not.have.class", "point-events-none")
      .click();
    user.window().its("localStorage.nuber-token").should("be.a", "string");
  });
});
