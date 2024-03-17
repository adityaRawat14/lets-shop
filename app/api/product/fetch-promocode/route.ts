import { prisma } from "@/app/_lib/utils/prisma";
import { NextRequest ,NextResponse as res} from "next/server";
export  async function POST(req:NextRequest ){
    const url=new URL(req.url)
    const code=url.searchParams.get('code')!
    try {
      const promocode=await prisma.promocode.findFirst({
        where:{
            code
        }
      })
      const data= promocode;


        if(data){
            if(data.quantity==1){
                // delete promocode
                const deletedPromocode=await prisma.promocode.delete({
                    where:{
                        id:data.id
                    }
                })
                if(deletedPromocode){
                    return res.json(promocode,{status:200})

                }
            }else{
                // reduce one
                const reducedPromocode=await prisma.promocode.update({
                    where:{
                        id:data.id
                    },
                    data:{
                        quantity:{
                            decrement:1
                        }
                    }
                })
                if(reducedPromocode){
                    return res.json(promocode,{status:200})
                }
            }
        }
        return res.json({error:"error try again.."})
    
    } catch (error) {
        return res.json({error:"error: try again"})
    }
}