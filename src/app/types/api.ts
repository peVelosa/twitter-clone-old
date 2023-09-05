export type TweetType = {
  id: string;
  body: string;
  ownerId: string;
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
