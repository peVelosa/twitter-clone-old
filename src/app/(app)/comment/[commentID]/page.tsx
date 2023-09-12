import type { FC } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "app/api/auth/[...nextauth]/route";

type ServerCommentPageProps = {
  params: { commentID: string };
};

const ServerCommentPage: FC<ServerCommentPageProps> = async ({
  params: { commentID },
}) => {
  const session = await getServerSession(authOptions);
  return <div>{commentID}</div>;
};

export default ServerCommentPage;
