"use client";
import React from "react";

function PaymentBox() {
  const handlePromocode = () => {};
  return (
    <div className="bg-red w-[22rem] right-10 flex flex-col text-gray-200 justify-between h-[30rem]  px-4 py-4 sticky top-[4rem] border-[2px]  border-gray-600 rounded-[6px] ">
      <div className="flex flex-col gap-[1rem]">
        <div className="  flex flex-col gap-2">
          <label
            htmlFor="promocodeInput"
            className="text-sm font-sans text-gray-400 font-semibold">
            Enter Promocode
          </label>
          <div className="flex gap-1 mb-[3rem]">
            <input
              type="text"
              id="promocodeInput"
              className="w-[15rem] border-[2px] text-gray-800 border-gray-500 font-sans  outline-none px-2"
              placeholder="Enter Promocode"
            />
            <button
              onClick={handlePromocode}
              className="text-white bg-black   border-gray-400 border-r border-y  flex justify-center items-center px-4 py-2 rounded-sm font-sans font-semibold w-[4rem]"
            >
              Enter
            </button>
          </div>
        </div>

        <div className="flex justify-between px-[2rem] border-r border-b-[1px] font-mono  border-gray-400 pb-4 ">
          <span className="text-sm font-semibold ">cost</span>
          <span className="text-red-600">50rs</span>
        </div>
        <div className="flex justify-between px-[2rem] border-b-[1px] border-r font-mono  border-gray-400 pb-4">
          <span className="text-sm font-semibold ">discount</span>
          <span>-50rs</span>
        </div>
        <div className="flex justify-between px-[2rem] border-b-[1px]  border-r font-mono  border-gray-400 pb-4">
          <span className="text-lg font-semibold  ">
            Estimated Total
          </span>
          <span className="text-lg text-green-500">50rs</span>
        </div>
      </div>
      <div className="flex flex-col gap-2 ">
        <button className=" hover:bg-yellow-400 text-gray-800 font-semibold text-md py-3 rounded-lg bg-yellow-500">
          Proceed To Pay <span className="text-black text-lg">50rs</span>
        </button>
        <span className="px-6 text-[10px] font-sans text-gray-300">free shipping</span>
      </div>
    </div>
  );
}

export default PaymentBox;
