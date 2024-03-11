import React from 'react'
import NavigationBar from '../_Components/NavigationBar'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'

async function layout({children}:{children:React.ReactNode}) {
  
  const session=await getServerSession(authOptions)
  return (
    <div className='pb-[6rem]  bg-gray-100'>
        <NavigationBar session={session}/>
        {children}
        </div>
  )
}

export default layout