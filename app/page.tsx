// import { getServerSession } from "next-auth";
// import { authOptions } from "./api/auth/[...nextauth]/route";
"use client";
import { useSession } from 'next-auth/react'

export default function Home() {
  // do not use async on client side 
  // const session = await getServerSession(authOptions);
  // console.log(session); // Checking for session.user.email etc.

  const { data: session, status } = useSession(); 
  
  if (status === "authenticated") {
    console.log(session?.user); // ✅ CORRECT
  
  return (
    <main className='p-4' >
      <div className='text-lg font-semibold' >Welcome, {session?.user?.name || "User"}</div>
      <div>Status: {status}</div>
      <div className='text-sm text-gray-600' >
      Session expires at: {new Date(session.expires).toLocaleString()}
      </div>
    </main>
  );

 }
 return <div className="p-4">You are not signed in.</div>;
}
