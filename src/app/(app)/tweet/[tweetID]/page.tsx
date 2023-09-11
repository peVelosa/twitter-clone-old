import { getComments, getSingleTweet } from "@/libs/api";
import ClientTweetPage from "./ClientTweetPage";
import type { FC } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "app/api/auth/[...nextauth]/route";

type ServerTweetPageProps = {
  params: { tweetID: string };
};

const ServerTweetPage: FC<ServerTweetPageProps> = async ({
  params: { tweetID },
}) => {
  const tweet = await getSingleTweet({ tweetID });
  const comments = await getComments({ tweetID });
  const session = await getServerSession(authOptions);
  return (
    <div>
      <ClientTweetPage
        initialDataTweet={tweet}
        initialDataTweetComments={comments}
        session={session}
      />
    </div>
  );
};

export default ServerTweetPage;
