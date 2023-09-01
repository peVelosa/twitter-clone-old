"use client";
import { useQuery } from "@tanstack/react-query";
import Tweet from "@/components/Tweet/Tweet";
import { getAllTweets } from "@/libs/api";
import { useEffect, type FC } from "react";
import { useRouter } from "next/navigation";
import type { TweetType } from "app/types/api";
import type { Session } from "next-auth";

type ClientHomePageProps = {
  initialData: TweetType[];
  session: Session | null;
};

const ClientHomePage: FC<ClientHomePageProps> = ({ initialData, session }) => {
  const { data } = useQuery<typeof initialData>({
    queryKey: ["tweets"],
    queryFn: async () => {
      return await getAllTweets<TweetType[] | []>();
    },
    initialData: initialData,
  });

  return (
    <div>
      {data?.map((tweet) => (
        <Tweet
          key={tweet.id}
          userId={session?.user.id}
          tweet={tweet}
        />
      ))}
    </div>
  );
};

export default ClientHomePage;
