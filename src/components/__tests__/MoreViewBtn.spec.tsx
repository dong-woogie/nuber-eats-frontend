import { render } from "@testing-library/react";
import MoreViewBtn from "../common/MoreViewBtn";

describe("<MoreViewBtn />", () => {
  it("should render OK with props", () => {
    const BUTTON_TEXT = "MORE VIEW";
    const { getByText } = render(<MoreViewBtn onClick={jest.fn()} />);
    getByText(BUTTON_TEXT);
  });
});
