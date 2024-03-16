import { prisma } from "@/app/_lib/utils/prisma";
import { NextRequest, NextResponse as res } from "next/server"; 

export const POST = async function handler(req: NextRequest) {
    const {userId,productData}=await req.json()

// check if product alrady in cart

const checkProduct=await prisma.user.findFirst({
 where:{
  id:userId
 },
 include:{
  cartProducts:{
    where:{
     name:productData.name
    }
  }
 }
})
if(checkProduct){
  return res.json({error:"Product Already in the cart"},{status:400})
}

  
  try {
const newUser=await prisma.user.update({ 
where:{
  id:userId
},
data:{
 
  cartProductIds:{
    push:productData.id
  }
}
})


if(newUser){
 return res.json({message:"Item Added To Cart sucessfully !!"})
}
  } catch (error) {
    console.log(error);

    return res.json({ error: "An error occurred" }, { status: 500 });
  }
};
