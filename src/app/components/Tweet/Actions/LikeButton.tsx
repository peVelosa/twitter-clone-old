"use client";
import { FaHeart } from "react-icons/fa";
import type { FC } from "react";

type LikeButtonProps = {
  isUser: boolean;
  likes: number;
};

const LikeButton: FC<LikeButtonProps> = ({ isUser, likes }) => {
  return (
    <>
      <button className="inline-flex items-center gap-2">
        <FaHeart className={`${isUser ? "fill-red-600" : null}`} />
        {likes}
      </button>
    </>
  );
};

export default LikeButton;
