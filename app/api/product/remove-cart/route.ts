import { prisma } from "@/app/_lib/utils/prisma";
import { NextRequest, NextResponse as res } from "next/server"; 

export const POST = async function handler(req: NextRequest) {
    const {userId,productId,}=await req.json()

  try {
const newUser=await prisma.user.update({ 
where:{
  id:userId
},
data:{
    cartProducts:{
        disconnect:{
            id:productId
        }
    }
}
})

if(newUser){
  res.json({message:"Item Deleted From Cart sucessfully !!"})
}
  } catch (error) {
    console.log(error);

    return res.json({ error: "An error occurred" }, { status: 500 });
  }
};
