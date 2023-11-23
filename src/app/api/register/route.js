import mongoose from "mongoose";
import {User} from "@/models/User";

export async function POST(req) {
  try {
    // req.body is a JSON object with the user data
    const body = await req.json();
    // Connect to MongoDB and create the user
    await mongoose.connect(process.env.MONGO_URL);
    // Check if a user with the given email already exists
    const existingUser = await User.findOne({ email: body.email });
    if (existingUser) {
      return Response.json({ error: 'User with such email already exists' }, { status: 400 });
    }
    // Create the user
    const createdUser = await User.create(body);
    // return the created user
    return Response.json(createdUser, { status: 201 })
  } catch (error) {

    // If there is an error, return the error message
    return Response.json({error: error.errors.password.message}, {status: 400});
  }
}