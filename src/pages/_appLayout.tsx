import { Breadcrumb, Layout, Menu } from "antd";
import { signIn, useSession } from "next-auth/client";
import Link from "next/link";
import React, { ReactElement } from "react";
import { useRouter } from "next/router";
import { LoadingPage } from "../_components/LoadingPage";

type Props = {
  children?: ReactElement | ReactElement[];
};

export default function AppLayout({ children }: Props) {
  const [session, loading] = useSession();
  const router = useRouter();

  if (loading) {
    return <LoadingPage></LoadingPage>;
  }
  if (!session) {
    router.push("/api/auth/signin");
    return <LoadingPage></LoadingPage>;
  }
  return (
    <Layout className="layout">
      <Layout.Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" selectedKeys={[router.pathname]}>
          <Menu.Item key="/home">
            <Link href="/home">home</Link>
          </Menu.Item>
          <Menu.Item key="/forum/categories">
            <Link href="/forum/categories">forum</Link>
          </Menu.Item>
        </Menu>
      </Layout.Header>
      <Layout.Content style={{ padding: "0 50px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-content">{children}</div>
      </Layout.Content>
      <Layout.Footer style={{ textAlign: "center" }}>Ant Design ©2018 Created by Ant UED</Layout.Footer>
    </Layout>
  );
}
