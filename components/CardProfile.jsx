"use client"

import { Button } from "@/components/ui/button";

export const CardProfile = ({currentUser}) => {
  return (
    <div>
      {currentUser ? (
        <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-lg">
          <div className="flex justify-end px-4 pt-4"></div>
          <div className="flex flex-col items-center pb-10">
            <img
              className="w-36 h-36 mb-5 rounded-full shadow-lg"
              src={currentUser.image ? currentUser.image : "/avatar.jpeg"}
              alt={currentUser.name}
            />
            <h5 className="mb-3 text-xl font-medium text-gray-900">
              {currentUser.name}
            </h5>
            <span className="text-sm text-gray-500 ">{currentUser.email}</span>
            <div className="flex gap-4 mt-4 md:mt-6">
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
