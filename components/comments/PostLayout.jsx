"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDate } from "@/lib/date";
import clsx from "clsx";
import Link from "next/link";

export const PostLayout = ({ user, children, createdAt, className }) => {
  return (
    <div className={clsx("flex py-4 ", className)}>
      <div className="flex w-full flex-col gap-2">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <Avatar>
              {user.image ? (
                <AvatarImage src={user.image} alt={user.name} />
              ) : null}
              <AvatarFallback>
                {user.name ? user.name.slice(0, 2).toUpperCase() : "UN"}
              </AvatarFallback>
            </Avatar>
            {/* <Link href={`/users/${user.id}`}> */}
            <Link href={"/"}>
              <p className="mr-auto font-bold text-card-foreground">
                {user.name}
              </p>
            </Link>
          </div>
          <div className="flex items-center gap-3">
            {createdAt ? (
              <p className="text-xs text-muted-foreground">
                {formatDate(createdAt)}
              </p>
            ) : null}
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};
