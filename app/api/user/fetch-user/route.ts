import { NextRequest ,NextResponse as res} from "next/server";
import dbConnect from "@/app/_lib/DbActions/connectDb"
import User from "@/app/_lib/DbActions/Models/UserModel";
export  async function POST(req:NextRequest ){
    
   const {email}=await req.json();
   console.log("thil is email:",email);
   
    await dbConnect()
    const user = await User.findOne({email})
    if(!user){
        res.json({error:"user not found"},{status:400})
    }
    
   return res.json({user},{status:200})
   
   
}