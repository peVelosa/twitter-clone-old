import { FaComment } from "react-icons/fa";
import type { FC } from "react";
import { useSession } from "next-auth/react";

type CommentButtonProps = {
  comments?: number;
};

const CommentButton: FC<CommentButtonProps> = ({ comments }) => {
  const { data: session } = useSession();

  return (
    <>
      <button
        className="inline-flex items-center gap-2"
        disabled={!session?.user.id}
      >
        <FaComment
          size={35}
          className="p-2"
        />
        {comments && comments}
      </button>
    </>
  );
};

export default CommentButton;
