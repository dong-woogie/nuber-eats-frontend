import React from "react";

function SkeletonCategory() {
  return (
    <div className="flex flex-col justify-center items-center cursor-pointer">
      <div className="w-10 h-10 shadow-md bg-gray-50 rounded-full box-content p-1.5"></div>
      <div className="w-full mt-3 h-5 bg-gray-100"></div>
    </div>
  );
}

export default SkeletonCategory;
