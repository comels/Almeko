"use client";

import { Button } from "@/components/ui/button";

export const CardProfile = ({ currentUser }) => {
  return (
    <div>
      {currentUser ? (
        <div className="mx-auto mt-14 w-full max-w-2xl bg-white">
          <div className="flex justify-end px-4 pt-4"></div>
          <div className="flex flex-col items-center pb-10">
            <img
              className="mb-5 h-72 w-72 rounded-full border-[24px] border-myblue p-2"
              src={currentUser.image ? currentUser.image : "/avatar.jpeg"}
              alt={currentUser.name}
            />
            <h5 className="mb-3 text-xl font-medium text-gray-900">
              {currentUser.name}
            </h5>
            <span className="text-sm text-gray-500 ">{currentUser.email}</span>
            <div className="mt-4 flex gap-4 md:mt-6">
              <Button variant="outline">Suivre</Button>
              <Button variant="outline">Message</Button>
            </div>
          </div>
        </div>
      ) : (
        <div>Not Connected</div>
      )}
    </div>
  );
};
