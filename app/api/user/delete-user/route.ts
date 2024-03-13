import { NextRequest ,NextResponse as res} from "next/server";
import dbConnect from "@/app/_lib/DbActions/connectDb"
export  async function POST(req:NextRequest ){
   const data=await req.json();
    await dbConnect()

    
   

   return res.json({message:"user deleted sucessfully"})
   
   
}