"use client";

import {
  deleteComment,
  getComments,
  getSingleTweet,
  likeComment,
  unlikeComment,
} from "@/libs/api";
import { useQuery } from "@tanstack/react-query";
import PageTitle from "@/components/PageTitle";
import NewComment from "@/components/Comment/NewComment";
import { Post } from "@/components/Post";
import HomePost from "@/components/Post/HomePost";
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
      <HomePost
        session={session}
        tweet={tweet}
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
            userName={comment.owner.userName}
            image={comment.owner.image}
          />
          <div className="w-full">
            <Post.Header>
              <Post.Info
                name={comment.owner.name}
                userName={comment.owner.userName}
              >
                <Post.Published publishedAt={comment.updatedAt} />
              </Post.Info>
              <Post.Delete
                ownerId={comment.ownerId}
                queryKey={["tweets"]}
                queryFn={async () =>
                  deleteComment({
                    tweetId: tweet.id,
                    userId: session?.user.id,
                    commentId: comment.id,
                  })
                }
              />
            </Post.Header>
            <p className="whitespace-pre">{comment.body}</p>
            <Post.Actions>
              <Post.Like
                session={session}
                mutationKey={["tweets"]}
                onLike={async () =>
                  likeComment({
                    tweetId: tweet.id,
                    userId: session?.user.id,
                    commentId: comment.id,
                  })
                }
                onUnlike={async () =>
                  unlikeComment({
                    tweetId: tweet.id,
                    userId: session?.user.id,
                    commentId: comment.id,
                  })
                }
                likes={comment.likes}
                postId={comment.id}
              >
                {comment.likes.length === 0 ? "" : comment.likes.length}
              </Post.Like>
            </Post.Actions>
          </div>
        </Post.Root>
      ))}
    </>
  );
};

export default ClientTweetPage;
