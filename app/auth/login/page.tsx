'use client'
import {loginDataType} from '@/app/_lib/ClientActions/types'
import React from "react";
import {useForm} from 'react-hook-form'
import { FaGoogle } from "react-icons/fa";
import Link from 'next/link';
import { getUserByEmail } from '@/app/_lib/DbActions/actions';
import { handleGoogleLogin, handleLogin } from '@/app/_lib/ClientActions/actions';
import { CircularProgress } from '@mui/material';
function page() {
  const {register,handleSubmit,formState:{errors,isSubmitting},setError,getValues}=useForm<loginDataType>();

const onSubmit:any=async (data:loginDataType)=>{
  try {
    const user:any=await getUserByEmail(data.email)

    if(!user){

      setError("root",{type:"userNotExist",message:"user does not exist"})
    }else{
    
    await handleLogin({data,user})
    }
    
  } catch (error) {
    if(error){

      console.log(error);
      
    }
  }
}



  return (
    <div className="  w-[25rem] border-[2px] rounded-lg flex justify-center items-center flex-col font-sans h-[24rem] border-gray-500 bg-white/20 select-none  shadow-[0px_0px_10px_0px_#ffffff] ">
      <h1
        className="text-gray-300 text-[1.6rem] font-sans "
      >
        Sign In
      </h1>
      <form
      onSubmit={handleSubmit(onSubmit)}
        action=""
        className="flex flex-col w-full p-[2rem] gap-[2rem] text-gray-300"
       
      >
        <div className="flex flex-col gap-[2rem]">
          <div  className='w-full flex flex-col gap-2 '>
          <input
            {...register('email',{required:true})}
            type="email"
            className="text-gray-300  w-full bg-transparent border-b-[2px] border-gray-500 outline-none  px-[0.4rem]"
            placeholder="Enter Email"
          />
          {errors.email?.type=='required' && <p>email is required</p> }
          </div>
         <div className='w-full flex flex-col gap-2' >
         <input
          {...register('password',{required:true,minLength:6})}
            type="password"
            className="text-gray-300 w-full  bg-transparent border-b-[2px] px-[0.4rem] border-gray-500 outline-none "
            placeholder="Enter Password"
          />
          { errors.password?.type=='minLength' &&  <p className='text-sm text-red-400'>password must be atleast of 6 characters</p> }
          { errors.password?.type=='required' &&  <p className='text-sm text-red-400'>password is required</p> }
         </div>
        </div>
      
        { errors.root?.type=='userNotExist' &&  <p className='text-sm text-red-400'>{errors.root?.message}</p> }
        <div className='flex flex-col gap-3 w-full'>
        <div className="w-full flex justify-between gap-4 mt-[0.6rem]">
          <button
            className="border  border-gray-200 py-[5px] rounded-md text-[0.9rem] hover:bg-gray-800 flex-1 "
            type="submit"
            disabled={isSubmitting}
          >
           { isSubmitting? <CircularProgress size={20} />:'Sign In'}
          </button>
          <Link href={'/auth/signup'} className="border flex justify-center items-center  border-gray-200 py-[5px] rounded-md text-[0.9rem] hover:bg-gray-800 flex-1 ">
            Sign up
          </Link>
        </div>
    <button onClick={handleGoogleLogin} className='w-full flex gap-3 px-3  py-2 hover:bg-gray-800 transition-all duration-150 justify-center items-center  border-[1px] border-white rounded-lg text-sans'><span>Continue with Google</span><FaGoogle size={15}/></button>
        </div>

      </form>
    </div>
  );
}

export default page;
