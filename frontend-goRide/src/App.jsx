import React from 'react'
import Home from './pages/Home/Home'
import { Routes, Route } from 'react-router-dom'
import User from './pages/User/User'
import MytripUser from './pages/MyTrips/MytripUser'
import MytripDriver from './pages/MyTrips/MytripDriver'
import Drivers from './pages/Drivers/Drivers'
import LoginUser from './pages/Forms/LoginUser'
import SignupUser from './pages/Forms/SignupUser'
import LogOut from './pages/Forms/LogOut'

const App = () => {
  return (
    <div className='app'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/user' element={<User />} />
        <Route path='/driver' element={<Drivers />} />
        <Route path='/mytripuser' element={<MytripUser />} />
        <Route path='/mytripdriver' element={<MytripDriver />} />
        <Route path='/userlogin' element={<LoginUser />} />
        <Route path='/usersignup' element={<SignupUser />} />
        <Route path='/logout' element={<LogOut />} />
      </Routes>
    </div>
  )
}

export default App
