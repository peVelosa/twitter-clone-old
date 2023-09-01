export type TweetType = {
  id: string;
  body: string;
  ownerId: string;
  comments: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    body: string;
    ownerId: string;
    tweetId: string;
  }[];
  owner: {
    userName: string;
    name: string;
    image: string;
  };
  likes: {
    id: string;
  }[];
  _count: {
    comments: number;
    likes: number;
  };
};
