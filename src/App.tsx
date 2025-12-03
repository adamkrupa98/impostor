import { Route, BrowserRouter, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import PrepareGame from './pages/PrepareGame'
import Stats from './pages/Stats'
import GameInProggress from './pages/GameInProggress'
import { Navigate } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import { GameSettingProvider } from './context/GameSettingContext'
import Results from './pages/Results'
function App() {

  return (
    <>      
    <GameSettingProvider>
      <BrowserRouter>
        <Routes>
           <Route path='/' element={<Navigate to="/home" replace/>}/> 
           <Route element={<MainLayout />}>
            <Route path='/home' element={<Home />} /> 
            <Route path='/settings' element={<PrepareGame />} /> 
            <Route path='/stats' element={<Stats/>} /> 
            <Route path='/play' element={<GameInProggress/>} /> 
            <Route path='/results' element={<Results />} />
           </Route>
        </Routes>
      </BrowserRouter>
    </GameSettingProvider>
    </>
  )
}

export default App
