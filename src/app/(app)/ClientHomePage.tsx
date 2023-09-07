"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import Tweet from "@/components/Tweet/Tweet";
import { getAllTweets } from "@/libs/api";
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
  });

  return (
    <div>
      {tweets?.pages.map((page) =>
        page.map((tweet) => (
          <Tweet
            key={tweet.id}
            userId={session?.user.id}
            tweet={tweet}
          />
        )),
      )}
    </div>
  );
};

export default ClientHomePage;
