import NextAuth, { Account, User as IUser, Session } from "next-auth";
// import credentials from "next-auth/providers/credentials";
import Credentials from "next-auth/providers/credentials";

import bcrypt from "bcryptjs";
import google from "next-auth/providers/google";
import { ErrorResponse } from "../_types/user";
// import { sendWelcome } from "../_utils/sendEmail";
import User from "./models/User";
import { dbConnect } from "./mongodb";
interface ExtendedUser extends IUser {
  userId?: string;
}

interface ExtendedUser extends IUser {
  message: string;
}
export interface ExtendedSession {
  user: {
    userId: string;
    email: string;
  };
}
export const { auth, handlers, signIn, signOut } = NextAuth({
  session: {
    strategy: "jwt", // Use JWT-based sessions
  },
  providers: [
    google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "email", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await dbConnect();
        try {
          console.log("credentials", credentials);
          const user = await User.findOne({
            email: credentials.email,
          }).select("+password");
          console.log(user);
          if (!user) throw new Error("User does not exist, kindly register");
          if (!user.isVerified) throw new Error("User not verified");
          const confirmPass = await bcrypt.compare(
            credentials.password as string,
            user.password
          );
          console.log("pass confirm", confirmPass);
          if (credentials.password !== user.password && !confirmPass)
            throw new Error("Incorrect password");
          console.log(user, "user");
          return {
            email: user.email,
            id: user._id,
          };
        } catch {
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    authorized({ auth }) {
      console.log("Authorization Check:", auth);

      return !!auth?.user;
    },
    async jwt({ token, user }) {
      if (user) token.id = user.id; // Attach user ID to JWT token
      return token;
    },
    async session({ session }: { session: Session }) {
      const user = await User.findOne({ email: session?.user?.email });

      if (session && session.user) {
        (session.user as ExtendedUser).userId = user?._id; // Use optional chaining for user if it's possible user can be null
      }
      return session;
    },

    // async session({ session }: { session: SessionInterface }) {
    //   const guest = await getGuest(session.user.email);
    //   session.user.guestId = guest.id;
    //   return session;
    // },
    // async redirect({ url, baseUrl }) {
    //   // Allows relative callback URLs
    //   if (url.startsWith("/")) return `${baseUrl}${url}`;
    //   // Allows callback URLs on the same origin
    //   else if (new URL(url).origin === baseUrl) return url;
    //   return baseUrl;
    // },

    async signIn({
      // user,
      account,
    }: // credentials,
    {
      user: IUser;
      account: Account | null; // Allow account to be null
      // credentials?: Record<string, any>; // Change to optional and broader type
    }) {
      try {
        // await dbConnect();
        // if ((user as ExtendedUser).message)
        //   throw new Error((user as ExtendedUser).message);

        // Handle Google sign-in
        if (account?.provider === "google") {
          // const f
          // const existingUser = await User.findOne({ email: user.email });
          console.log(account);
          // if (!) {
          // const newUser = await User.create({
          //   email: user.email,
          //   name: user.name,
          //   image: user.image,
          //   authMethod: "oauth",
          //   isVerified: true,
          // });
          // await sendWelcome(newUser);
          // return true;
          // } else {
          return true;
          // }
        }
        return false;
        // Handle credentials sign-in
        // if (account?.provider === "credentials") {
        //   const existingUser = await User.findOne({ email: user.email });
        //   if (!existingUser) {
        //     throw new Error("User does not exist, kindly register");
        //   } else if (!existingUser.isVerified) {
        //     throw new Error("User is not verified, please verify your account");
        //   } else {
        //     return true;
        //   }
        // }
      } catch (error) {
        // Handle errors and return an error message
        const err = error as ErrorResponse;
        return `/auth/error-page?error=${encodeURIComponent(err.message)}`;
      }
    },
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/error-page",
  },
});
