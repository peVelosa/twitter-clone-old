type UserType = {
  image: string;
  userName: string;
  name: string;
};

export type LikesUnion = { id: string } & UserType;

export type TweetType = {
  id: string;
  body: string;
  ownerId: string;
  owner: UserType;
  updatedAt: Date;
  likes: {
    id: string;
  }[];
  _count: {
    comments: number;
    likes: number;
  };
};

export type SingleTweetType = Omit<TweetType, "likes"> & {
  likes: LikesUnion[];
};

export type CommentType = {
  body: string;
  id: string;
  updatedAt: Date;
  ownerId: string;
  tweetId: string;
  owner: UserType;
  likes: {
    id: string;
  }[];
};
