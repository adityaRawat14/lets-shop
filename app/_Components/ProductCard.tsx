import { useSession } from 'next-auth/react'
import React from 'react'
import { addToCart } from '../_lib/DbActions/actions'
import { Snackbar } from '@mui/material'
import { MdStar } from 'react-icons/md'
import { HiOutlineArrowCircleRight } from 'react-icons/hi'
import { MdAddShoppingCart } from "react-icons/md";
import { FaRupeeSign } from "react-icons/fa";

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


        <div>
            <Snackbar
        open={addToCartError.status}
        autoHideDuration={5000}
        message={addToCartError.message}
        onClose={handleToastClose}
      />
          <div className="flex h-full gap-2 px-3 py-4 hover:shadow-[2px_2px_2px_0px_#edf2f7] transition-all duration-150 rounded-lg border-gray-700 border-[2px] ">
            <div className=" rounded-xl">
              <img
               src="https://i.imgur.com/zryxaH8.jpg"
               alt="Product-Image"
               className="h-[14rem] object-cover w-full"
              />
            </div>
            {/* Product Details */}
            <div className="flex flex-col justify-between ">
              <div>
               <h1 className="text-lg text-red-500 font-semibold ">
                  {product.name}
               </h1>
               <p className="mt-2 text-gray-400 text-sm leading-6  sm:text-left sm:mt-4 w-[14rem] overflow-auto max-h-[3rem] hide-scrollbar">
                  Lorem ipsum fdjskaljfldsaj Lorem ipsum dolor sit, amet Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cum, nisi. consectetur adipisicing elit. Harum, delectus!
               </p>
               <span className=" text-lg text-yellow-600 flex items-center gap-1 sm:my-2">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <MdStar key={index} />
                  ))}
               </span>
               <div className='flex justify-between pr-4 items-center'>

               <span className="text-lg mb-2 text-red-500 font-semibold sm:text-2xl flex  gap-3 items-center" >
                   <FaRupeeSign size={18}/>
                <span>{product.price}</span>
               </span>
            {product.quantity!=0?   <span className='text-[11px] text-green-500'>{product.quantity} Available in Stock!</span>: <span className='text-[11px] text-red-500'>Out of stock !!</span> }
               </div>
              </div>
               <div className="w-full text-left flex justify-between gap-5">
                  <button
                 
                    className="flex items-center justify-between w-full px-3 py-1 bg-red-500 text-white  font-bold border border-red-500 rounded-md ease-in-out duration-150 shadow-slate-600 hover:bg-white hover:shadow-red-500 hover:shadow-md hover:text-red-500 "
                    title="Confirm Order"
                  >
                    <span>Buy</span>

                    <HiOutlineArrowCircleRight size={20} />
                  </button>
                  <button
                   onClick={()=>{handleAddToCart(product)}}
                    className="flex justify-center items-center gap-2 w-full px-3 py-1 text-blue-600 border-blue-600 font-bold border  rounded-md ease-in-out duration-150 shadow-slate-600 hover:bg-white  hover:shadow-blue-500 hover:shadow-md hover:text-black lg:m-0 md:px-6"
                    title="Confirm Order"
                  >
                    <span className='text-[10px]'>Add To Cart</span>

                    <MdAddShoppingCart  size={20}/>
                  </button>
               </div>
            </div>
          </div>
        </div>
   
  )
}

export default ProductCard