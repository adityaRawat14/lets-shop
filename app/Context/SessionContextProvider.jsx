"use client"
import React, { useState,useEffect } from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { getServerData } from '../_lib/actions'
const SessionContext=React.createContext(null)

export const useSessionProvider=()=>{
  return useContext(SessionContext)
}

function SessionContextProvider({children}) {
const [session,setSession]=useState(null)

const getSession=async ()=>{
const serverSession=await getServerData()
if(serverSession){
  setSession(serverSession)
}
}


  useEffect(()=>{
    getSession();
  },[session])

  

  return (
    <SessionContext.Provider value={{session:session}}>
  {children}
    </SessionContext.Provider>
  )
}

export default SessionContextProvider