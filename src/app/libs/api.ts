import { TweetType } from "@/types/api";
import axios from "./axios";

export const getAllTweets = async (): Promise<TweetType[] | []> => {
  const res = await axios.get<TweetType[] | []>("/tweet");

  if (res.status !== 200) {
    throw new Error("Somethin got wrong getting the tweets");
  }

  return res.data;
};

export const deleteTweet = async (id: string) => {
  await axios.delete(`/tweet/${id}`);
};

export const getSingleTweet = async (id: string): Promise<any> => {
  const res = await axios.get<any>(`/tweet/${id}`);

  if (res.status !== 200) {
    throw new Error("Somethin got wrong getting the tweets");
  }

  return res.data;
};
