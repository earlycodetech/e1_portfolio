import { FirestoreAdapter } from "@auth/firebase-adapter";
import { cert } from "firebase-admin/app";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT,
      clientSecret: process.env.GOOGLE_SECRET,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          address: null,
          dob: null,
          phoneNumber: null,
          role: "user",
        };
      },
    }),
  ],

  pages: {
    signIn: "/signin",
  },
  adapter: FirestoreAdapter({
    credential: cert({
      projectId: process.env.AUTH_FIREBASE_PROJECT_ID,
      clientEmail: process.env.AUTH_FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.AUTH_FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    }),
  }),

  callbacks: {
    async session({ session, user, token }) {
      
      return {
        ...session,
        ...user
      }
    },
  }
  
};
