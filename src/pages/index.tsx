import { url } from "inspector";
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
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
        <div className="h-screen w-screen bg-gradient-to-br from-purple-900 to-slate-900">
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
    <div className="absolute bottom-0 flex items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span> {sessionData.user?.name}</span>}
      </p>
      {sessionData?.user.image && (
        <Image
          src={sessionData?.user.image}
          alt="usr pp"
          width={500}
          height={500}
          className="h-10 w-10 rounded-full"
        />
      )}
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
}
