"use client";

import { Button } from "../ui/button";
import { useCallback } from "react";
import qs from "query-string";
import { useRouter, useSearchParams } from "next/navigation";

const CategoryItem = ({ label, value, selected }) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }
    const updatedQuery = {
      ...currentQuery,
      category: value,
    };

    if (params?.get("category") === value) {
      delete updatedQuery.category;
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    router.push(url);
  }, [value, params, router]);

  return (
    <div className="flex flex-col items-center">
      <Button
        onClick={handleClick}
        variant={selected ? "blue" : "outlineblue"}
        size="sm"
      >
        {label}
      </Button>
    </div>
  );
};

export default CategoryItem;
