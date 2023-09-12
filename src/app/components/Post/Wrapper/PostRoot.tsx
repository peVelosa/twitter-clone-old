import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import type { FC } from "react";

type PostRootProps = {
  href: string;
  children: React.ReactNode;
  className?: React.ComponentProps<"article">["className"];
};

const PostRoot: FC<PostRootProps> = ({ href, children, className }) => {
  const router = useRouter();

  return (
    <>
      <article
        className={twMerge(
          "p-4 flex items-start gap-4 hover:bg-slate-700 cursor-pointer border-b border-slate-500",
          className,
        )}
        onClick={() => {
          router.push(href);
        }}
      >
        {children}
      </article>
    </>
  );
};

export default PostRoot;
