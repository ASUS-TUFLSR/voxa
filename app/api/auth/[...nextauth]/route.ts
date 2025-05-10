import NextAuth, { AuthOptions } from "next-auth";
import Github from "next-auth/providers/github";

const authOptions: AuthOptions = {
    providers: [
        Github({clientId: "", clientSecret: ""}),
    ]
}
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };