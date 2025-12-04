import React, { useState } from 'react'
import { useContext } from 'react'
import { GameSettingContext } from '../context/GameSettingContext'
import { useNavigate } from 'react-router-dom';
const Results = () => {
  const { numImpostors, nextGame} = useContext(GameSettingContext);
  const [winner, setWinner] = useState<'impostors'|'civilians'|null>(null);
   const crown = <p className="absolute bottom-10 text-4xl animate-bounce">👑</p>;
    const baseBtn = "relative flex flex-col items-center justify-center w-[90%] h-15 sm:w-[25vh] sm:h-[25vh] px-4 py-2 bg-purple-600 transition rounded-md font-semibold text-gray-200 hover:bg-purple-700";
    const winnerStyle = "ring-4 ring-yellow-400 text-white scale-105"; // wyróżnienie
    const impostorLabel = numImpostors === 1 ? 'IMPOSTOR' : 'IMPOSTORZY';
    const navigate = useNavigate();

    const handleNewGame= () => {
      nextGame();
      navigate("/play");
    }
    return (
      <div className='w-full h-full flex items-center justify-center'>
        <div className='relative flex flex-col items-center w-[90%] h-[80%] rounded-xl shadow-lg p-3'>
          <div className='flex items-center justify-center'>
            <p className='text-3xl font-medium mt-12'>Kto wygrał?</p>
          </div>
          <div className='flex flex-col sm:flex-row w-full h-[40%] mt-15 justify-center gap-20'>
            <div className="relative flex flex-col items-center">
              <button
                className={`${baseBtn} ${winner === 'impostors' ? winnerStyle : ''}`}
                onClick={() => setWinner('impostors')}
              >
                {impostorLabel}
              </button>
              {winner === 'impostors' && crown}
            </div>

            <div className="relative flex flex-col items-center">
              <button
                className={`${baseBtn} ${winner === 'civilians' ? winnerStyle : ''}`}
                onClick={() => setWinner('civilians')}
              >
                GITY
              </button>
              {winner === 'civilians' && crown}
            </div>
          </div>
          <div className={`flex gap-20 h-full items-end w-full justify-center`}>
            <button className='items-center justify-center p-3 h-10 rounded-md font-semibold px-4 py-2 bg-purple-600 text-gray-200 hover:bg-purple-700 hover:text-white' onClick={() => navigate('/play')}>Cofnij do kart</button>
            <button className='items-center justify-center p-3 h-10 rounded-md font-semibold px-4 py-2 bg-purple-600 text-gray-200 hover:bg-purple-700 hover:text-white'>Statystyki</button>
            <button className='items-center justify-center p-3 h-10 rounded-md font-semibold px-4 py-2 bg-purple-600 text-gray-200 hover:bg-purple-700 hover:text-white' onClick={handleNewGame}>Nowa gra</button>

          </div>
        </div>
      </div>
  )
}

export default Results
