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

const Routers = () => {

  // <Switch>
  // <Route path='/admin/*' element={<Layout2><Routes /></Layout2>} />
  // {/* <Route path='/owner/*' element={<Layout3><Routes /></Layout3>} /> */}
  // <Route path='/*' element={<Layout><Routes /></Layout>} />
  // </Switch>

  return (

    <Routes>
        <Route path='/' element={<Navigate to='/home'/>} />
        <Route path='/home' element={<Home/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/admin' element={<Admin/>}/>
        <Route path='/owner' element={<Owner/>}/>
        <Route path='/trips' element={<Trips/>} />
        <Route path='/trips/:id' element={<TripDetails/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/:slug' element={<Profile/>} />
        <Route path='/thank-you' element={<ThankYou/>} />
        <Route path='/trip/search' element={<SearchResultList/>} />
    </Routes>
  )
}

export default Routers