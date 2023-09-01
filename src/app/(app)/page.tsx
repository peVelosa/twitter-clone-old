import NewTweet from "@/components/Tweet/NewTweet";
import PageTitle from "@/components/PageTitle";
import { getServerSession } from "next-auth";
import { authOptions } from "app/api/auth/[...nextauth]/route";
import { getAllTweets } from "@/libs/api";
import ClientHomePage from "./ClientHomePage";
import { TweetType } from "@/types/api";

const ServerHomePage = async () => {
  const session = await getServerSession(authOptions);

  const initialTweets = await getAllTweets<TweetType[] | []>();
  return (
    <>
      <PageTitle title="home" />
      <NewTweet
        className={"border-b-[1px] border-slate-500 p-4"}
        session={session}
      />
      <ClientHomePage
        initialData={initialTweets}
        session={session}
      />
    </>
  );
};

export default ServerHomePage;
