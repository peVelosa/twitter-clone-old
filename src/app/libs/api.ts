import { TweetType } from "@/types/api";
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

export const getSingleTweet = async (id: string): Promise<any> => {
  const res = await axios.get<any>(`/tweet/${id}`);

  if (res.status !== 200) {
    throw new Error("Somethin got wrong getting the tweets");
  }

  return res.data;
};

/**
 * Like
 * Unlike
 * Comment
 * Delete
 */

type ActionProps = {
  userId: string;
  tweetId: string;
};

export const likeTweet = async ({ tweetId, userId }: ActionProps) => {
  await axios.put(`/tweet/${tweetId}?like=like`, { userId });
};
export const unlikeTweet = async ({ tweetId, userId }: ActionProps) => {
  await axios.put(`/tweet/${tweetId}?like=unlike`, { userId });
};
export const deleteTweet = async ({ tweetId, userId }: ActionProps) => {
  await axios.delete(`/tweet/${tweetId}`, { data: { userId } });
};
