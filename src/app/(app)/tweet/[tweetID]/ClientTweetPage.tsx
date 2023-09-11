"use client";

import { getComments, getSingleTweet } from "@/libs/api";
import { useQuery } from "@tanstack/react-query";
import Tweet from "@/components/Tweet/Tweet";
import PageTitle from "@/components/PageTitle";
import Comment from "@/components/Comment/Comment";
import type { FC } from "react";
import type { Session } from "next-auth";
import type { CommentType, TweetType } from "@/types/api";

type ClientTweetPageProps = {
  initialDataTweet: TweetType;
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
      <Tweet
        tweet={tweet}
        userId={session?.user.id}
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
