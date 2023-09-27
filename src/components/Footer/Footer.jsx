import React from 'react'
import './footer.css'
import { useLocation } from 'react-router-dom';

import { Container, Row, Col } from 'reactstrap';

import {Link} from 'react-router-dom'
import logo from '../../assets/images/SeringTravelLogo.png'

const quick__links=[
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
];
const quick__links2=[
  {
    path:'/gallery',
    display:'Gallery'
  },
  {
    path:'/login',
    display:'Login'
  },
  {
    path:'/register',
    display:'Register'
  },
];



const Footer = () => {

  const location = useLocation();
  
  // Don't render the header for the "/no-header" route
  if (location.pathname === "/admin" || location.pathname === "/owner") {
    return null;
  }

  return (
    <footer className='footer'>
      <Container>
        <Row className='align-items-center innerContainer'>
          <Col lg='3'>
            <div className="logo d-flex flex-column">
              <img src={logo} alt="" />
              <div className='d-flex p-0'>
                <span>
                  <i className="ri-copyright-line"></i>
                  Laif 2023
                </span>
              </div>
            </div>
          </Col>

          <Col lg='9'>

            <div className="social__links d-flex w-100 align-items-center justify-content-around gap-4">
                <span>
                  <Link to='#'><i className='ri-youtube-line'></i></Link>
                </span>
                <span>
                  <Link to='#'><i className='ri-github-fill'></i></Link>
                </span>
                <span>
                  <Link to='#'><i className='ri-facebook-circle-line'></i></Link>
                </span>
                <span>
                  <Link to='#'><i className='ri-instagram-line'></i></Link>
                </span>
              </div>

            <div className='d-flex align-items-center justify-content-around'>
              <span>
                <i className="ri-map-pin-line align-bottom me-2"></i>
                Yogyakarta
              </span>
              <span>
              <i className="ri-mail-line align-bottom me-2"></i>
                seringtravel@gmail.com
              </span>
              <span>
                <i className="ri-phone-line align-bottom me-2"></i>
                0897658368
              </span>
            </div>
          </Col>
          
        </Row>
      </Container>
      
    </footer>
  )
}

export default Footer;