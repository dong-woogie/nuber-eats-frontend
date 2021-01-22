import { MockedProvider } from "@apollo/client/testing";
import React from "react";
import { render, waitFor } from "@testing-library/react";
import Header from "../home/Header";
import { ME_QUERY } from "../../lib/graphql/user";
import { BrowserRouter } from "react-router-dom";

describe("<Header />", () => {
  it("should renders without verify banner", async () => {
    await waitFor(async () => {
      const { queryByText } = render(
        <MockedProvider
          mocks={[
            {
              request: {
                query: ME_QUERY,
              },
              result: {
                data: {
                  me: {
                    id: 1,
                    email: "",
                    role: "",
                    verified: true,
                  },
                },
              },
            },
          ]}
        >
          <BrowserRouter>
            <Header />
          </BrowserRouter>
        </MockedProvider>
      );
      await new Promise((resolve) => setTimeout(resolve, 0));
      expect(queryByText("Please verify your email")).toBeNull();
    });
  });

  it("should renders verify banner", async () => {
    await waitFor(async () => {
      const { getByText } = render(
        <MockedProvider
          mocks={[
            {
              request: {
                query: ME_QUERY,
              },
              result: {
                data: {
                  me: {
                    id: 1,
                    email: "",
                    role: "",
                    verified: false,
                  },
                },
              },
            },
          ]}
        >
          <BrowserRouter>
            <Header />
          </BrowserRouter>
        </MockedProvider>
      );
      await new Promise((resolve) => setTimeout(resolve, 0));
      getByText("Please verify your email");
    });
  });
});
