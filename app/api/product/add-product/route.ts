import { NextRequest ,NextResponse as res} from "next/server";
import { prisma } from "@/app/_lib/utils/prisma";

export  async function POST(req:NextRequest ){


const {productCategory,productSubCategory,quantity,description}:any=await req.json();
const number=quantity
const existingProduct=await prisma.products.findFirst({
    where:{
        productSubCategory,
        productCategory,
        name:description.name
    },
    select:{
        id:true
    }
})
if(existingProduct){

    
    const putIntoProduct=await prisma.products.update({
        where:{
            id:existingProduct.id
        },
        data:{
            quantity:{
                increment:number
            }
        }
    })
    if(putIntoProduct){
        return res.json({message:"product added sucessfully "})
    }
}

const createNewProduct=await prisma.products.create({
data:{
    name:description.name,
    price:description.price,
    productCategory,
    productSubCategory,
    quantity,
    details:description.details
    
}
})
if(!createNewProduct){
    return res.json({error:"failed to add product , Try again.."},{status:500})
}
console.log(createNewProduct);

if(createNewProduct){
    return res.json({message:"Product Added Sucessfully"})
}
}