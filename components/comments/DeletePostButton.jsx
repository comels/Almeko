"use client";

import { deleteComment } from "@/app/actions/commentActions";
import { Loader } from "@/components/ui/loader";
import { Trash } from "lucide-react";
import { useTransition } from "react";

export const DeletePostButton = ({ commentId }) => {
  const [isPending, starTransaction] = useTransition();

  return (
    <button
      className="flex items-center gap-1 rounded-md hover:bg-accent"
      onClick={() => {
        starTransaction(() => {
          deleteComment(commentId);
        });
      }}
    >
      {isPending ? <Loader size={20} /> : <Trash size={20} />}
    </button>
  );
};
