import { Breadcrumb, Layout, Menu } from "antd";
import { signIn, useSession } from "next-auth/client";
import Link from "next/link";
import React, { ReactElement } from "react";
import { useRouter } from "next/router";

type Props = {
  children?: ReactElement | ReactElement[];
};

export default function AppLayout({ children }: Props) {
  const [session, loading] = useSession();
  const router = useRouter();

  if (loading) {
    return <div>LOADING</div>;
  }
  if (!session) {
    router.push('/login');
  }
  return (
    <Layout className="layout">
      <Layout.Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
          <Menu.Item key="1">
            <Link href="/home">home</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link href="/forum">forum</Link>
          </Menu.Item>
          <Menu.Item key="/">
            <Link href="/">main</Link>
          </Menu.Item>
        </Menu>
      </Layout.Header>
      <Layout.Content style={{ padding: "0 50px" }}>
        {/* div  Signed in as {session.user.email} <br /> */}
        {/* <button onClick={() => signOut()}>Sign out</button> */}
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
