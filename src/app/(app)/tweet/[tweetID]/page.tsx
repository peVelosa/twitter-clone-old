import { getComments, getSingleTweet } from "@/libs/api";
import ClientTweetPage from "./ClientTweetPage";
import type { FC } from "react";

import useServerSession from "app/hook/useServerSession";

type ServerTweetPageProps = {
  params: { tweetID: string };
};

const ServerTweetPage: FC<ServerTweetPageProps> = async ({
  params: { tweetID },
}) => {
  const tweet = await getSingleTweet({ tweetID });
  const comments = await getComments({ tweetID });
  const session = await useServerSession();
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
