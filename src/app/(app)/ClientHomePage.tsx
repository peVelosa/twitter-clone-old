"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import Tweet from "@/components/Tweet/Tweet";
import { deleteTweet, getAllTweets, likeTweet, unlikeTweet } from "@/libs/api";
import { type FC } from "react";
import type { TweetType } from "app/types/api";
import type { Session } from "next-auth";
import PostRoot from "@/components/Post/Wrapper/PostRoot";
import { Post } from "@/components/Post/Wrapper";

type ClientHomePageProps = {
  initialData: TweetType[] | [];
  session: Session | null;
};

const ClientHomePage: FC<ClientHomePageProps> = ({ initialData, session }) => {
  const { data: tweets } = useInfiniteQuery<typeof initialData>({
    queryKey: ["tweets"],
    queryFn: getAllTweets,
    initialData: {
      pageParams: [undefined],
      pages: [initialData],
    },
    getNextPageParam: (lastPage, pages) =>
      lastPage[lastPage.length - 1]?.id ?? undefined,
    refetchInterval: 1000 * 30,
  });

  return (
    <div>
      {tweets?.pages.map((page) =>
        page.map((tweet) => (
          <Post.Root
            href={`/tweet/${tweet.id}`}
            key={tweet.id}
          >
            <Post.Image
              userName={tweet.owner.userName}
              image={tweet.owner.image}
            />
            <div className="w-full">
              <Post.Header>
                <Post.Info
                  name={tweet.owner.name}
                  userName={tweet.owner.userName}
                >
                  <Post.Published publishedAt={tweet.updatedAt} />
                </Post.Info>
                <Post.Delete
                  ownerId={tweet.ownerId}
                  queryKey={["tweets"]}
                  queryFn={async () =>
                    deleteTweet({
                      tweetId: tweet.id,
                      userId: session?.user.id,
                    })
                  }
                />
              </Post.Header>
              <p className="whitespace-pre">{tweet.body}</p>
              <Post.Actions>
                <Post.Like
                  session={session}
                  mutationKey={["tweets"]}
                  onLike={async () =>
                    likeTweet({ tweetId: tweet.id, userId: session?.user.id })
                  }
                  onUnlike={async () =>
                    unlikeTweet({ tweetId: tweet.id, userId: session?.user.id })
                  }
                  isUser={tweet.likes.some(
                    (user) => session?.user.id === user.id,
                  )}
                >
                  {tweet._count.likes}
                </Post.Like>
              </Post.Actions>
            </div>
          </Post.Root>
        )),
      )}
    </div>
  );
};

export default ClientHomePage;
