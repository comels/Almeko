import Link from "next/link";
import { PostLayout } from "./PostLayout";
import { DeletePostButton } from "./DeletePostButton";
import { getCurrentUser, getUserById } from "@/app/actions/userActions";

export const Comment = async ({ comment }) => {
  const user = await getUserById(comment.authorId);
  const currentUser = await getCurrentUser();

  return (
    <PostLayout createdAt={comment.createdAt} user={user}>
      <Link href={"/"} className="mt-2 text-sm text-foreground">
        {comment.content.split("\n").map((text, index) => (
          <p key={index}>{text}</p>
        ))}
      </Link>
      <div className="flex items-center gap-2">
        {comment.authorId === currentUser?.id ? (
          <DeletePostButton commentId={comment.id} />
        ) : null}
      </div>
    </PostLayout>
  );
};