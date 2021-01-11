import React from "react";
import { Link } from "react-router-dom";

interface ICategoryProps {
  name: string;
  slug: string;
  coverImg?: string | null;
}

function Category({ name, coverImg, slug }: ICategoryProps) {
  return (
    <Link to={`/category/${slug}`}>
      <div className="flex flex-col justify-center items-center cursor-pointer group">
        <div
          className="w-10 h-10 shadow-md bg-gray-100 group-hover:bg-gray-200 rounded-full box-content p-1.5 bg-cover bg-center"
          style={{ backgroundImage: `url(${coverImg})` }}
        ></div>
        <div className="mt-3">
          <span className="font-medium text-sm">{name}</span>
        </div>
      </div>
    </Link>
  );
}

export default Category;
