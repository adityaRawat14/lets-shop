import { auth } from '@/app/api/auth/[...nextauth]/route';
import {signIn} from 'next-auth/react'
import electronics from '@/public/Images/electronics.jpg'
import footwears from "@/public/Images/footwear.jpg"
import groceries from "@/public/Images/groceries.jpg"
import clothes from "@/public/Images/clothes.jpg"



export const handleLogin=async (credentials:any)=>{
    console.log(credentials);
    const payload=JSON.stringify({data:credentials.data,user:credentials.user})
    
await  signIn('credentials',{payload,redirectTo:'/'})
console.log("this is value of auth:",auth);

}


export const handleSignup=async (credentials:any)=>{
    if(credentials.password!==credentials.confirmPassword){
        return null;
    }
    const result=await fetch("http://localhost:3000/api/user/create-user",{
        method:'POST',body:JSON.stringify({name:credentials.name,password:credentials.password,email:credentials.email}),
        headers:{
            'Content-Type':'application/json'
        }
    })
    const response=await result.json();
    return response;

}


export const  productCatagories=[
    {
      image:electronics,
      category:"Electronics",
      text:["Unleash the power of innovation. Discover the electronics that seamlessly integrate into your life."]
    },
    {
      image:groceries,
      category:"Groceries",
      text:["Quality you deserve, prices you'll love. (Appeals to both quality and affordability","Your one-stop shop for all things grocery. (Emphasizes variety and convenience)"]
    },
    {
      image:clothes,
      category:"Clothes",
      text:["Dress your story. Find clothes that express you, from timeless classics to trendsetting looks. Shop Shop Name"]
    },
    {
      image:footwears,
      category:"Footwears",
      text:["Tired soles? Worn-out style? Find comfort & confidence for every adventure at LetsShop.com."]
    },
  ]

