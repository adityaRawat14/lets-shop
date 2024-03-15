"use client";
import React from "react";

function PaymentBox() {
  const handlePromocode = () => {};
  return (
    <div className="bg-red w-[22rem] flex flex-col justify-between h-[30rem] shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] px-4 py-4 fixed border-[1px] border-gray-300 rounded-sm ">
      <div className="flex flex-col gap-[1rem]">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="promocodeInput"
            className="text-sm font-sans text-gray-600 font-semibold">
            Enter Promocode
          </label>
          <div className="flex gap-1 mb-[3rem]">
            <input
              type="text"
              id="promocodeInput"
              className="w-[15rem] border-[1px] border-gray-300 font-sans  outline-none px-2"
              placeholder="Enter Promocode"
            />
            <button
              onClick={handlePromocode}
              className="text-white bg-black   flex justify-center items-center px-4 py-2 rounded-sm font-sans font-semibold w-[4rem]"
            >
              Enter
            </button>
          </div>
        </div>

        <div className="flex justify-between px-[2rem] border-b-[1px]  border-gray-200 pb-5">
          <span className="text-sm font-semibold ">cost</span>
          <span className="text-red-600">50rs</span>
        </div>
        <div className="flex justify-between px-[2rem] border-b-[1px] border-gray-200 pb-5">
          <span className="text-sm font-semibold ">discount</span>
          <span>-50rs</span>
        </div>
        <div className="flex justify-between px-[2rem] border-b-[1px] border-gray-200 pb-5">
          <span className="text-lg font-semibold font-sans ">
            Estimated Total
          </span>
          <span className="text-lg text-green-500">50rs</span>
        </div>
      </div>
      <div className="flex flex-col gap-2 ">
        <button className=" bg-yellow-400 text-gray-800 font-semibold text-md py-3 rounded-lg">
          Proceed To Pay <span className="text-black text-lg">50rs</span>
        </button>
        <span className="px-6 text-[10px] font-sans text-gray-600">free shipping</span>
      </div>
    </div>
  );
}

export default PaymentBox;
