import React from "react";

interface ICategoryProps {
  id: string;
  name: string;
  coverImg?: string | null;
}

function Category({ id, name, coverImg }: ICategoryProps) {
  return (
    <div className="flex flex-col justify-center items-center cursor-pointer group">
      <div
        className="w-10 h-10 shadow-md bg-gray-100 group-hover:bg-gray-200 rounded-full box-content p-1.5 bg-cover bg-center"
        style={{ backgroundImage: `url(${coverImg})` }}
      ></div>
      <div className="mt-3">
        <span className="font-medium text-sm">{name}</span>
      </div>
    </div>
  );
}

export default Category;
