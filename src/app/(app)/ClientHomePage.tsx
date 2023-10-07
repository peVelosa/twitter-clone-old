"use client";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { getAllTweets } from "@/libs/api";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

import { type FC } from "react";
import type { TweetType } from "app/types/api";
import type { Session } from "next-auth";
import Tweet from "@/components/Post/Tweet/Tweet";

type ClientHomePageProps = {
  initialData: TweetType[] | [];
  session: Session | null;
};

const ClientHomePage: FC<ClientHomePageProps> = ({ initialData, session }) => {
  const { ref, inView } = useInView();
  const queryKey = ["tweets"];

  const {
    data: tweets,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<typeof initialData>({
    queryKey: queryKey,
    queryFn: getAllTweets,
    initialData: {
      pageParams: [undefined],
      pages: [initialData],
    },
    getNextPageParam: (lastPage, pages) =>
      lastPage[lastPage.length - 1]?.id ?? undefined,
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
            <Tweet
              key={tweet.id}
              data={tweet}
              queryKey={queryKey}
              userId={session?.user.id}
            />
          )),
        )}
      </div>
      <div ref={ref}>{isFetchingNextPage ? "spinner" : ""}</div>
    </>
  );
};

export default ClientHomePage;
