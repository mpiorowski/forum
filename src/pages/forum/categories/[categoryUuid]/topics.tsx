import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import React from "react";
import { Topic } from "../../../../components/forum/_common/forumTypes";
import AppLayout from "../../../../components/_common/AppLayout";
import { apiRequest } from "../../../../_common/apiRequest";

export const apiFindAllCategory = () => {
  return apiRequest<Topic[]>({
    url: "http://localhost:3000/api/categories",
    method: "GET",
  });
};

// This function gets called at build time
export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const res = await fetch('http://localhost:3000/api/categories')
  const posts = await res.json()

  // Get the paths we want to pre-render based on posts
  const paths = posts.map((post) => ({
    params: { id: post.id },
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}

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

export const Topics = () => {
  const router = useRouter();
  const { categoryUuid } = router.query;
  return (
    <AppLayout>
      <div>Topics</div>
      <div>{categoryUuid}</div>
    </AppLayout>
  );
};

export default Topics;
