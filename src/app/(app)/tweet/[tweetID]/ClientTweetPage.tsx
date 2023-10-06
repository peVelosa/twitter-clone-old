"use client";

import { getComments, getSingleTweet } from "@/libs/api";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import PageTitle from "@/components/PageTitle";
import HomeTweet from "@/components/Post/Tweet/HomeTweet";
import type { FC } from "react";
import type { Session } from "next-auth";
import type { CommentType, SingleTweetType } from "@/types/api";
import Comment from "@/components/Post/Comment/Comment";
import NewComment from "@/components/Post/Comment/NewComment";

type ClientTweetPageProps = {
  initialDataTweet: SingleTweetType;
  session: Session | null;
  initialDataTweetComments: CommentType[];
};

const ClientTweetPage: FC<ClientTweetPageProps> = ({
  initialDataTweet,
  session,
  initialDataTweetComments,
}) => {
  const { data: tweet } = useQuery({
    queryKey: ["tweets", initialDataTweet.id],
    queryFn: ({ signal }) =>
      getSingleTweet({ tweetID: initialDataTweet.id, signal }),
    initialData: initialDataTweet,
  });

  const commnentQueryKey = ["tweets", tweet.id, "comments"];

  const { data: comments } = useInfiniteQuery({
    queryKey: commnentQueryKey,
    queryFn: ({ signal }) =>
      getComments({ tweetID: initialDataTweet.id, signal }),
    initialData: {
      pageParams: [undefined],
      pages: [initialDataTweetComments],
    },
    getNextPageParam: (lastPage, pages) =>
      lastPage[lastPage.length - 1]?.id ?? undefined,
    refetchInterval: 1000 * 30,
  });

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

      {comments?.pages.map((page) =>
        page.map((comment) => (
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
