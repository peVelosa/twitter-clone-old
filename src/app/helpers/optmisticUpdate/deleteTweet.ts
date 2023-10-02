import { TweetType } from "@/types/api";
import { InfiniteData, QueryClient, QueryKey } from "@tanstack/react-query";

type deletePostProps = {
  queryClient: QueryClient;
  queryKey: QueryKey;
  id: string;
};

export async function OptimisticUpdatesDeleteTweet({
  queryClient,
  queryKey,
  id,
}: deletePostProps) {
  await queryClient.cancelQueries({ queryKey: queryKey });

  const previousTweets = queryClient.getQueryData(queryKey);
  queryClient.setQueryData<unknown>(
    queryKey,
    (old: InfiniteData<TweetType[]>) => ({
      ...old,
      pages: old.pages.map((page) => page.filter((tweet) => tweet.id !== id)),
    }),
  );

  return { previousTweets };
}
