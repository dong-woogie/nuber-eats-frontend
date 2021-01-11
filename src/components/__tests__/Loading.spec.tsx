import { render } from "@testing-library/react";
import Loading from "../Loading";

describe("<Loading />", () => {
  it("should render ok", () => {
    const { container } = render(<Loading />);
    expect(container.firstChild?.firstChild).toBeDefined();
  });
});
