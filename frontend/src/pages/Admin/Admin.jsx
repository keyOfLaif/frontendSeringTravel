import React, {useState} from 'react'
import logo from '../../assets/images/SeringTravelLogo.png'


import './admin.css'

import HomepageManagement from '../../components/Home-page-management/HomepageManagement'
import Paymentmanagement from '../../components/Payment-management/Paymentmanagement'
import Tripsmanagement from '../../components/Trips-management/Tripsmanagement'
import Reportmanagement from '../../components/Report-management/Reportmanagement'

const Admin = () => {
  //coba
  const [selectedNavLinkAdmin, setSelectedNavLinkAdmin] = useState(0);
  
  const navAdmin__links=[
    {
      title:'Beranda',
      content:<HomepageManagement/>,
    },
    {
      title:'Kelola Trip',
      content:<Tripsmanagement/>
    },
    {
      title:'Kelola Pembayaran',
      content:<Paymentmanagement/>,
    },
    {
      title:'Laporan',
      content:<Reportmanagement/>,
    },
  ]


  const handleNavLinkSelected = (index) =>{
    setSelectedNavLinkAdmin(index);
  }

  
  
  


  return (
    
      <div className='outerAdminContainer d-flex'>

        <div className='leftNavbarContainer'>
          <div className='leftNavbar d-flex flex-column'>
            <div className='leftTopNav'>
              <img src={logo} alt="" />
              <h6>
                Web Management
              </h6>
            </div>

            <div className='leftNavbarMainContent'>
              <ul className="gap-1 adminLists">
                {
                  navAdmin__links.map((item,index)=>
                  <li 
                    key={index}
                    className={`navAdmin__item ${index === selectedNavLinkAdmin ? 'selected' : ''}`}
                    onClick={()=>handleNavLinkSelected(index)}
                  >
                    {item.title}
                  </li>
                  )
                }
              </ul>
            </div>

            <div>
              <span>
              <i className='ri-log-out-line'>
              </i>
                Keluar
              </span>
            </div>
            
          </div>

        </div>
        <div className='rightMainContainer'>
          <div className='mainContent'>
            <div className='topBarMainContent'>
              <div className='Content__title'>
                {navAdmin__links[selectedNavLinkAdmin].title}
              </div>
            </div>
            {navAdmin__links[selectedNavLinkAdmin].content}
          </div>

        </div>
      </div>
    
    
  )
}

export default Admin