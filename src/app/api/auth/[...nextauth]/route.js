import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import NextAuth from "next-auth";
import mongoose from "mongoose";
import {User} from "@/models/User";
import bcrypt from "bcrypt";

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: {label: "Email", type: "email", placeholder: "test@test.com"},
        password: {label: "Password", type: "password"}
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const email = credentials?.email;
        const password = credentials?.password;

        // Connect to database
        await mongoose.connect(process.env.MONGO_URI)
        // Find user
        const user = await User.findOne({email})
        // Check if user exists
        if (!user) {
          throw new Error("No user registered with such email");
        }
        // Check password
        const passwordOk = user && bcrypt.compareSync(password, user.password)

        if (!passwordOk && user) {
          throw new Error("Wrong password");
        }

        return user;
      }
    })
  ]

})

export {handler as GET, handler as POST}