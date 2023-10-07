"use client";

import { getAllTweets, getComments, getSingleTweet } from "@/libs/api";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import PageTitle from "@/components/PageTitle";
import HomeTweet from "@/components/Post/Tweet/HomeTweet";
import Comment from "@/components/Post/Comment/Comment";
import NewComment from "@/components/Post/Comment/NewComment";
import type { FC } from "react";
import type { Session } from "next-auth";
import type { CommentType, SingleTweetType } from "@/types/api";

type ClientTweetPageProps = {
  initialDataTweet: SingleTweetType;
  initialDataTweetComments: CommentType[] | undefined;
  session: Session | null;
};

const ClientTweetPage: FC<ClientTweetPageProps> = ({
  initialDataTweet,
  session,
  initialDataTweetComments,
}) => {
  const {} = useInfiniteQuery({
    queryKey: ["tweets"],
    queryFn: getAllTweets,
  });

  const { data: tweet } = useQuery({
    queryKey: ["tweets", initialDataTweet.id],
    queryFn: ({ signal }) =>
      getSingleTweet({ tweetID: initialDataTweet.id, signal }),
    initialData: initialDataTweet,
  });

  const commnentQueryKey = ["tweets", tweet?.id, "comments"];

  const { data: comments } = useInfiniteQuery({
    queryKey: commnentQueryKey,
    queryFn: ({ signal }) =>
      getComments({ tweetID: initialDataTweet?.id, signal }),
    initialData: {
      pageParams: [undefined],
      pages: [initialDataTweetComments],
    },
    getNextPageParam: (lastPage, pages) => {
      if (!lastPage) return undefined;
      return lastPage[lastPage.length - 1]?.id ?? undefined;
    },
    refetchInterval: 1000 * 30,
  });

  if (!tweet) {
    throw new Error("This tweet has been deletet");
  }

  return (
    <>
      <PageTitle title="Tweet" />
      <HomeTweet
        data={tweet}
        queryKey={["tweets", initialDataTweet.id]}
      />
      <NewComment
        session={session}
        tweetId={initialDataTweet.id}
      />

      {comments?.pages.map(
        (page) =>
          page?.map((comment) => (
            <Comment
              key={comment.id}
              data={comment}
              queryKey={commnentQueryKey}
              userId={session?.user.id}
            />
          )),
      )}
    </>
  );
};

export default ClientTweetPage;
