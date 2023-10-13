import { url } from "inspector";
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import Kanban from "~/components/Kanban";

import { api } from "~/utils/api";

export default function Home() {
  return (
    <>
      <Head>
        <title>Y-Trello</title>
        <meta
          name="Y-Trello"
          content="Y-Trello pour faciliter vos gestions de taches"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="">
        <div className="h-screen w-screen bg-red-700">
          <Kanban />
          <AuthShowcase />
        </div>
      </main>
    </>
  );
}

function AuthShowcase() {
  const { data: sessionData } = useSession();

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
}
