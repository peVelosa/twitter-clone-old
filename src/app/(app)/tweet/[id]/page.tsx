import type { FC } from "react";

type ServerTweetPageProps = {
  params: { id: string };
};

const ServerTweetPage: FC<ServerTweetPageProps> = ({ params: { id } }) => {
  return <div>oioi {id}</div>;
};

export default ServerTweetPage;
