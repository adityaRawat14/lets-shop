import { prisma } from "@/app/_lib/utils/prisma";
import { NextRequest, NextResponse as res } from "next/server"; 

export const POST = async function handler(req: NextRequest) {
    const {userId,productData,}=await req.json()

  try {
const newUser=await prisma.user.update({ 
where:{
  id:userId
},
data:{
    cartProducts:{
        disconnect:{
            id:productData.id
        }
    }
}
})

if(newUser){
  console.log('item deleted sucessfully');
  
 return  res.json({message:"Item Deleted From Cart sucessfully !!"})
}
  } catch (error) {
    console.log(error);

    return res.json({ error: "An error occurred" }, { status: 500 });
  }
};
