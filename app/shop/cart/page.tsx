
import React from 'react'
import CartItem from '../../_Components/CartItem'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Button } from '@mui/material';
import PaymentBox from '@/app/_Components/PaymentBox';
function page() {
  return (
    <main className='h-full w-full'>
      <span className='flex  items-center border-b border-gray-200 '>
      <h1 className='text-[3rem] font-semibold font-mono px-[3rem] py-[0.5rem]  '>Cart</h1>
      <ShoppingCartIcon className='text-[3rem]' />
      </span> 
   <div className=' flex px-[2rem] py-[2rem] gap-6 relative'>
   <section className=' flex flex-col gap-6'>
      <CartItem />
      <CartItem />
      <CartItem />
      <CartItem />
    </section>
    <section className='flex-grow '>
     <PaymentBox/>
    </section>
   </div>
    </main>
  )
}

export default page