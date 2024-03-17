import { prisma } from "@/app/_lib/utils/prisma";
import { NextRequest ,NextResponse as res} from "next/server";
export  async function POST(req:NextRequest ){
    const {code,amount}=await req.json()
    try {
        const newCode=await prisma.promocode.create({
            data:{
                code,amount
            }
        })
        if( newCode){
            return res.json({message:"promocode sucessfully issued"},{status:200})
        }
        return res.json({error:"error try again.."})
    
    } catch (error) {
        return res.json({error:"error: try again"})
    }

}