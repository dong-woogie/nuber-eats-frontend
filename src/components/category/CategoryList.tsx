import React from "react";
import { CategoryParts } from "../../__generated__/CategoryParts";
import Category from "./Category";
import SkeletonCategory from "./SkeletonCategory";

interface ICategories {
  categories: CategoryParts[];
  loading: boolean;
}

function CategoryList({ categories, loading }: ICategories) {
  return (
    <section className="base-wrap-w mt-8">
      <div className="flex justify-around max-w-md m-auto">
        {categories?.map((category) => (
          <Category
            slug={category.slug}
            name={category.name}
            coverImg={category.coverImg}
            key={category.id}
          />
        ))}
        {loading &&
          Array.from({ length: 5 }).map((empty, index) => (
            <SkeletonCategory key={index} />
          ))}
      </div>
      <hr className="mt-8" />
    </section>
  );
}

export default CategoryList;
