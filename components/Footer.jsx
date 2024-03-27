import { buttonVariants } from "@/components/ui/button";
import clsx from "clsx";
import { Home, PlusSquare } from "lucide-react";
import Link from "next/link";
import { LoginButton } from "./auth/LoginButton";
import { MenuDeroulant } from "./auth/MenuDeroulant";

const Footer = ({ currentUser }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 mx-auto flex max-w-2xl justify-between border-t border-accent bg-background py-4 md:hidden">
      <Link
        href="/"
        className={clsx(buttonVariants({ variant: "ghost" }), "flex-1")}
      >
        <Home className="text-color1  h-5 w-5" />
      </Link>
      {currentUser && (
        <Link
          href="/recette/ajouter"
          className={clsx(buttonVariants({ variant: "ghost" }), "flex-1")}
        >
          <PlusSquare className="text-color1 h-5 w-5" />
        </Link>
      )}
      <div className="flex flex-1 justify-center px-2">
        {currentUser ? <MenuDeroulant /> : <LoginButton />}
      </div>
    </div>
  );
};

export default Footer;
