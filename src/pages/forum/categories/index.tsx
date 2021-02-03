import { GetStaticProps } from "next";
import React from "react";
import { useQuery } from "react-query";
import { CategoryList } from "../../../components/forum/categories/CategoryList";
import { Category } from "../../../components/forum/_common/forumTypes";
import AppLayout from "../../../components/_common/AppLayout";
import { apiRequest } from "../../../_common/apiRequest";

export const apiFindAllCategory = () => {
  return apiRequest<Category[]>({
    url: "http://localhost:3000/api/categories",
    method: "GET",
  });
};

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const categories = await apiFindAllCategory();
    return {
      props: { categories, revalidate: 5 },
    };
  } catch (error) {
    console.log(error.message);
    return {
      props: {},
    };
  }
};

export default function Categories({ categories }: { categories: Category[] }) {
  const { data } = useQuery("categories", apiFindAllCategory, { initialData: categories });
  return (
    <AppLayout>
      <CategoryList categories={data}></CategoryList>
    </AppLayout>
  );
}
