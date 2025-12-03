import React from 'react'
import { useContext } from 'react';
import { GameSettingContext } from '../context/GameSettingContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const GameInProggress = () => {
  const buttonClass =
  "px-4 py-2 bg-purple-600 hover:bg-purple-700 transition rounded-md text-white font-semibold";
  const {word, hint, roles, impostorsHint} = useContext(GameSettingContext);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const lastPlayer = currentIndex === roles.length - 1;
  const currentPlayer = roles[currentIndex];

  const navigate = useNavigate();
  if (!roles || roles.length === 0) {
    return <div className="w-full h-full flex items-center justify-center text-white">Ładowanie...</div>;
  }

  
    return (

    <div className='w-full h-full flex items-center justify-center'>
      <div className='relative flex flex-col items-center w-[40%] h-[80%] bg-gray-800 rounded-xl shadow-lg p-3 border-[3px] border-purple-700'>
          <p className='text-3xl font-semibold text-center capitalize'>{roles[currentIndex].name}</p>
          <p className={`text-3xl font-semibold text-center mt-6 capitalize ${roles[currentIndex].role == 'impostor' ? 'text-red-500' : 'text-green-400'}`}>{roles[currentIndex].role == 'civilian' ? 'JESTEŚ GITEM' : 'IMPOSTOR'}</p>
            {
              roles[currentIndex].role == 'civilian' ? <p className='mt-[12vh]'>WYRAZ</p> : 
              impostorsHint == true ? <p className='mt-[12vh]'>PODPOWIEDŹ</p> : <p className='mt-[12vh] hiden'></p>
            }
          <div className={`capitalize flex border-2  w-auto mt-5 p-3 rounded-md items-center justify-center ${roles[currentIndex].role == 'impostor' ? 'border-red-500' : 'border-green-400'}`}>
            {
              roles[currentIndex].role == 'civilian' ? <p className='text-3xl font-medium'>{word}</p> : 
              impostorsHint == true ? <p className='text-3xl font-medium'>{hint}</p> : <p className='text-2xl font-medium'>GOOD LUCK</p>
            }
          </div>
          <div className={`absolute bottom-20 flex ${currentIndex > 0 ? 'justify-between' : 'justify-center'} w-[90%]`}>
            {
              currentIndex > 0 && <button className={buttonClass} onClick={()=> setCurrentIndex(prev => prev -1 )}>cofnij</button>
            }
            {
              lastPlayer ? <button className={buttonClass} onClick={() => navigate('/results')}> START</button>
              :<button className={buttonClass} onClick={()=> setCurrentIndex(prev => prev +1 )}> Kolejny gracz</button>
            }
          </div>
      </div>
    </div>
  )
}

export default GameInProggress
