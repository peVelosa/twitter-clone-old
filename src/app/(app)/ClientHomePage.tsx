"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getAllTweets, deleteTweet } from "@/libs/api";
import { Post } from "@/components/Post";
import { type FC } from "react";
import type { TweetType } from "app/types/api";
import type { Session } from "next-auth";

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
              href={tweet.owner.userName}
              image={tweet.owner.image}
            />
            <Post.Body>
              <Post.Header.Root>
                <Post.Header.Links
                  name={tweet.owner.name}
                  userName={tweet.owner.userName}
                />
                <Post.Header.PublishedAt publishedAt={tweet.updatedAt} />
                <Post.Actions.Delete
                  ownerId={tweet.ownerId}
                  queryFn={() =>
                    deleteTweet({
                      tweetId: tweet.id,
                      userId: session?.user.id,
                    })
                  }
                  queryKey={["tweets"]}
                />
              </Post.Header.Root>
              <Post.Content>{tweet.body}</Post.Content>
              <Post.Actions.Root>
                <Post.Actions.Like
                  mutationKey={["tweets"]}
                  tweetId={tweet.id}
                  userId={session?.user.id}
                  likes={tweet.likes}
                >
                  {tweet._count.likes}
                </Post.Actions.Like>
              </Post.Actions.Root>
            </Post.Body>
          </Post.Root>
        )),
      )}
    </div>
  );
};

export default ClientHomePage;
