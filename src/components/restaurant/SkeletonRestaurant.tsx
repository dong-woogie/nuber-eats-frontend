import React from "react";

function SkeletonRestaurant() {
  return (
    <div>
      <div className="bg-gray-100 shadow-md py-20 sm:py-28"></div>
      <div className="mt-3 bg-gray-100 h-5"></div>
      <hr className="my-2" />
      <div className="bg-gray-100 h-5"></div>
    </div>
  );
}

export default SkeletonRestaurant;
