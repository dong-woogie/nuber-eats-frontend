import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Category from "../category/Category";

describe("<Category />", () => {
  it("should render OK with props", () => {
    const categoryProps = {
      name: "name",
      slug: "slug",
      coverImg: "coverImg",
    };
    const { container, getByText } = render(
      <BrowserRouter>
        <Category {...categoryProps} />
      </BrowserRouter>
    );

    getByText(categoryProps.name);
    expect(container.firstChild).toHaveAttribute(
      "href",
      `/category/${categoryProps.slug}`
    );
  });
});
