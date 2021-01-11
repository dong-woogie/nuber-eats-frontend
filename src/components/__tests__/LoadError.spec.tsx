import { render } from "@testing-library/react";
import LoadError from "../LoadError";

describe("<LoadError />", () => {
  it("should render ok with props", () => {
    const TEST_ERROR_MESSAGE = "test load erorr";
    const { getByText } = render(<LoadError error={TEST_ERROR_MESSAGE} />);
    getByText(TEST_ERROR_MESSAGE);
  });
});
