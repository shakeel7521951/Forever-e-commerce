import React from 'react'
import {assets} from '../assets/assets'

const Navbar = ({setToken}) => {
  return (
    <div className='flex items-center py-2 px-[4%] justify-between'>
        <img className='w-[max(13%,80px)]' src="./companylog.jpg" alt="" />
        <button onClick={()=>setToken('')} className='text-white bg-rose-600 hover:bg-rose-700 px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm'>Logout</button>
    </div>
  )
}

export default Navbar