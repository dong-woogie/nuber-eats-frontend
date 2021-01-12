describe("create account e2e", () => {
  const user = cy;

  it("should display email / password validation errors", () => {
    user.visit("/create-account");
    user.findAllByPlaceholderText(/email/i).type("asd@test");
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

  it("should create account and visit login page", () => {
    user.visit("/create-account");
    user.intercept("POST", "http://localhost:4000/graphql", (req) => {
      const { operationName } = req.body;
      if (operationName && operationName === "createAccountMutation") {
        req.reply((res) => {
          res.send({
            fixture: "auth/create-account.json",
          });
        });
      }
    });

    // fake create-account
    user.findAllByPlaceholderText(/email/i).type("com6511@gmail.com");
    user.findAllByPlaceholderText(/password/i).type("1234");
    user.findByRole("button").click();

    user.wait(1000);

    // real login
    // @ts-ignore
    user.login("com6511@gmail.com", "1234");
  });
});
