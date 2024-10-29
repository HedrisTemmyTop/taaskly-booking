import NextAuth, { Account, User as IUser, Session } from "next-auth";
import credentials from "next-auth/providers/credentials";
import google from "next-auth/providers/google";

import { createUserWithOauth, getUser } from "./data-service";
interface ExtendedUser extends IUser {
  userId?: string;
}

// interface ExtendedUser extends IUser {
//   message: string;
// }
export interface ExtendedSession {
  user: {
    userId: string;
    email: string;
  };
}
export const { auth, handlers, signIn, signOut } = NextAuth({
  // session: {
  //   strategy: "jwt", // Use JWT-based sessions
  // },
  providers: [
    google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    credentials({
      name: "credentials",
      credentials: {
        email: {},
        password: {},
        id: {},
        name: {},
        image: {},
      },
      authorize(credentials) {
        return {
          email: credentials.email as string,
          id: credentials.id as string,
          name: credentials.name as string,
          image: credentials.image as string,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  // trustHost: (process.env.NODE_ENV === "development"
  //   ? true
  //   : ["devhedris-taaskly-booking.vercel.app"]) as boolean,
  // adapter: MongoDBAdapter(clientPromise),

  callbacks: {
    authorized({ auth }) {
      return !!auth?.user;
    },

    async session({ session }: { session: Session }) {
      // await dbConnect();
      const user = await getUser(session?.user?.email as string);

      if (session && session.user) {
        (session.user as ExtendedUser).userId = user?.id; // Use optional chaining for user if it's possible user can be null
        session.user.image = user?.image; // Use optional chaining for user if it's possible user can be null
      }
      return session;
    },

    async signIn({
      user,
      account,
    }: // credentials,
    {
      user: IUser;
      account: Account | null; // Allow account to be null
      // credentials?: Record<string, any>; // Change to optional and broader type
    }) {
      try {
        // await dbConnect();
        if (account?.provider === "google") {
          //   // const f
          const existingUser = await getUser(user.email as string);
          if (!existingUser) {
            await createUserWithOauth({
              email: user.email,
              name: user.name,
              image: user.image,
              authMethod: "oauth",
              isVerified: true,
            });
          } else if (existingUser.authMethod !== "oauth")
            return "/auth/login?error=Email%20already%20exist";
          // await fetch("/api/send-mail", existingUser);
          return true;
        }

        // Handle credentials sign-in
        if (account?.provider === "credentials") {
          return true;
        }
        return false;
      } catch (error) {
        console.error("SignIn Error:", error);
        return false;
      }
    },
  },
  pages: {
    signIn: "/auth/login",
    // error: "/auth/error-page",
  },
});
