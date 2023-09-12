import Link from "next/link";
import ImageWithFallback from "../../ImageWithFallback";
import type { FC } from "react";

type PostImageProps = {
  userName: string;
  image: string;
};

const PostImage: FC<PostImageProps> = ({ userName, image }) => {
  return (
    <>
      <div
        onClick={(e) => e.stopPropagation()}
        className="shrink-0"
      >
        <Link href={`/${userName}`}>
          <ImageWithFallback
            alt="image profile"
            src={image}
            width={40}
            height={40}
            className="rounded-full hover:scale-110"
          />
        </Link>
      </div>
    </>
  );
};

export default PostImage;
