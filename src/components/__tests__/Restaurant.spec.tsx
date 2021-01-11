import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Restaurant from "../Restaurant";

describe("<Restaurant />", () => {
  it("should render OK with props", () => {
    const restaurantProps = {
      id: 1 + "",
      name: "name",
      categoryName: "categoryName",
      coverImg: "coverImg",
    };
    const { container, getByText } = render(
      <BrowserRouter>
        <Restaurant {...restaurantProps} />
      </BrowserRouter>
    );
    getByText(restaurantProps.name);
    getByText(restaurantProps.categoryName);
    expect(container.firstChild).toHaveAttribute(
      "href",
      `/restaurants/${restaurantProps.id}`
    );
  });
});
