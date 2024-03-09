"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { categories } from "../formRecipe/FormRecipe";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import CategoryItem from "./CategoryItem";

const CategoryMenu = () => {
  const params = useSearchParams();
  const categoryParam = params?.get("category");
  const pathname = usePathname();

  const isMainPage = pathname === "/";

  if (!isMainPage) {
    return null;
  }

  return (
    <ScrollArea>
      <div className="mx-5 mb-1 mt-5 py-4 md:mx-0">
        <div className="mx-auto flex max-w-2xl items-center justify-between gap-5">
          {categories.map((category) => (
            <CategoryItem
              key={category.value}
              label={category.label}
              value={category.value}
              selected={categoryParam === category.value}
            />
          ))}
        </div>
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default CategoryMenu;
