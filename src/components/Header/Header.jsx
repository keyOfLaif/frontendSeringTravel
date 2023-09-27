import React, { useRef, useEffect, useContext, useState } from 'react'
import { Container, Row, Button, Badge } from 'reactstrap'
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom'

import logo from '../../assets/images/SeringTravelLogo.png'
import './header.css';

import { AuthContext } from './../../context/AuthContext'


const nav__links=[
  {
    path:'/home',
    display:'Home'
  },
  {
    path:'/about',
    display:'About'
  },
  {
    path:'/trips',
    display:'Trips'
  },
  {
    path:'/gallery',
    display:'Gallery'
  },
]

const Header = () => {

const [showNotifications, setShowNotifications] = useState();

const headerRef = useRef(null)
const menuRef = useRef(null)

const navigate = useNavigate()
const {user, dispatch} = useContext(AuthContext)

const logout = ()=>{
  dispatch({type: 'LOGOUT'})
  navigate('/login')
}

// const stickyHeaderFunc = ()=>{
//   window.addEventListener('scroll', ()=>{
//     if(document.body.scrollTop > 80 || document.documentElement.scrollTop > 80){
//       headerRef.current.classList.add('sticky__header')
//     }else{
//       headerRef.current.classList.remove('sticky__header')
//     }
//   })
// }

const stickyHeaderFunc = () => {
  window.addEventListener('scroll', () => {
    const header = headerRef.current;
    if (header) {
      if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        header.classList.add('sticky__header');
      } else {
        header.classList.remove('sticky__header');
      }
    }
  });
}


useEffect(()=>{
  stickyHeaderFunc()

  return window.removeEventListener('scroll', stickyHeaderFunc)
})

const toggleMenu = () => menuRef.current.classList.toggle('show__menu')

const location = useLocation()

if(location.pathname === "/admin" || location.pathname === "/owner"){
  return null
}

  return <header className='header' ref={headerRef}>
    <Container>
      <Row>
        <div className='nav__wrapper d-flex align-items-center justify-content-between'>
          {/* logo */}
          <div className='logo'>
            <img src={logo} alt="" />
          </div>

          {/* menu */}
          <div className="navigation" ref={menuRef} onClick={toggleMenu}>
            <ul className="menu d-flex align-items-center gap-5">
              {
                nav__links.map((item,index)=>
                <li className="nav__item" key={index}>
                  <NavLink to={item.path} className={navClass => navClass.isActive ? 'active__link' : ''}>{item.display}
                  </NavLink>
                </li>
                )
              }
            </ul>
          </div>


          <div className="nav__right d-flex align-items-center gap-4">
            <div className="nav__btns d-flex align-items-center gap-4">
              {
                !user || (user.role !== 'user') ? ( <>
                  <Button className='btn secondary__btn'><Link to='/login'>Login</Link></Button>
                  <Button className='btn primary__btn'><Link to='/register'>Register</Link></Button>
                </>
                ) : (
                  <>
                  {
                    <Button className='btn secondary__btn'>
                        <div className='position-relative' data-bs-toggle="tooltip" data-bs-placement="bottom" title={`${user.bookings.length} pesanan`}>
                          <Link to={`/${user.username}`}>                        
                                {user.username}
                        {user.bookings && user.bookings.length > 0 && (
                                <Badge pill color='danger' className="position-absolute p-1">
                                  <span className='visually-hidden'></span>
                                </Badge>
                        )}
                          </Link>
                        </div>
                      </Button>
                  }
                  <Button className='btn primary__btn' onClick={logout}>
                    Logout
                  </Button> 
                </>                 
                )
              }
            </div>

            <span className="mobile__menu" onClick={toggleMenu}>
              <i className="ri-menu-line"></i>
            </span>
          </div>

        </div>
      </Row>
    </Container>
  </header>
}

export default Header;