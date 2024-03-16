"use client"
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { fetchProductsByCategory, productCatagories } from '@/app/_lib/ClientActions/actions';
import { CircularProgress } from '@mui/material';
import CategoryPage from '@/app/_Components/CategoryPage';
 function page() {
  const params=useParams()
  const category=params.category;

  const [products,setProducts]=useState<null | any[]>(null);
  const [error,setError]=useState({status:false,message:''})
  const [subCategories,setSubCategories]=useState<any[] | null>(null)
  const getProducts=async ()=>{
    const response=await fetchProductsByCategory(category);
    if(response.error){
      setError({message:'Server Problem Please refresh..',status:true})
    }else{
      setProducts(response.products)
    }
  }
  useEffect(()=>{
    const cat=productCatagories.find((el)=>{
return (
  el.category==category
)!

})
setSubCategories(cat?.subCategories!);
    if(!products){
      getProducts()
    }
  },[])


  return (
    
    <div className=' flex flex-col h-full bg-slate-900 '>
        <h1 className='w-full text-4xl py-5 px-[4rem] font-mono   bg-gray-900 text-white'>{category}</h1>
        {products==null?
        <div className='h-screen relative   justify-center items-center '>
          <CircularProgress className='mx-[50vw] my-[30vh]' />
        </div>:
        products?.length==0?
        <div className='flex-grow justify-center flex mt-[4rem] w-screen select-none'>
          <div>
           {error.status ? <h1 className='font-sans font-bold text-lg text-red-400'>{error.message}</h1>: <h1 className='font-sans font-bold text-lg'>No product Available in this Category !!</h1>}
            
          </div>
        </div>:
       <CategoryPage products={products} subCategories={subCategories!}/>
        }
        
    </div>
  )
}

export default page