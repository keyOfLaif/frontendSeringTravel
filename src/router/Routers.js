import React from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'

import Home from '../pages/Home';
import Trips from '../pages/Trips/Trips';
import TripDetails from '../pages/TripDetails';
import Login from '../pages/Login';
import Register from '../pages/Register';
import SearchResultList from '../pages/SearchResultList';
import ThankYou from '../pages/ThankYou';
import Admin from '../pages/Admin/Admin';
import Owner from '../pages/Owner/Owner';
import Profile from '../pages/User/Profile';
import About from '../pages/About/About';
import Gallery from '../pages/Gallery';
import LogInAdmin from '../pages/LogInAdmin';

const Routers = () => {

  return (

    <Routes>
        <Route path='/' element={<Navigate to='/home'/>} />
        <Route path='/home' element={<Home/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/admin' element={<Admin/>}/>
        <Route path='/admin/signin' element={<LogInAdmin/>}/>
        <Route path='/owner' element={<Owner/>}/>
        <Route path='/trips' element={<Trips/>} />
        <Route path='/trips/:id' element={<TripDetails/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/:slug' element={<Profile/>} />
        <Route path='/thank-you' element={<ThankYou/>} />
        <Route path='/trip/search' element={<SearchResultList/>} />
        <Route path='/gallery' element={<Gallery/>} />
    </Routes>
  )
}

export default Routers