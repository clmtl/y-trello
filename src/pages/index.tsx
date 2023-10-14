import { url } from "inspector";
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Kanban from "~/components/Kanban";
import { AiOutlineLogout } from "react-icons/ai";

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
    <div className="absolute right-2 top-2 flex items-center justify-center gap-2">
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
        className="font-semibol flex h-10 w-10 items-center justify-center rounded-full bg-white/70 py-3 no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? (
          <AiOutlineLogout className="text-2xl text-black" />
        ) : (
          "Sign in"
        )}
      </button>
    </div>
  );
}
