import { CommentType, SingleTweetType, TweetType } from "@/types/api";
import axios from "./axios";

export const getAllTweets = async ({
  pageParam = 0,
}): Promise<TweetType[] | []> => {
  const res = await axios.get<TweetType[] | []>(`/tweet?cursor=${pageParam}`);

  if (res.status !== 200) {
    throw new Error("Somethin got wrong getting the tweets");
  }

  return res.data;
};

export const getSingleTweet = async ({
  tweetID,
  signal,
}: {
  tweetID: string | undefined;
  signal?: AbortSignal;
}): Promise<SingleTweetType | undefined> => {
  if (!tweetID) return;

  const res = await axios.get<SingleTweetType>(`/tweet/${tweetID}`, { signal });
  if (res.status !== 200) {
    throw new Error("Somethin got wrong getting the tweets");
  }

  return res.data;
};
export const getComments = async ({
  tweetID,
  signal,
}: {
  tweetID: string | undefined;
  signal?: AbortSignal;
}): Promise<CommentType[] | undefined> => {
  if (!tweetID) return;
  const res = await axios.get<CommentType[]>(`/tweet/${tweetID}/comments`, {
    signal,
  });

  return res.data;
};

/**
 * Like
 * Unlike
 * Comment
 * Delete
 * Tweet
 * Post
 */

type ActionTweetProps = {
  userId: string;
  tweetId: string;
};

export const likeTweet = async ({ tweetId, userId }: ActionTweetProps) => {
  if (tweetId === "prov-id-no-interactivity") return;

  await axios.put(`/tweet/${tweetId}?like=like`, { userId });
};
export const unlikeTweet = async ({ tweetId, userId }: ActionTweetProps) => {
  if (tweetId === "prov-id-no-interactivity") return;
  await axios.put(`/tweet/${tweetId}?like=unlike`, { userId });
};
export const deleteTweet = async ({ tweetId, userId }: ActionTweetProps) => {
  if (tweetId === "prov-id-no-interactivity") return;

  await axios.delete(`/tweet/${tweetId}`, { data: { userId } });
};

type ActionCommentProps = {
  userId: string | undefined;
  tweetId: string | undefined;
  commentId?: string;
};

export const deleteComment = async ({
  tweetId,
  userId,
  commentId,
}: ActionCommentProps) => {
  await axios.delete(`/tweet/${tweetId}/comments/${commentId}`, {
    data: { userId },
  });
};
export const createPost = async ({
  tweetId,
  userId,
  body,
}: ActionCommentProps & { body: string }) => {
  if (!tweetId || !userId || !body) return;
  await axios.post(`/tweet/${tweetId}/comments`, {
    body,
    userId,
  });
};

export const likeComment = async ({
  tweetId,
  userId,
  commentId,
}: ActionCommentProps) => {
  await axios.put(`/tweet/${tweetId}/comments/${commentId}?like=like`, {
    userId,
  });
};
export const unlikeComment = async ({
  tweetId,
  userId,
  commentId,
}: ActionCommentProps) => {
  await axios.put(`/tweet/${tweetId}/comments/${commentId}?like=unlike`, {
    userId,
  });
};
