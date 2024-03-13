import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import ShareIcon from '@mui/icons-material/Share';

function CartItem() {
  return (
    <div className="flex w-[60rem] h-[15rem]  rounded-mdborder-gray-300 border-r shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]">
    <div className=" border-y   flex px-6 py-3 font-mono">
      <div className="w-[15rem] h-full bg-blue-500">image section</div>
      <div className=" h-full flex-grow flex px-4 ">
        <div className="flex flex-col justify-between pb-[1rem]">
          <div className="w-[16rem] ">
          <h1 className="text-2xl font-semibold ">Product name</h1>
          <h2 className="text-lg font-sans">Features/size</h2>
          <h2 className="text-sm ">quantity in stock</h2>
          </div>
          <h1 className="px-3 text-red-800 text-2xl">
            price 
          </h1>
        </div>
        <div>
          <div className="px-[4rem] flex flex-col">
          <label htmlFor="quantitySelection" className="text-md text-gray-500">Quantity</label>
          <select  className="border border-gray-300 w-[7rem] outline-none pl-3"  defaultValue={1} >
            <option >1</option>
            <option >2</option>
            <option >3</option>
            <option >4</option>
          </select>
          </div>
        </div>
        <div className="w-full justify-end flex flex-col">
          <h1 className="font-semibold text-lg w-full items-center flex font-mono">total</h1>
          <h1 className="flex h-full flex-grow py-4 px-4  text-red-700 ">total price</h1>
        </div>
      </div>
    </div>
    <div className="flex flex-col h-full border py-3 gap-6 px-[0.4rem] ">
     <DeleteIcon className=" cursor-pointer hover:text-black text-gray-500"/>
     <ShareIcon className="cursor-pointer hover:text-black text-gray-500"/>
    </div>
    </div>
  );
}

export default CartItem;
