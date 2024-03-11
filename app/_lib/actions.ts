import { getServerSession } from 'next-auth';
import {signIn} from 'next-auth/react'
import { authOptions } from '../api/auth/[...nextauth]/route';

export const handleLogin=(data:any)=>{
    console.log(data);
    signIn('credentials',{...data,redirect:false})
    
}
export const handleSignup=(data:any)=>{
    console.log(data);
    
}


export const getServerData=async ()=>{
  const sessionData=await getServerSession(authOptions);
  if(sessionData){
    return sessionData;
  }
}

