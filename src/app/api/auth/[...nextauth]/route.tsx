import NextAuth from "next-auth";
import prisma, { db } from "@/lib/db";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        username: { label: "Username", type: "text" },
      },
      async authorize(credentials) {
        // Check if email and password are there

        if (!credentials || !credentials.email || !credentials.password) {
          throw new Error("Please enter your email and password.");
        }

        // check if user exists
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        // If no user was found
        if (!user || !user?.password) {
          throw new Error("No user found with that email.");
        }

        // Check if password is correct
        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );

        // If password is incorrect
        if (!passwordMatch) {
          throw new Error("Incorrect password.");
        }

        return {
          ...user,
          id: user.id.toString(),
        };
      },
    }),
  ],

  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt" as "jwt",
  },
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
