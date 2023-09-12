import PostActionsRoot from "./Actions/PostActionsRoot";
import PostLike from "./Actions/PostLike";
import PostDelete from "./Wrapper/PostDelete";
import PostHeader from "./Wrapper/PostHeader";
import PostImage from "./Wrapper/PostImage";
import PostInfo from "./Wrapper/PostInfo";
import PostPublished from "./Wrapper/PostPublished";
import PostRoot from "./Wrapper/PostRoot";

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
