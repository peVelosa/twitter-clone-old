import type { FC } from "react";
import useServerSession from "app/hook/useServerSession";

type ServerCommentPageProps = {
  params: { commentID: string };
};

const ServerCommentPage: FC<ServerCommentPageProps> = async ({
  params: { commentID },
}) => {
  const session = await useServerSession();

  return <div>{commentID}</div>;
};

export default ServerCommentPage;
