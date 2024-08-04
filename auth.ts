import NextAuth from "next-auth";
import type { NextAuthConfig } from "next-auth";

import GitHub from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

import connectDB from "@/config/database";
import User from "@/models/User";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
    }),
  ],

  callbacks: {
    async signIn({ user, profile }) {
      await connectDB();
      // grab the submitted email address
      const userExists = await User.findOne({ email: user.email });
      // if the user does not exist, create a new user
      if (!userExists && profile) {
        try {
          const username =
            profile.name?.slice(0, 10) || user.name?.slice(0, 10) || "";

          await User.create({
            email: user.email,
            username,
            image: profile.picture || user.image,
          });
        } catch (error) {
          console.error(error);
        }
      }
      // return true to allow sign in
      return true;
    },

    async session({ session }) {
      // find the user in the database
      const user = await User.findOne({ email: session.user.email });
      // if the user is found, attach the user id to the session
      if (user) {
        session.user.id = user._id.toString();
      }
      // return the session
      return session;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);
