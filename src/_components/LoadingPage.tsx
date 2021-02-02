import { Spin } from "antd";
import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { gray_1, green_1 } from "../config/stylesConfig";

const LoadingDiv = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background-color: ${gray_1};
`;

export const LoadingPage = () => {
  return (
    <LoadingDiv>
      <Spin indicator={<LoadingOutlined style={{ fontSize: 36, color: green_1 }} spin />} />
    </LoadingDiv>
  );
};
