import NextAuth, { AuthOptions } from "next-auth";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { connectDB } from "@/lib/helpers";
import bcrypt from "bcrypt";
import prisma from "@/prisma";

export const authOptions: AuthOptions = {
  providers: [
    Github({ clientId: "", clientSecret: "" }),
    Google({ clientId: "", clientSecret: "" }),
    Credentials({
      name: "credentials",
      credentials: {
        email: { type: "text" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          await connectDB();
          const user = await prisma.user.findFirst({
            where: { email: credentials.email },
          });

          if (!user || !user.password) return null;

          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isPasswordCorrect) return null;

          return {
            id: user.id,
            name: user.name ?? user.email,
            email: user.email,
          };
        } catch (error) {
          console.error("Authorize error:", error);
          return null; // ✅ Important: Do NOT return error object
        } finally {
          await prisma.$disconnect();
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
