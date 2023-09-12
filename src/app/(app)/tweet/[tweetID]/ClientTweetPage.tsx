"use client";

import { getComments, getSingleTweet } from "@/libs/api";
import { useQuery } from "@tanstack/react-query";
import PageTitle from "@/components/PageTitle";
import Comment from "@/components/Comment/Comment";
import HomeTweet from "@/components/Tweet/HomeTweet/HomeTweet";
import type { FC } from "react";
import type { Session } from "next-auth";
import type { CommentType, SingleTweetType } from "@/types/api";
import NewComment from "@/components/Comment/NewComment";

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
    queryFn: () => getSingleTweet({ tweetID: initialDataTweet.id }),
    initialData: initialDataTweet,
  });
  const { data: comments } = useQuery({
    queryKey: ["tweets", tweet.id, "comments"],
    queryFn: () => getComments({ tweetID: initialDataTweet.id }),
    initialData: initialDataTweetComments,
  });

  return (
    <>
      <PageTitle title="Tweet" />
      <HomeTweet
        tweet={tweet}
        userId={session?.user.id}
      />
      <NewComment
        session={session}
        tweetId={initialDataTweet.id}
      />
      {comments.map((comment) => (
        <Comment
          comment={comment}
          key={comment.id}
        />
      ))}
    </>
  );
};

export default ClientTweetPage;
