import { Route, BrowserRouter, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import PrepareGame from './pages/PrepareGame'
import Stats from './pages/Stats'
import GameInProggress from './pages/GameInProggress'
import { Navigate } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'

function App() {

  return (
    <>      
      <BrowserRouter>
        <Routes>
           <Route path='/' element={<Navigate to="/home" replace/>}/> 
           <Route element={<MainLayout />}>
            <Route path='/home' element={<Home />} /> 
            <Route path='/settings' element={<PrepareGame />} /> 
            <Route path='/stats' element={<Stats/>} /> 
            <Route path='/play' element={<GameInProggress/>} /> 
           </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
