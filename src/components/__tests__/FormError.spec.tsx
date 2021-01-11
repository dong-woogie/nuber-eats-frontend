import { render } from "@testing-library/react";
import FormError from "../FormError";

describe("<FormError />", () => {
  it("should render ok with props", () => {
    const TEST_ERROR_MESSAGE = "test form erorr";
    const { getByText } = render(
      <FormError errorMessage={TEST_ERROR_MESSAGE} />
    );
    getByText(TEST_ERROR_MESSAGE);
  });
});
