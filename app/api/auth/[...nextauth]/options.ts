import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/db/drizzle";
import CredentialsProvider from "next-auth/providers/credentials";
import { eq } from "drizzle-orm";
import { user } from "@/db/schema";
import type { NextAuthOptions } from "next-auth";


// import { JWT } from "next-auth/jwt";
// import { User } from "next-auth";
// import { Session } from "next-auth";
// import { JWT, User, Session } from "next-auth";

export const options : NextAuthOptions = {
  adapter: DrizzleAdapter(db),

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        identifier: {
          label: "Email",
          type: "text",
          placeholder: "your-email@example.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "your-awesome-password",
        },
      },
      async authorize(credentials) {
        if (!credentials?.identifier || !credentials?.password) {
          return null;
        }

        const foundUser = await db.select({
          userId: user.userId,
          email: user.email,
          password: user.password
        })
        .from(user)
        .where(eq(user.email, credentials.identifier as string))
        .then((res) => res[0]);

        if (foundUser && foundUser.password === credentials.password) {
          return {
            id: foundUser.userId.toString(),
            email: foundUser.email,
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
        if (user) {
          token.id = user.id;
          token.email = user.email;
          token.name = user.name;
        }
        return token;
      },
    async session({ session, token }) {
        if (session.user) { 
            // session.user.id = token.id;
            session.user.email = token.email;
            session.user.name = token.name;
        }
        return session;
    },
  
  },
  session: {
    strategy: "jwt",
    maxAge: 60000,
  },
  jwt: {
    maxAge: 60000
  },
  
};
