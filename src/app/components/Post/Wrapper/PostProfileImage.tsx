import Link from "next/link";
import ImageWithFallback from "../../ImageWithFallback";
import { twMerge } from "tailwind-merge";
import type { FC } from "react";
import type { StaticImport } from "next/dist/shared/lib/get-img-props";

type PostProfileImageProps = {
  href: string;
  image: string | StaticImport;
  className?: React.ComponentProps<"a">["className"];
  width?: number | `${number}` | undefined;
  height?: number | `${number}` | undefined;
};

const PostProfileImage: FC<PostProfileImageProps> = ({
  href,
  image,
  className,
  width = 40,
  height = 40,
}) => {
  return (
    <>
      <div
        onClick={(e) => e.stopPropagation()}
        className="shrink-0"
      >
        <Link href={href}>
          <ImageWithFallback
            alt="image profile"
            src={image}
            width={40}
            height={40}
            className={twMerge("rounded-full hover:scale-110", className)}
          />
        </Link>
      </div>
    </>
  );
};

export default PostProfileImage;
