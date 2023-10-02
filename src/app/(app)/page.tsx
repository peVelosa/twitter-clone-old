import NewTweet from "@/components/Tweet/NewTweet";
import PageTitle from "@/components/PageTitle";
import { getAllTweets } from "@/libs/api";
import ClientHomePage from "./ClientHomePage";
import useServerSession from "app/hook/useServerSession";

const ServerHomePage = async () => {
  const session = await useServerSession();

  const initialTweets = await getAllTweets({ pageParam: 0 });
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
