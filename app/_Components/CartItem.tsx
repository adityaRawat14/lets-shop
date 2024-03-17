"use client"
import React, { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import ShareIcon from '@mui/icons-material/Share';
import { FaRupeeSign } from "react-icons/fa";
import { removeFromCart } from "../_lib/ClientActions/actions";
import { Snackbar } from "@mui/material";

function CartItem({product,session}:{product:any,session:any}) {
  const [removeFromCartError,setRemoveFromCartError]=React.useState({status:false,message:''})
  const deleteProductFromCart=async (product:any)=>{
 const response=await   removeFromCart(product,session);
    if(response.error){
        setRemoveFromCartError({status:true,message:response.error})

    }else{
      setRemoveFromCartError({status:true,message:response.message})
    }
  }

  const handleToastClose=()=>{
    setRemoveFromCartError({status:false,message:''})
  }
const [selectedQuantity,setSelectedQuantity]=useState(1)
  return (
    <div className="flex w-[60rem] h-[15rem]  rounded-md  border-gray-600  shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]">
    <div className=" border border-gray-500   flex px-6 py-3 font-sans">
      <div className="w-[15rem] h-full bg-blue-500">image section</div>
      <div className=" h-full flex-grow flex px-4 ">
        <div className="flex flex-col justify-between pb-[1rem]">
          <div className="w-[16rem] text-gray-200">
          <h1 className="text-2xl font-semibold text-gray-200">{product.name}</h1>
          <h2 className="text-lg font-sans">{product.details}</h2>
          <h2 className="text-sm text-green-500"><span className="">{product.quantity}</span> in stock</h2>
          </div>
          
          <h1 className="px-3 flex text-green-400 text-2xl items-center gap-4">
          <FaRupeeSign size={15} />
            <span>{product.price}</span> 
          </h1>
        </div>
        
          <div className="px-[4rem] flex flex-col gap-2">
          <label htmlFor="quantitySelection" className="text-md text-gray-500">Quantity</label>
          <select value={selectedQuantity} onChange={(e)=>{setSelectedQuantity(Number(e.target.value))}} className="border  rounded-full w-[7rem] outline-none pl-3"  defaultValue={1} >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
          </div>
      <div className="flex flex-col  justify-between pb-4">
        <div className="w-full justify-end flex flex-col">
          <h1 className="font-semibold text-lg w-full items-center flex font-mono text-white">total</h1>
          <h1 className="flex h-full flex-grow py-4 px-4 items-center gap-1  text-green-500 ">
            <FaRupeeSign size={15} />
            {selectedQuantity*product.price}
            </h1>
        </div>
        <button className="px-3 py-2 font-bold bg-yellow-500 rounded-full hover:bg-yellow-400 hover:border-yellow-800 hover:border-[3px] transition-all duration-200 border-[3px] border-yellow-400">Buy</button>
      </div>
      </div>
    </div>
    <div className="flex flex-col h-full border border-gray-400 py-3 gap-6 px-[0.4rem] ">
     <DeleteIcon className=" cursor-pointer hover:text-white  text-gray-500" onClick={()=>deleteProductFromCart(product)}/>
    </div>
    <Snackbar
        open={removeFromCartError.status}
        autoHideDuration={5000}
        message={removeFromCartError.message}
        onClose={handleToastClose}
      />
    </div>
  );
}

export default CartItem;
