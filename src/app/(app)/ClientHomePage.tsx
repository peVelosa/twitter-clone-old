"use client";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { deleteTweet, getAllTweets, likeTweet, unlikeTweet } from "@/libs/api";
import { Post } from "@/components/Post";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

import { type FC } from "react";
import type { TweetType } from "app/types/api";
import type { Session } from "next-auth";
import { OptimisticUpdatesDeleteTweet } from "app/helpers/optmisticUpdate/deleteTweet";

type ClientHomePageProps = {
  initialData: TweetType[] | [];
  session: Session | null;
};

const ClientHomePage: FC<ClientHomePageProps> = ({ initialData, session }) => {
  const { ref, inView } = useInView();
  const queryClient = useQueryClient();

  const {
    data: tweets,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<typeof initialData>({
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

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  return (
    <>
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
                    optmisticUpdate={() =>
                      OptimisticUpdatesDeleteTweet({
                        queryClient,
                        queryKey: ["tweets"],
                        id: tweet.id,
                      })
                    }
                  />
                </Post.Header>
                <p className="whitespace-pre">{tweet.body}</p>
                <Post.Actions>
                  <Post.Like
                    session={session}
                    mutationKey={["tweets"]}
                    onLike={async () => {
                      return likeTweet({
                        tweetId: tweet.id,
                        userId: session?.user.id,
                      });
                    }}
                    onUnlike={async () => {
                      return unlikeTweet({
                        tweetId: tweet.id,
                        userId: session?.user.id,
                      });
                    }}
                    likes={tweet.likes}
                    postId={tweet.id}
                  >
                    {tweet.likes.length === 0 ? "" : tweet.likes.length}
                  </Post.Like>
                </Post.Actions>
              </div>
            </Post.Root>
          )),
        )}
      </div>
      <div ref={ref}>{isFetchingNextPage ? "spinner" : ""}</div>
    </>
  );
};

export default ClientHomePage;
