import { getComments, getSingleTweet } from "@/libs/api";
import ClientTweetPage from "./ClientTweetPage";
import type { FC } from "react";

import useServerSession from "app/hook/useServerSession";
import { redirect } from "next/navigation";

type ServerTweetPageProps = {
  params: { tweetID: string };
};

const ServerTweetPage: FC<ServerTweetPageProps> = async ({
  params: { tweetID },
}) => {
  const controller = new AbortController();

  const tweet = await getSingleTweet({ tweetID, signal: controller.signal });
  const comments = await getComments({ tweetID, signal: controller.signal });
  const session = await useServerSession();

  if (!tweet) {
    redirect("/");
  }

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
