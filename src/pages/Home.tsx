import React from 'react'
import { useNavigate } from 'react-router-dom'
const Home = () => {
  let navigate = useNavigate();
  return (
    <div className='flex flex-col sm:flex-row w-full h-full items-center justify-center'>
        <button className='rounded-md bg-green-500 w-[90%] h-15 sm:w-[25vh] sm:h-[25vh] text-2xl' onClick={() => navigate("/settings")}>Nowa Gra</button>
        <button className='rounded-md bg-orange-500 w-[90%] h-15 sm:w-[25vh] sm:h-[25vh] text-2xl mt-10 sm:mt-0 sm:ml-5' onClick={() => navigate("/stats")}>Statystyki</button>
    </div>
  )
}

export default Home
