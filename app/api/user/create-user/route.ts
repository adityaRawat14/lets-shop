import { NextRequest, NextResponse as res } from "next/server"; 
import {prisma} from '@/app/_lib/utils/prisma'
const bcrypt = require("bcryptjs");

export const POST = async function handler(req: NextRequest) {
  const { name, email, password } = await req.json();

  try {
    const existingUser = await prisma.user.findFirst({
      where:{
        email
      }
    })
    if (existingUser) {
      return res.json({ error: "User already exists" }, { status: 400 });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await prisma.user.create({
      data:{
        name,email,password:hashedPassword
      }
    });

    
    return res.json({ userId: newUser.id, email: newUser.email,password:newUser.password }, { status: 200 });
  } catch (error) {
    console.log(error);

    return res.json({ error: "An error occurred" }, { status: 500 });
  }
};