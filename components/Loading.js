import React from 'react'
import { MoonLoader } from 'react-spinners'

const Loading = () => {
  return (
    <div className='flex h-screen w-screen items-center justify-center bg-[#111111]/5'>
        <MoonLoader color="#190028" />
    </div>
  )
}

export default Loading