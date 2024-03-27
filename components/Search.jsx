"use client";

import Link from "next/link";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Input } from "./ui/input";

import { SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { DropdownMenuSeparator } from "./ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export const Search = ({ placeholder, allUsers, allRecipes }) => {
  const [users, setUsers] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    if (value === "") {
      setUsers([]);
      setRecipes([]);
      return false;
    }
    setUsers(
      allUsers
        .filter((user) => user.name.toLowerCase().includes(value))
        .slice(0, 10),
    );
    setRecipes(
      allRecipes
        .filter((recipe) => recipe.name.toLowerCase().includes(value))
        .slice(0, 10),
    );
  };
  return (
    <div className="w-full max-w-md">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button className="w-full" variant="outline">
            <SearchIcon className="text-color1 h-5 w-5" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="mx-4 max-h-[600px] overflow-y-auto">
          <Input
            type="search"
            placeholder={placeholder}
            onChange={handleSearch}
          />
          <div onClick={handleClose}>
            {users.length > 0 && (
              <div>
                <h1 className="mb-2 ml-1 mt-4 flex items-center gap-2 text-sm font-light text-gray-600">
                  Profils
                </h1>
                <div className="flex flex-col gap-2 ">
                  {users.map((user) => (
                    <div
                      key={user.id}
                      className="flex cursor-pointer items-center gap-3 rounded-md p-0.5 hover:font-medium"
                    >
                      <Avatar className="h-8 w-8">
                        {user.image ? (
                          <AvatarImage src={user.image} alt={user.name} />
                        ) : null}
                        <AvatarFallback>
                          {user.name
                            ? user.name.slice(0, 2).toUpperCase()
                            : "UN"}
                        </AvatarFallback>
                      </Avatar>
                      <Link href={`/user/${user.id}`}>
                        <p className="text-sm text-card-foreground ">
                          {user.name}
                        </p>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {users.length > 0 && recipes.length > 0 && (
              <DropdownMenuSeparator className="mt-4" />
            )}
            {recipes.length > 0 && (
              <div>
                <h1 className="mb-2 ml-1 mt-4 flex items-center gap-2 text-sm font-light text-gray-600">
                  Recettes
                </h1>
                <div className="flex flex-col gap-2 ">
                  {recipes.map((recipe) => (
                    <div
                      key={recipe.id}
                      className="flex cursor-pointer items-center gap-3 rounded-md p-1 hover:font-medium"
                    >
                      <Link href={`/recette/${recipe.id}`}>
                        <p className="text-sm text-card-foreground ">
                          {recipe.name}
                        </p>
                        <p className="text-color1 text-xs font-light ">
                          {recipe.authorName}
                        </p>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
