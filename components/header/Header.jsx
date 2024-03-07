"use client";

import Navbar from "./Navbar";

export const Header = ({ currentUser }) => {
  return (
    <div className="fixed top-0 z-20  w-full bg-white">
      <Navbar currentUser={currentUser} />
    </div>
  );
};
