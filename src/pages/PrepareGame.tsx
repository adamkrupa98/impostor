import React from 'react'
import { useState } from 'react'
import { useContext } from 'react';
import { GameSettingContext } from '../context/GameSettingContext';

const PrepareGame = () => {
  const {addPlayer , removePlayer,  players} = useContext(GameSettingContext)
  const [name, setName] = useState<string>('');
  
  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addPlayer(name);
    setName('');
  }

  return (
    <div className='flex flex-col h-[100%] pb-5 p-3 sm:p-0'>
      <form className='flex h-[10%]' onSubmit={handleSubmit}>
          <input className='border mt-2 border text-black text-2xl rounded-md p-1 mt-6 sm:ml-2 bg-gray-400 outline-none' type="text" placeholder='Wprowadź imię' value={name} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setName(e.target.value)}/>
          <button className='mt-6 w-10 h-10 bg-green-400 ml-2 rounded-sm' type='submit'>+</button>
      </form>
      
      <div className='flex flex-col sm:flex-row h-[90%] p-2 w-full'>
          <div className={`mt-5 p-2 ${players.length > 0 ? 'flex' : 'hidden'} sm:w-1/3 flex-col bg-yellow-500 rounded-md sm:flex overflow-auto items-center max-h-1/4 sm:max-h-[100%]`}>
              <p className='text-2xl'>GRACZE</p>
              <div className='mt-3 w-[100%]'>
                <ol>
                  {players.map((p, index) => (
                    <div key={index} className='flex justify-between text-white items-center mt-3 '>
                      <li className='capitalize text-3xl min-w-[100px]'>{p}</li>
                      <button className='bg-red-500 text-white rounded-md ml-4 w-7 p-1' onClick={()=> removePlayer(p)}>X</button>
                    </div>
                  ))}
                </ol>
              </div>
          </div>

          <div className='sm:ml-2 mt-5 p-2 flex sm:w-2/3 flex-col bg-pink-400 rounded-md sm:flex items-center max-h-1/4 sm:max-h-[100%]'>
              <p className='text-2xl'>Opcje</p>
      
          </div>
      </div>
    </div>

    
  )
}

export default PrepareGame
