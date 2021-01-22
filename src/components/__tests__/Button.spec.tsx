import { render } from "@testing-library/react";
import Button from "../common/Button";

describe("<Button />", () => {
  it("should render OK with props", () => {
    const TEST_TEXT = "test";
    const { getByText } = render(
      <Button activeText={TEST_TEXT} canClick={true} loading={false} />
    );
    getByText(TEST_TEXT);
  });

  it("should render text 'loading...' if props.loading is true", () => {
    const LOADING_TEXT = "loading....";
    const { getByText } = render(
      <Button activeText={LOADING_TEXT} canClick={true} loading={true} />
    );
    getByText(LOADING_TEXT);
  });

  it("should can't click if props.canclick is false", () => {
    const TEST_TEXT = "test";
    const TEST_ELEMENT_CLASS = "pointer-events-none";
    const { container } = render(
      <Button activeText={TEST_TEXT} canClick={false} loading={true} />
    );
    expect(container.firstChild).toHaveClass(TEST_ELEMENT_CLASS);
  });
});
