import { signIn, useSession } from "next-auth/client";
import Router from "next/router";
import React from "react";

export default function Login() {
  const [session, loading] = useSession();
  // const router = useRouter();
  if (loading) {
    return <div>LOADING</div>;
  }
  if (session) {
    Router.push("/home");
  }
  return (
    <div>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </div>
  );
}
