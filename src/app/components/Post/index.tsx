import { PostActions } from "./PostActions";
import PostBody from "./Wrapper/PostBody";
import PostContent from "./Wrapper/PostContent";
import { PostHeader } from "./PostHeader";
import PostProfileImage from "./Wrapper/PostProfileImage";
import PostRoot from "./Wrapper/PostRoot";

export const Post = {
  Root: PostRoot,
  Body: PostBody,
  Content: PostContent,
  Image: PostProfileImage,
  Header: PostHeader,
  Actions: PostActions,
};
