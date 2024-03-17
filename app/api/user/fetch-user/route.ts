import { NextRequest ,NextResponse as res} from "next/server";

import { prisma } from "@/app/_lib/utils/prisma";
export  async function POST(req:NextRequest ){
    
   const {email}=await req.json();
   console.log("thil is email:",email);
   
    const user = await prisma.user.findFirst({where:{email}})
    if(!user){
        res.json({error:"user not found"},{status:400})
    }
    
   return res.json({user},{status:200})
   
   
}