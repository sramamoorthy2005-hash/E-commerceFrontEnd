import React from 'react'
import { FaOpencart } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
const NavBar = () => {
    const nav = useNavigate();
  return (
    <div className='bg-gray-800 text-white py-5 px-15 flex justify-between items-center'>
        <div onClick={()=>nav('/')} className='cursor-pointer'>Logo</div>
        <input className='border-2 border-gray-400 rounded-xl py-1 px-2' placeholder='Search' type="search" />
        <FaOpencart onClick={()=>nav("/Cart")} className='text-4xl cursor-pointer hover:text-orange-400'/>
    </div>
  )
}

export default NavBar