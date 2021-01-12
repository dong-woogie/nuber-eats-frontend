import { render, waitFor } from "../../test-utils";
import NotFoundPage from "../NotFoundPage";

describe("<NotFound />", () => {
  it("should render OK", async () => {
    render(<NotFoundPage />);

    await waitFor(() => {
      expect(document.title).toBe("Not found | Nuber Eats");
    });
  });
});
