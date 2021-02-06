import { GetStaticProps } from "next";
import React from "react";
import { useQuery } from "react-query";
import { CategoryList } from "../../components/forum/categories/CategoryList";
import { Category } from "../../components/forum/_common/forumTypes";
import AppLayout from "../../components/_common/AppLayout";
import { categoriesApi } from "../api/categories";

export const apiFindAllCategory = async () => {
  const data = await fetch("http://localhost:3000/api/categories");
  return data.json();
};

export const getStaticProps: GetStaticProps = async (context) => {
  const data = await categoriesApi("GET", null, null);
  const categories = JSON.parse(data);
  return {
    props: { categories },
  };
};

export default function Categories({ categories }: { categories: Category[] }) {
  const { data } = useQuery("categories", apiFindAllCategory, { initialData: categories });
  return (
    <AppLayout>
      <CategoryList categories={data}></CategoryList>
    </AppLayout>
  );
}
