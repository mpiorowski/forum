import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import React from "react";
import { TopicsList } from "../../../../components/forum/topics/TopicsList";
import { apiFindAllTopics, apiFindCategoryByUuid } from "../../../../components/forum/_common/forumApis";
import { Category, Topic } from "../../../../components/forum/_common/forumTypes";
import AppLayout from "../../../../components/_common/AppLayout";
import { categoriesApi } from "../../../api/categories";
import { categoryApi } from "../../../api/categories/[categoryUuid]";
import { topicsApi } from "../../../api/categories/[categoryUuid]/topics";

export async function getStaticPaths() {
  const data = await categoriesApi("GET", null, null);
  const categories: Category[] = JSON.parse(data);
  const paths = categories.map((category) => ({
    params: { categoryUuid: category.uuid },
  }));

  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const dataCategory = await categoryApi("GET", { categoryUuid: params.categoryUuid });
  const category = JSON.parse(dataCategory);
  const dataTopics = await topicsApi("GET", { categoryUuid: params.categoryUuid });
  const topics = JSON.parse(dataTopics);
  return { props: { category, topics } };
};

type Props = {
  topics: Topic[];
  category: Category;
};

export const Topics = ({ category, topics }: Props) => {
  const router = useRouter();
  const { categoryUuid } = router.query;

  return (
    <AppLayout>
      <TopicsList topics={topics} category={category}></TopicsList>
    </AppLayout>
  );
};

export default Topics;
