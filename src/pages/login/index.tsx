import { signIn, useSession } from "next-auth/client";
import Router from "next/router";
import React from "react";
import { LoadingPage } from "../../_components/LoadingPage";

export default function Login() {
  const [session, loading] = useSession();
  // const router = useRouter();
  if (loading) {
    return <LoadingPage></LoadingPage>;
  }
  if (session) {
    Router.push("/home");
    return <LoadingPage></LoadingPage>;
  }
  return (
    <div>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </div>
  );
}
