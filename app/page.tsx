import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log(session); // Checking for session.user.email etc.

  return (
    <main>
      <div>Welcome, {session?.user?.email ?? "Guest"}</div>
    </main>
  );
}
