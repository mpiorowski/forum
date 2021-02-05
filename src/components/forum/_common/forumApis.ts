import { apiRequest } from "../../../_common/apiRequest";
import { Category, Topic } from "./forumTypes";

export const apiFindCategoryByUuid = (categoryUuid: string | string[]) => {
  return apiRequest<Category>({
    url: "http://localhost:3000/api/categories/" + categoryUuid,
    method: "GET",
  });
};

export const apiFindAllTopics = (categoryUuid: string | string[]) => {
  return apiRequest<Topic[]>({
    url: "http://localhost:3000/api/categories/" + categoryUuid + "/topics",
    method: "GET",
  });
};
