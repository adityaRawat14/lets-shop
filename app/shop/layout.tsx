import React from 'react'
import NavigationBar from '../_Components/NavigationBar'

async function layout({children}:{children:React.ReactNode}) {
  
  return (
    <div className='pb-[6rem]  bg-gray-100'>
        <NavigationBar/>
        {children}
        </div>
  )
}

export default layout