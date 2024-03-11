import React from 'react'

function layout({children}:{children:React.ReactNode}) {
  return (
    
    <div className='h-screen w-screen auth-bg flex justify-center items-center '>
        {children}
    </div>
  )
}

export default layout