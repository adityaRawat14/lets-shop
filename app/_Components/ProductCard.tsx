import { useSession } from 'next-auth/react'
import React from 'react'
import { addToCart } from '../_lib/DbActions/actions'
import { Snackbar } from '@mui/material'

function ProductCard({product}:{product:any}) {
  const session=useSession()
  const [addToCartError,setAddToCartError]=React.useState({status:false,message:''})
  const handleAddToCart=async (product:any)=>{
    
   const response:any=await addToCart(product,session)
   if(response.error){
    setAddToCartError({status:true,message:response.error})
   }else{
    setAddToCartError({status:true,message:'Product added sucessfully!!'})
   }

  }

  function handleToastClose(){
    setAddToCartError({...addToCartError,status:false})
  }
  return (
    <>
     <Snackbar
        open={addToCartError.status}
        autoHideDuration={5000}
        message={addToCartError.message}
        onClose={handleToastClose}
      />
    <div className=' w-[10rem] h-[15rem] border-[1px] border-gray-200'>
        <div className='h-[9rem] w-full bg-gray-300'>
          
        </div>
        <div className='px-1 py-1 flex flex-col justify-between gap-10'>
          <div className='flex  gap-3 justify-between px-1'>
      <span className='text-sm font-sans font-semibold'>{product.name}</span>
    <span className='font-mono font-bold text-[13px]'>Rs. {product.price}</span>

          </div>
      <span className='flex gap-4'>
        <button className='px-2 border-[2px] rounded-[8px] border-red-800  flex  justify-center items-center text-sm font-sans font-semibold'>buy</button>
        <button className='px-2  border-[2px] border-green-600 text-green-900 rounded-[8px] flex justify-center items-center' onClick={(product)=>{handleAddToCart(product)}}>Add</button>
        </span>
      
    
        </div>
    </div>
    
    
    </>
  )
}

export default ProductCard