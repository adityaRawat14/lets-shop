"use client"
import { handleLogin, handleSignup } from '@/app/_lib/ClientActions/actions';
import { signupDataType } from '@/app/_lib/ClientActions/types';
import React, { useState } from 'react'
import Link from "next/link"
import {useForm} from "react-hook-form"
import { CircularProgress, Snackbar } from '@mui/material';
function page() {
  const {register,handleSubmit,formState:{errors,isSubmitting},setError}=useForm<signupDataType>();
  const [toastOpen,setToastOpen]=useState({status:false,message:''})
  const onSubmit:any=async (data:signupDataType)=>{
    if( data.password!==data.confirmPassword){
      setError("confirmPassword",{type:"passDoNotMatch",message:"both password must match"})
      
      
    }else{
      const user=await handleSignup(data);
      if(user.error){
        setError("root",{ type:'server-error', message:user.error})
        setToastOpen({message:"try again",status:true})
      }else{
        setToastOpen({message:"account has been created sucessfully",status:true})
        handleLogin({data,user})
      }
    }
    
  }
  
  const handleToastClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setToastOpen({...toastOpen,status:false });
  };
 

  return (
        <div className=" font-sans w-[25rem] p-[1rem] border-[2px] rounded-lg flex justify-center items-center flex-col border-gray-500 bg-white/20 select-none  shadow-[0px_0px_10px_0px_#ffffff]">
          <Snackbar
        open={toastOpen.status}
        autoHideDuration={5000}
        onClose={handleToastClose}
        message={toastOpen.message}
      />
      <h1
        className="text-gray-300 text-[1.5rem] "
       
      >
        Sign up 
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        action=""
        className="flex flex-col w-full p-[2rem] gap-[2rem] text-gray-300"
        
      >
        <div className="flex flex-col gap-[2rem]">
         <div className='w-full'>
         <input
          {...register("name",{required:true})}
            type="name"
            className="text-gray-300 w-full bg-transparent border-b-[2px] border-gray-500 outline-none  px-[0.4rem]"
            placeholder="Enter Name"
          />
          {errors.name?.type=='required' &&  <p className='text-sm text-red-400'>Name is required</p> }
         </div>
         <div  className='w-full'>
         <input
            type="email"
            {...register("email",{required:true})}
            className="text-gray-300 w-full  bg-transparent border-b-[2px] border-gray-500 outline-none  px-[0.4rem]"
            placeholder="Enter Email"
          />
          {errors.email?.type=="required" && <p className='text-red-500 text-sm'>email is required</p> }
         </div>
          <div  className='w-full'>
          <input
            type="password"
            {...register("password",{min:6,required:true})}
            className="text-gray-300  w-full bg-transparent border-b-[2px] px-[0.4rem] border-gray-500 outline-none "
            placeholder="Enter Password"
          />
          {errors.password?.type=='required' && <p className='text-red-500 text-sm'> password is required</p> }
          </div>
         <div className='flex flex-col gap-1 w-full'>
         <input
            type="password"
            {...register("confirmPassword",{min:6})}
            className="text-gray-300 bg-transparent w-full border-b-[2px] px-[0.4rem] border-gray-500 outline-none "
            placeholder="Enter Password"
          />
          {
            errors.confirmPassword && <p className=' text-sm text-red-400 '> both password must match </p>
          }
         </div>
        </div>
        {
            errors.root?.type=='server-error' && <p className=' text-sm text-red-400 '> {errors.root.message} </p>
          }
        <div className="w-full flex justify-between gap-4 mt-[0.6rem]">
          <button
            className="border  border-gray-200 py-[5px] rounded-md text-[0.9rem] hover:bg-gray-800 flex-1 "
            type="submit"
            disabled={isSubmitting}
          >
          { isSubmitting? <CircularProgress size={20} />:'Sign up'}
          </button>
          <Link href="/auth/login"  className="border flex justify-center items-center border-gray-200 py-[5px] rounded-md text-[0.9rem] hover:bg-gray-800 flex-1 ">
            Login
          </Link>
        </div>
      </form>
    </div>
  )
}

export default page