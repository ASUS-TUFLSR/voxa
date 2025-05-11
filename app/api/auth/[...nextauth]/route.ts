import NextAuth, { AuthOptions } from "next-auth";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

const authOptions: AuthOptions = {
    providers: [
        Github({clientId: "", clientSecret: ""}),
        Google({clientId: "", clientSecret: ""}),
        Credentials({
            name:"credentials",
            credentials:{
                email: {type: "text"},
                password: {type: "password"}
            },
            authorize(credentials, req) {
                if(!credentials || !credentials.email || !credentials.password) {
                    return null;
                }
                // try {
                    
                // } catch (error) {
                    
                // }
            },
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
}
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };