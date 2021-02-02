import React from "react";
import { apiRequest } from "../../_common/apiRequest";
import AppLayout from "../_appLayout";

export const apiFindAllCategory = () => {
  return apiRequest<any>({
    url: "/api/category",
    method: "GET",
  });
};

export default function Forum() {
  const find = async () => {
    try {
      const res = await apiFindAllCategory();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <AppLayout>
      <div>Forum</div>
      <button onClick={find}>FIND</button>
    </AppLayout>
  );
}
