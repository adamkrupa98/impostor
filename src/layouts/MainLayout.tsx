import React from 'react'
import { Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import logo from '../images/impostor.png'
const MainLayout = () => {
  let navigate = useNavigate();
  return (
<div className='flex justify-center items-center w-screen bg-gradient-to-t from-slate-900 via-slate-800 to-slate-900 h-screen'>
  <div className='flex flex-col justify-between bg-gradient-to-b from-slate-800 via-slate-900 to-black w-[100%] sm:w-[60vw] text-white h-full sm:pl-3 sm:pt-3'>
    <div className='flexitems-center w-[100%]'>
      <img onClick={() => navigate("/home")} src={logo} alt="impostor logo" className='h-20 w-auto ml-2 mt-2'/>
    </div>

    <div className='flex-1 w-full h-auto overflow-auto'>
      <Outlet />
    </div>

    <span className='mb-2 text-center'>© 2025 – Impostor</span>
  </div>
</div>

  )
}

export default MainLayout
