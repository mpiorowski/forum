import { apiRequest } from "../../../_common/apiRequest";
import { Category, Post, Topic } from "./forumTypes";

export const apiFindCategoryByUid = (categoryUid: string | string[]) => {
  return apiRequest<Category>({
    url: "http://localhost:3000/api/categories/" + categoryUid,
    method: "GET",
  });
};

export const apiFindAllTopics = (categoryUid: string | string[]) => {
  return apiRequest<Topic[]>({
    url: "http://localhost:3000/api/categories/" + categoryUid + "/topics",
    method: "GET",
  });
};

export const apiFindAllPosts = (categoryUid: string | string[], topicUid: string | string[]) => {
  return apiRequest<Post[]>({
    url: "http://localhost:3000/api/categories/" + categoryUid + "/topics/" + topicUid + "/posts",
    method: "GET",
  });
};
