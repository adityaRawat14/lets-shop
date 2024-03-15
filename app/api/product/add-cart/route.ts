import { prisma } from "@/app/_lib/utils/prisma";
import { NextRequest, NextResponse as res } from "next/server"; 

export const POST = async function handler(req: NextRequest) {
    const {userEmail,productId,}=await req.json()

  try {
const newUser=await prisma.user.update({ 
where:{
  email:userEmail
},
data:{
 
  cartProductIds:{
    push:productId
  }
}
})

if(newUser){
  res.json({message:"Item Added To Cart sucessfully !!"})
}
  } catch (error) {
    console.log(error);

    return res.json({ error: "An error occurred" }, { status: 500 });
  }
};
