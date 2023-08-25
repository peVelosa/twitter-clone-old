"use client";

import axios from "@/libs/axios";
import { useQuery } from "@tanstack/react-query";
import { useSession, signIn, signOut } from "next-auth/react";
export default function ServerHomePage() {
  const { data: session } = useSession();
  const { data: teste, refetch } = useQuery({
    queryKey: ["teste"],
    queryFn: async () => (await axios.get("")).data,
  });
  console.log(teste);
  if (session) {
    return (
      <>
        <button onClick={() => refetch()}>refetch</button>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      <button onClick={() => refetch()}>refetch</button>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}
