import { prisma } from "@/app/_lib/utils/prisma";
import { NextRequest ,NextResponse as res} from "next/server";
import { ProductCategory } from "@prisma/client";
export  async function GET(req:NextRequest ){

const url=new URL(req.url)
const queryCategory=url.searchParams.get('category')!

const typedCategory: ProductCategory = queryCategory as ProductCategory; 
const products=await prisma.products.findMany({
    where:{ 
        productCategory:typedCategory 
    }
})

if(!products){
    res.json({error:"server error"},{status:404})
}
console.log("these are ",queryCategory , " products ",products);

   return res.json({products});
   
   
}