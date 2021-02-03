export type Category = {
  id?: string;
  uuid?: string;
  title: string;
  description?: string;
  icon?: string;
  userid?: string;
  latestTopicUid?: string;
  topicsNumber?: number;
  postsNumber?: number;
  latestPostDate?: string;
  latestPostUid?: string;
  latestTopic?: string;
};

export type Topic = {
  id?: string;
  uuid?: string;
  title: string;
  description?: string;
  views: string;
  categoryid: string;
  userid: string;
};
