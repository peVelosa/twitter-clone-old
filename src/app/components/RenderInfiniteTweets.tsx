import { TweetType } from "@/types/api";
import Tweet from "./Tweet/Tweet";
import type { FC } from "react";
import type { Session } from "next-auth";
import type { InfiniteData } from "@tanstack/react-query";

type RenderInfiniteTweetsProps = {
  tweets: InfiniteData<[] | TweetType[]> | undefined;
  session: Session | null;
};

const RenderInfiniteTweets: FC<RenderInfiniteTweetsProps> = ({
  tweets,
  session,
}) => {
  return (
    <>
      {tweets?.pages.map((page) =>
        page.map((tweet) => (
          <Tweet
            key={tweet.id}
            userId={session?.user.id}
            tweet={tweet}
          />
        )),
      )}
    </>
  );
};

export default RenderInfiniteTweets;
