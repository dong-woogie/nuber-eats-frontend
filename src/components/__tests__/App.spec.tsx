import { render, waitFor } from "@testing-library/react";
import { loggedVars } from "../../apollo";
import App from "../App";

jest.mock("../../routes/LoggedInRoute", () => {
  return () => <span>logged in</span>;
});

jest.mock("../../routes/LoggedOutRoute", () => {
  return () => <span>logged out</span>;
});

describe("<App />", () => {
  it("renders LoggedOutRouter", () => {
    const { getByText } = render(<App />);
    getByText("logged out");
  });

  it("renders LoggedInRouter", async () => {
    const { getByText } = render(<App />);
    await waitFor(() => {
      loggedVars(true);
    });
    getByText("logged in");
  });
});
