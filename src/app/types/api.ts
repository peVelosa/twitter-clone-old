export type TweetType = {
  id: string;
  body: string;
  ownerId: string;
  owner: {
    userName: string;
    name: string;
    image: string;
  };
  updatedAt: Date;
  likes: {
    id: string;
  }[];
  _count: {
    comments: number;
    likes: number;
  };
};

export type CommentType = {
  body: string;
  id: string;
  updatedAt: Date;
  ownerId: string;
  tweetId: string;
  owner: {
    image: string;
    name: string;
    userName: string;
  };
  likes: {
    id: string;
  }[];
};
