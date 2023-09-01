import { FaComment } from "react-icons/fa";
import type { FC } from "react";

type CommentButtonProps = {
  comments: number;
};

const CommentButton: FC<CommentButtonProps> = ({ comments }) => {
  return (
    <>
      <button className="inline-flex items-center gap-2">
        <FaComment />
        {comments}
      </button>
    </>
  );
};

export default CommentButton;
