import { NextRequest, NextResponse as res } from "next/server"; 
import dbConnect from "@/app/_lib/DbActions/connectDb";
import User from "@/app/_lib/DbActions/Models/UserModel";
const bcrypt = require("bcryptjs");

// Export a named export for the POST handler function
export const POST = async function handler(req: NextRequest) {
  const { name, email, password } = await req.json();

  await dbConnect();

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ error: "User already exists" }, { status: 400 });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({ name, email, password: hashedPassword });

    await newUser.save();
    
    return res.json({ userId: newUser._id, email: newUser.email,password:newUser.password }, { status: 200 });
  } catch (error) {
    console.log(error);

    return res.json({ error: "An error occurred" }, { status: 500 });
  }
};
