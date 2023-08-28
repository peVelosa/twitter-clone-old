import HomeNewTweet from "@/components/HomeNewTweet";
import PageTitle from "@/components/PageTitle";

const ServerHomePage = () => {
  return (
    <>
      <PageTitle title="home" />
      <HomeNewTweet />
    </>
  );
};

export default ServerHomePage;
