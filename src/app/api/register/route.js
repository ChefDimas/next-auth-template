import mongoose from "mongoose";
import {User} from "@/models/User";

export async function POST(req) {

  await mongoose.connect(process.env.MONGO_URI);
  const body = await req.json();

  try {
    if (body.isOAuthUser) {
      // Handle Google OAuth user
      const user = await User.findOneAndUpdate({email: body.email}, {
        $setOnInsert: {
          isOAuthUser: true,
          email: body.email,
          // Any other fields you need to set
        }
      }, {
        new: true,
        upsert: true, // Creates the user if it doesn't exist
      });
      return Response.json(user, {status: 201});
    } else {
      // Handle regular user
      const existingUser = await User.findOne({email: body.email});
      if (existingUser) {
        return Response.json({error: 'User with such email already exists'}, {status: 400});
      }
      const createdUser = await User.create(body);
      return Response.json(createdUser, {status: 201});
    }
  } catch (error) {
    return Response.json({error: error.message}, {status: 500});
  }
}