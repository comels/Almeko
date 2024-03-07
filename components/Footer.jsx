import { buttonVariants } from "@/components/ui/button";
import clsx from "clsx";
import { Home, PlusSquare, User2 } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 mx-auto flex max-w-2xl justify-between border-t border-accent bg-background py-4">
      <Link
        href="/"
        className={clsx(buttonVariants({ variant: "ghost" }), "flex-1")}
      >
        <Home className="text-myblue  h-5 w-5" />
      </Link>
      <Link
        href="/write"
        className={clsx(buttonVariants({ variant: "ghost" }), "flex-1")}
      >
        <PlusSquare className="text-myblue h-5 w-5" />
      </Link>
      <Link
        href="/profile"
        className={clsx(buttonVariants({ variant: "ghost" }), "flex-1")}
      >
        <User2 className="text-myblue h-5 w-5" />
      </Link>
    </div>
  );
};

export default Footer;
