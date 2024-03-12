"use client";

import Image from "next/image";
import Link from "next/link";
import ListRecipes from "./ListRecipe";
import { buttonVariants } from "./ui/button";

export const CardProfile = ({ currentUser, userRecipes }) => {
  const removeHTTP = (url) => {
    return url.replace(/(^\w+:|^)\/\//, "");
  };

  return (
    <div>
      {currentUser ? (
        <div className="mx-auto mt-14 w-full max-w-2xl bg-white">
          <div className="flex justify-end px-4 pt-4"></div>
          <div className="flex flex-col items-center pb-10">
            <Image
              src={currentUser.image}
              alt={currentUser.name}
              width={240}
              height={240}
              priority={true}
              className="mb-5 rounded-full border-[20px] border-myblue p-2"
            />
            <h5 className="mb-3 text-xl font-extrabold tracking-tight sm:text-2xl">
              {currentUser.name}
            </h5>

            {currentUser.bio && (
              <p className="mb-3 max-w-lg text-center text-base italic text-gray-600">
                {currentUser.bio}
              </p>
            )}
            {currentUser.link && (
              <a
                href={currentUser.link}
                target="_blank"
                rel="noreferrer"
                className="mb-3 text-sm text-myblue"
              >
                {removeHTTP(currentUser.link)}
              </a>
            )}
            <div>
              <Link
                className={buttonVariants({ variant: "outline" })}
                href="/profil/edit"
              >
                Modifier
              </Link>
            </div>
          </div>
        </div>
      ) : null}
      <div className="mx-5 grid grid-cols-2 gap-5 lg:grid-cols-4">
        {userRecipes.map((recipe) => (
          <div key={recipe.id}>
            <ListRecipes recipe={recipe} />
          </div>
        ))}
      </div>
    </div>
  );
};
