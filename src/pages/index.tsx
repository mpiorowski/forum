import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { LoadingPage } from "../components/_common/LoadingPage";

export default function Main() {
  // auto move to another page
  const router = useRouter();
  useEffect(() => {
    router.push("/forum/categories");
  }, [router]);
  return <LoadingPage></LoadingPage>;
}
