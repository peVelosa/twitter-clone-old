import PostActionsRoot from "../Actions/PostActionsRoot";
import PostLike from "../Actions/PostLike";
import PostDelete from "./PostDelete";
import PostHeader from "./PostHeader";
import PostImage from "./PostImage";
import PostInfo from "./PostInfo";
import PostPublished from "./PostPublished";
import PostRoot from "./PostRoot";

export const Post = {
  Root: PostRoot,
  Image: PostImage,
  Header: PostHeader,
  Delete: PostDelete,
  Actions: PostActionsRoot,
  Like: PostLike,
  Published: PostPublished,
  Info: PostInfo,
};
