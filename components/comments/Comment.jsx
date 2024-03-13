import { getCurrentUser, getUserById } from "@/app/actions/userActions";
import { DeletePostButton } from "./DeletePostButton";
import { PostLayout } from "./PostLayout";

export const Comment = async ({ comment }) => {
  const user = await getUserById(comment.authorId);
  const currentUser = await getCurrentUser();

  return (
    <PostLayout createdAt={comment.createdAt} user={user}>
      <div className="mt-2 text-foreground">
        {comment.content.split("\n").map((text, index) => (
          <p key={index}>{text}</p>
        ))}
      </div>
      <div className="flex justify-end">
        {comment.authorId === currentUser?.id ? (
          <DeletePostButton commentId={comment.id} />
        ) : null}
      </div>
    </PostLayout>
  );
};
