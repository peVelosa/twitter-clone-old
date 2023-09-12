"use client";

import { deleteComment, getComments, getSingleTweet } from "@/libs/api";
import { useQuery } from "@tanstack/react-query";
import PageTitle from "@/components/PageTitle";
import HomeTweet from "@/components/Tweet/HomeTweet/HomeTweet";
import NewComment from "@/components/Comment/NewComment";
import { Post } from "@/components/Post";
import type { FC } from "react";
import type { Session } from "next-auth";
import type { CommentType, SingleTweetType } from "@/types/api";

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
        <Post.Root
          href={`/comment/${comment.id}`}
          key={comment.id}
        >
          <Post.Image
            href={comment.owner.userName}
            image={comment.owner.image}
          />
          <Post.Body>
            <Post.Header.Root>
              <Post.Header.Links
                name={comment.owner.name}
                userName={comment.owner.userName}
              />
              <Post.Header.PublishedAt publishedAt={comment.updatedAt} />
              <Post.Actions.Delete
                ownerId={comment.ownerId}
                queryFn={() =>
                  deleteComment({
                    tweetId: tweet.id,
                    userId: session?.user.id,
                    commentId: comment.id,
                  })
                }
                queryKey={["tweets"]}
              />
            </Post.Header.Root>
            <Post.Content>{comment.body}</Post.Content>
            <Post.Actions.Root>
              <Post.Actions.Like
                mutationKey={["tweets"]}
                tweetId={tweet.id}
                userId={session?.user.id}
                likes={comment.likes}
                commentId={comment.id}
              >
                {comment.likes.length}
              </Post.Actions.Like>
            </Post.Actions.Root>
          </Post.Body>
        </Post.Root>
      ))}
    </>
  );
};

export default ClientTweetPage;
