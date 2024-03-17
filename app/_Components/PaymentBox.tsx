"use client";
import React, { useEffect, useState } from "react";
import { verifyPromocode } from "../_lib/ClientActions/actions";
import {  FaRupeeSign } from "react-icons/fa";
import { GiTireIronCross } from "react-icons/gi";
import { QRCodeSVG } from "qrcode.react";

function PaymentBox({paymentData,setPaymentData}:{paymentData:any,setPaymentData:any}) {
  const [discount,setDiscount]=useState(0)
  const [promocodeInput,setPromocodeInput]=useState('')
  const [promocodeError,setPromocodeError]=useState({status:false,message:'',promocodeLength:0})
  const [netAmount,setNetAmount]=useState<number | null>(null)
  const [showQrCode,setShowQrCode]=useState({status:false})

  const countPromocodeLength=()=>{
    let length=0;
    for(let i =0;i<promocodeInput.length;i++){
      if(promocodeInput.charAt(i)!='-'){
        length++;
      }
    }
    return length;
  }
const handlePayment=()=>{
  setShowQrCode({status:true})
}
const closePayment=()=>{
  setShowQrCode({status:false})
}



useEffect(()=>{
  setNetAmount(paymentData.amount-discount);
},[paymentData,discount])




  const handlePromocode =async () => {
    if(countPromocodeLength()!=32){
      setPromocodeError({...promocodeError,status:true,message:"invalid promocode",})
    }else{
      const codeResponse=await verifyPromocode(promocodeInput)
      if(codeResponse.error){
        setPromocodeError({...promocodeError,status:true,message:"invalid promocode"})
      }else{
        setDiscount(codeResponse.amount);
      }
    }

  };
  return (
    <div className="bg-red w-[22rem] right-10 flex flex-col text-gray-200 justify-between h-[30rem]  px-4 py-4 sticky  top-[4rem] border-[2px]  border-gray-600 rounded-[6px] ">
     {
      !showQrCode.status?
      <div className="flex flex-col gap-[1rem]">
      <div className="  flex flex-col gap-2 mb-10">
        <label
          htmlFor="promocodeInput"
          className="text-sm font-sans text-gray-400 font-semibold">
          Enter Promocode
        </label>
        <div className="flex gap-1 ">
          <input
          onChange={(e)=>{
          setPromocodeError({...promocodeError,status:false,message:''});
          setPromocodeInput(e.target.value)
          }}
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
        {promocodeError.status && <span className="text-sm font-sans text-red-500">{promocodeError.message}</span> }
      </div>

      <div className="flex justify-between px-[2rem] border-r border-b-[1px] font-mono  border-gray-400 pb-4 ">
        <span className="text-sm font-semibold ">cost</span>
        <span className="text-green-600">{paymentData.amount?paymentData.amount:'-'}</span>
      </div>
      <div className="flex justify-between px-[2rem] border-b-[1px] border-r font-mono  border-gray-400 pb-4">
        <span className="text-sm font-semibold ">discount</span>
        <span className="text-red-500">-{discount?discount:'-'}</span>
      </div>
      <div className="flex justify-between px-[2rem] border-b-[1px]  border-r font-mono  border-gray-400 pb-4">
        <span className="text-lg font-semibold  ">
          Estimated Total
        </span>
        <span className="text-lg text-green-500">{paymentData.amount?netAmount:'-'}</span>
      </div>
    </div>:
    <div className="h-full flex-col gap-2 flex justify-center items-center">
       <h1 className="flex w-full justify-end px-5 "> <GiTireIronCross onClick={closePayment} className="cursor-pointer"  /></h1>
       <QRCodeSVG value={`upi://pay?pa=adirwt456@oksbi&pn=AdityaRawat&tn=product-purchase&am=${netAmount}&cu=INR1`} includeMargin={true} size={200}/>
       <h1 className="text-gray-200 font-sans text-lg font-bold">Scan To Pay</h1>
       <button className="font-bold px-2 py-1 bg-green-500 rounded-lg">Done </button>
    </div>
     }
 
      <div className="flex flex-col gap-2 ">
        <button className=" hover:bg-yellow-400 text-gray-800 font-semibold text-md py-3 flex justify-center items-center gap-3 rounded-lg bg-yellow-500 disabled:bg-yellow-800" disabled={!paymentData.productData.id} onClick={handlePayment}>
          Proceed To Pay {paymentData.amount && <span className="text-black flex items-center gap-2 font-mono text-lg "><FaRupeeSign size={17} />{netAmount}</span>}
        </button>
        <span className="px-6 text-[10px] font-sans text-gray-300">free shipping</span>
      </div>
    </div>
  );
}

export default PaymentBox;
