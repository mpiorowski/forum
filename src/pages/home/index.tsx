import { signOut } from "next-auth/client";
import React from "react";
import AppLayout from "../AppLayout";

export default function Home() {
  return (
    <AppLayout>
      <div>HOME</div>
      <div><button onClick={() => signOut()}>Sign out</button></div>
    </AppLayout>
  );
}
