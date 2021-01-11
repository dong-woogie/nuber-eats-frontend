import { render, waitFor } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import NotFound from "../NotFound";

describe("<NotFound />", () => {
  it("should render OK", async () => {
    render(
      <HelmetProvider>
        <BrowserRouter>
          <NotFound />
        </BrowserRouter>
      </HelmetProvider>
    );

    await waitFor(() => {
      expect(document.title).toBe("Not found | Nuber Eats");
    });
  });
});
