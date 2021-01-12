describe("edit-profile", () => {
  const user = cy;
  const realAccount = {
    email: "com6511@gmail.com",
    password: "1234",
  };
  const EDIT_EMAIL = "test@naver.com";

  beforeEach(() => {
    // @ts-ignore
    user.login(realAccount.email, realAccount.password);
    user.get('a[href="/edit-profile"]').click();
    user.wait(2000);
  });

  it("should login and visit edit-profile page", () => {
    user.title().should("eq", "Edit Profile | Nuber Eats");
  });

  it("should display verify banner after edit email", () => {
    user.intercept("POST", "http://localhost:4000/graphql", (req) => {
      if (req.body?.operationName === "editProfile") {
        // @ts-ignore
        req.body?.variables?.input?.email = realAccount.email;
        req.reply((res) => {
          res.send({
            fixture: "user/edit-profile.json",
          });
        });
      }
    });
    user.findByPlaceholderText(/email/i).clear().type(EDIT_EMAIL);
    user.findByRole("button").click();
    user.findByText("Please verify your email").should("exist");
  });
});
