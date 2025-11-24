import React from 'react'
import { useNavigate } from 'react-router-dom'
const Home = () => {
  let navigate = useNavigate();
  return (
    <div className='flex flex-col sm:flex-row w-full h-full items-center justify-center'>
        <button className=' w-[90%] h-15 sm:w-[25vh] sm:h-[25vh] px-4 py-2 bg-purple-600 hover:bg-purple-700 transition rounded-md text-gray-200 hover:text-white font-semibold' onClick={() => navigate("/settings")}>Nowa Gra</button>
        <button className='  w-[90%] h-15 sm:w-[25vh] sm:h-[25vh]  mt-10 sm:mt-0 sm:ml-5 px-4 py-2 bg-purple-600 hover:bg-purple-700 transition rounded-md text-gray-200 hover:text-white font-semibold' onClick={() => navigate("/stats")}>Statystyki</button>
    </div>
  )
}

export default Home
