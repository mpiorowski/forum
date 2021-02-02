import { signOut, useSession } from "next-auth/client";
import React from "react";
import AppLayout from "./_appLayout";

export default function Page() {
  return <AppLayout></AppLayout>;
}
