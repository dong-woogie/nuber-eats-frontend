import { render } from "@testing-library/react";
import SkeletonRestaurant from "../restaurant/SkeletonRestaurant";

describe("<SkeletonRestaurant />", () => {
  it("should render OK with props", () => {
    render(<SkeletonRestaurant />);
  });
});
