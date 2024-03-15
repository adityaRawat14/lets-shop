import { NextRequest, NextResponse as res } from "next/server"; 
import dbConnect from "@/app/_lib/DbActions/connectDb";
import User from "@/app/_lib/DbActions/Models/UserModel";
const bcrypt = require("bcryptjs");

// Export a named export for the POST handler function
export const GET = async function handler(req: NextRequest) {
const url=new URL(req.url)
const userId=url.searchParams.get('userId')
  await dbConnect();

  try {
   
    const cartData=await User.findById(userId).populate('Cart')
    if(!cartData){
        return res.json({error:"Cart is Empty"},{status:400})
    }

    return res.json({cartData})

  } catch (error) {
    console.log(error);

    return res.json({ error: "An error occurred" }, { status: 500 });
  }
};
