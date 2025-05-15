import NextAuth, { AuthOptions } from "next-auth";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { connectDB } from "@/lib/helpers";
import bcrypt from "bcrypt";
import prisma from "@/prisma";


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
            async authorize(credentials) {
                if(!credentials || !credentials.email || !credentials.password) {
                    return null;
                }
                try {
                    await connectDB();
                    const user = await prisma.user.findFirst({
                        where: { email:credentials.email },
                    });

                    if(!user) {
                        return null;
                    }
                    if(!user.password){
                        return null;
                    }

                    const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
                    
                    if(!isPasswordCorrect) {
                        return null;
                    }
                    return { ...user, id: user.id };
                } catch (error) {
                    return null;
                }finally{
                    await prisma.$disconnect();
                }
            },
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
}
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };