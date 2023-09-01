import axios from "./axios";

export const getAllTweets = async <T>(): Promise<T> => {
  return (await axios.get<T>("/tweet")).data;
};
