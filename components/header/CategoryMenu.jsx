"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { categories } from "../formRecipe/Form";
import CategoryItem from "./CategoryItem";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

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
      <div className="mt-5 mb-1 py-4 md:mx-0 mx-5">
        <div className="flex items-center gap-5 justify-between max-w-2xl mx-auto">
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
