import { prisma } from "@/app/_lib/utils/prisma";
import { NextRequest, NextResponse as res } from "next/server"; 

// Export a named export for the POST handler function
export const GET = async function handler(req: NextRequest) {
const url=new URL(req.url)
const userId=url.searchParams.get('userId')!
  try {
   
    const cartData=await prisma.user.findFirst({
        where:{
          id:userId
        },
        select:{
          cartProducts:{
            select:{
              id:true,
              image:true,
              name:true,
              details:true,
              price:true,
              quantity:true,
              productCategory:true,
              productSubCategory:true
            }
          }
        }
    })



    if(cartData?.cartProducts.length==0){
        return res.json({error:"Cart is Empty"},{status:400})
    }

    return res.json(cartData?.cartProducts)

  } catch (error) {
    console.log(error);

    return res.json({ error: "Server Issue , Please Try Again.." }, { status: 500 });
  }
};
