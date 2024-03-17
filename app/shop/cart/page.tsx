'use client'
import React, { useEffect, useState } from 'react'
import CartItem from '../../_Components/CartItem'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PaymentBox from '@/app/_Components/PaymentBox';
import { useSession } from 'next-auth/react';
import { getCart } from '@/app/_lib/ClientActions/actions';
import { CircularProgress } from '@mui/material';
 function page() {
const [cartProducts,setCartProucts]=useState<null | any[]>(null)
  const session=useSession()
const fetchCartProducts=async ()=>{
  const products=await getCart(session)
  if(products.error){
    // handle error

  }
  else{
    setCartProucts(products);
  }
  
}
  useEffect(()=>{
if(session.status=='authenticated'){
  fetchCartProducts()
}
  },[session.status])

  return (
    <main className='h-full w-full bg-slate-900'>
      <span className='flex  items-center border-b-[2px] border-gray-600 text-white'>
      <h1 className='text-[3rem] font-semibold font-mono px-[3rem] py-[0.5rem]  '>Cart</h1>
      <ShoppingCartIcon className='text-[3rem] ' />
      </span> 
   <div className=' flex flex-col gap-6'>
    {cartProducts?
<div className='flex px-[2rem] py-[2rem] gap-6 '>
      <section className='flex flex-col gap-5'>

        {cartProducts?.map((product)=>{
          return (
            <CartItem key={product.id} product={product} />
  
          )
        })}
      </section>

    <section className='flex-grow  '>
     <PaymentBox/>
    </section>
</div>
      : 
      <div className='w-screen  justify-center pt-[6rem] h-screen  flex '>
       <div className='flex flex-col gap-3 items-center '>
        <CircularProgress size={50}/>
        <span className='text-gray-400 text-sm font-sans'>Please wait .....</span>

       </div>

      </div>
    }
  
    </div>
    </main>
  )
}

export default page