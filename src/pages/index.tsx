import { signOut, useSession } from "next-auth/client";
import React from "react";
import AppLayout from "./AppLayout";

export default function Page() {
  const [session, loading] = useSession();

  if (loading) {
    return <div>LOADING</div>;
  }

  return (
    <AppLayout>
      <div>MAIN</div>
      <div><button onClick={() => signOut()}>Sign out</button></div>
    </AppLayout>
  );
}
