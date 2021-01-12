import { ApolloProvider } from "@apollo/client";
import { render, RenderResult, waitFor } from "../../test-utils";
import userEvent from "@testing-library/user-event";
import { createMockClient, MockApolloClient } from "mock-apollo-client";
import LoginPage, { LOGIN_MUTATION } from "../LoginPage";

describe("<Login />", () => {
  let renderResult: RenderResult;
  let mockedClient: MockApolloClient;
  beforeEach(async () => {
    await waitFor(() => {
      mockedClient = createMockClient();
      renderResult = render(
        <ApolloProvider client={mockedClient}>
          <LoginPage />
        </ApolloProvider>
      );
    });
  });

  it("should render OK", async () => {
    await waitFor(() => {
      expect(document.title).toBe("Login | Nuber Eats");
    });
  });

  it("display email validation errors", async () => {
    const { getByPlaceholderText, getByRole } = renderResult;
    const email = getByPlaceholderText(/email/i);

    await waitFor(() => {
      userEvent.type(email, "asd@test");
    });
    let errorElement = getByRole("alert");
    expect(errorElement).toHaveTextContent(/please enter a valid email/i);

    await waitFor(() => {
      userEvent.clear(email);
    });
    errorElement = getByRole("alert");
    expect(errorElement).toHaveTextContent(/email is required/i);
  });

  it("display password validation errors", async () => {
    const { getByPlaceholderText, getByRole } = renderResult;
    const email = getByPlaceholderText(/email/i);
    const submitBtn = getByRole("button");
    await waitFor(() => {
      userEvent.type(email, "test@google.com");
      userEvent.click(submitBtn);
    });
    let errorElement = getByRole("alert");
    expect(errorElement).toHaveTextContent(/Password is required/i);
  });

  it("submit form and call login mutation", async () => {
    const { getByRole, getByPlaceholderText } = renderResult;
    const submitButton = getByRole("button");
    const email = getByPlaceholderText(/email/i);
    const password = getByPlaceholderText(/password/i);
    const submitForm = {
      email: "test@google.com",
      password: "1234",
    };

    const loginResponse = {
      ok: true,
      token: "XXX",
      error: "mutation error",
    };
    jest.spyOn(Storage.prototype, "setItem");

    const mockedMutationResponse = jest.fn().mockResolvedValue({
      data: {
        login: {
          ok: loginResponse.ok,
          token: loginResponse.token,
          error: loginResponse.error,
        },
      },
    });
    mockedClient.setRequestHandler(LOGIN_MUTATION, mockedMutationResponse);

    await waitFor(() => {
      userEvent.type(email, submitForm.email);
      userEvent.type(password, submitForm.password);
      userEvent.click(submitButton);
    });

    const mutationErrorElement = getByRole("alert");

    expect(mutationErrorElement).toHaveTextContent(loginResponse.error);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "nuber-token",
      loginResponse.token
    );
    expect(mockedMutationResponse).toHaveBeenCalledTimes(1);
    expect(mockedMutationResponse).toHaveBeenCalledWith({
      loginInput: submitForm,
    });
  });
});
