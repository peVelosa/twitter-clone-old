import { Post } from ".";
import { deleteTweet, likeTweet, unlikeTweet } from "@/libs/api";
import PublishedTime from "../PublishedTime";
import type { Session } from "next-auth";
import type { SingleTweetType } from "@/types/api";
import type { FC } from "react";
import LikesList from "../Tweet/LikesList";
import Link from "next/link";

type HomePostProps = {
  tweet: SingleTweetType;
  session: Session | null;
};

const HomePost: FC<HomePostProps> = ({ tweet, session }) => {
  return (
    <>
      <Post.Root
        key={tweet.id}
        className="block hover:bg-transparent cursor-default p-4 border-none"
      >
        <div className="flex items-start gap-4">
          <Post.Image
            userName={tweet.owner.userName}
            image={tweet.owner.image}
          />
          <Post.Header>
            <Post.Info
              name={tweet.owner.name}
              userName={tweet.owner.userName}
            />
            <Post.Delete
              ownerId={tweet.ownerId}
              queryKey={["tweets"]}
              queryFn={async () =>
                deleteTweet({
                  tweetId: tweet.id,
                  userId: session?.user.id,
                })
              }
              replaceUrl={"/"}
            />
          </Post.Header>
        </div>
        <p className="whitespace-pre mt-4">{tweet.body}</p>
        <div className="mt-8 sm:mt-12 pb-4">
          <time dateTime={String(new Date(tweet.updatedAt))}>
            <PublishedTime date={tweet.updatedAt} />
          </time>
        </div>
        <div
          className="border-t border-slate-500 pt-4"
          onClick={(e) => e.stopPropagation()}
        >
          <LikesList
            tweetId={tweet.id}
            likes={tweet.likes}
          />
        </div>

        <Post.Actions className="flex items-center gap-8 mt-4 justify-center border-y border-slate-500 pt-2">
          <Post.Like
            session={session}
            mutationKey={["tweets"]}
            onLike={async () =>
              likeTweet({
                tweetId: tweet.id,
                userId: session?.user.id,
              })
            }
            onUnlike={async () =>
              unlikeTweet({
                tweetId: tweet.id,
                userId: session?.user.id,
              })
            }
            likes={tweet.likes}
            postId={tweet.id}
          />
        </Post.Actions>
      </Post.Root>
    </>
  );
};

export default HomePost;
