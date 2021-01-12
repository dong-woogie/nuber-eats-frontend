import { ApolloProvider } from "@apollo/client";
import { waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMockClient, MockApolloClient } from "mock-apollo-client";
import { render, RenderResult } from "../../test-utils";
import { UserRole } from "../../__generated__/globalTypes";
import CreateAccount, { CREATE_ACCOUNT_MUTATION } from "../CreateAccount";

const mockPush = jest.fn();

jest.mock("react-router-dom", () => {
  const realModule = jest.requireActual("react-router-dom");
  return {
    ...realModule,
    useHistory: () => ({
      push: mockPush,
    }),
  };
});

describe("<CreateAccount />", () => {
  let mockedClient: MockApolloClient;
  let renderResult: RenderResult;

  beforeEach(async () => {
    await waitFor(() => {
      mockedClient = createMockClient();
      renderResult = render(
        <ApolloProvider client={mockedClient}>
          <CreateAccount />
        </ApolloProvider>
      );
    });
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it("should render OK", async () => {
    await waitFor(() => {
      expect(document.title).toBe("Create Account | Nuber Eats");
    });
  });

  it("display email validation error", async () => {
    const { getByPlaceholderText, getByRole } = renderResult;
    const email = getByPlaceholderText(/email/i);

    await waitFor(() => {
      userEvent.type(email, "asd@test");
    });
    let emailErrorElement = getByRole("alert");
    expect(emailErrorElement).toHaveTextContent(/please enter a valid email/i);

    await waitFor(() => {
      userEvent.clear(email);
    });
    emailErrorElement = getByRole("alert");
    expect(emailErrorElement).toHaveTextContent(/email is required/i);
  });

  it("display password validation error", async () => {
    const { getByPlaceholderText, getByRole } = renderResult;
    const email = getByPlaceholderText(/email/i);
    const submitButton = getByRole("button");

    await waitFor(() => {
      userEvent.type(email, "test@google.com");
      userEvent.click(submitButton);
    });
    const errorElement = getByRole("alert");
    expect(errorElement).toHaveTextContent(/Password is required/i);
  });

  it("submit form and call createAccount mutation", async () => {
    const { getByPlaceholderText, getByDisplayValue, getByRole } = renderResult;
    const email = getByPlaceholderText(/email/i);
    const password = getByPlaceholderText(/password/i);
    const submitButton = getByRole("button");
    const role = getByDisplayValue(UserRole.Client);
    const createAccountInput = {
      email: "test@google.com",
      password: "1234",
      role: UserRole.Delivery,
    };
    const createAccountResponse = {
      ok: true,
      error: "createAccount mutation error",
    };
    const mockedResponse = jest.fn().mockResolvedValue({
      data: {
        createAccount: {
          ok: createAccountResponse.ok,
          error: createAccountResponse.error,
        },
      },
    });
    mockedClient.setRequestHandler(CREATE_ACCOUNT_MUTATION, mockedResponse);

    await waitFor(() => {
      userEvent.type(email, createAccountInput.email);
      userEvent.type(password, createAccountInput.password);
      userEvent.selectOptions(role, createAccountInput.role);
      userEvent.click(submitButton);
    });

    const errorElement = getByRole("alert");
    expect(errorElement).toHaveTextContent(createAccountResponse.error);

    expect(mockedResponse).toHaveBeenCalledTimes(1);
    expect(mockedResponse).toHaveBeenCalledWith({
      createAccountInput: createAccountInput,
    });

    expect(mockPush).toHaveBeenCalledWith("/login");
  });
});
