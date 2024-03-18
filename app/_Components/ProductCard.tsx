import { useSession } from 'next-auth/react'
import React from 'react'
import { addToCart } from '../_lib/DbActions/actions'
import { Snackbar } from '@mui/material'
import { MdStar } from 'react-icons/md'
import { HiOutlineArrowCircleRight } from 'react-icons/hi'
import { MdAddShoppingCart } from "react-icons/md";
import { FaRupeeSign } from "react-icons/fa";
import { FaRegImage } from "react-icons/fa6";
function ProductCard({product}:{product:any}) {
  const session=useSession()
  const [addToCartError,setAddToCartError]=React.useState({status:false,message:''})


  const handleAddToCart=async (product:any)=>{
    
    if(session.data?.user?.email){
      const response:any=await addToCart(product,session)
      if(response.error){
       setAddToCartError({status:true,message:response.error})
      }else{
       setAddToCartError({status:true,message:'Product added sucessfully!!'})
      }
    }else{
      alert("Please Login If You want to continue")
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
             {product.image? <img
               src="https://i.imgur.com/zryxaH8.jpg"
               alt="Product-Image"
               className="h-[14rem] object-cover"
               
            
              />:
              <div className='h-full w-full justify-center items-center pt-6 text-gray-600'>
                <FaRegImage size={150}/>
              </div>
              }
            </div>
            {/* Product Details */}
            <div className="flex flex-col justify-between ">
              <div>
               <h1 className="text-lg text-red-500 font-semibold ">
                  {product.name}
               </h1>
               <p className="mt-2 text-gray-400 text-sm leading-6  sm:text-left sm:mt-4 w-[14rem] overflow-auto max-h-[3rem] hide-scrollbar">
                 {product.details}
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
              
                 
                  <button
                   onClick={()=>{handleAddToCart(product)}}
                    className="flex justify-center items-center gap-2 w-full px-3 py-2 text-blue-600 border-blue-600 font-bold border  rounded-md ease-in-out duration-150 shadow-slate-600 hover:bg-white  hover:shadow-blue-500 hover:shadow-md hover:text-black lg:m-0 md:px-6"
                    title="Confirm Order"
                  >
                    <span className='text-[10px]'>Add To Cart</span>

                    <MdAddShoppingCart  size={20}/>
                  </button>
               
            </div>
          </div>
        </div>
   
  )
}

export default ProductCard