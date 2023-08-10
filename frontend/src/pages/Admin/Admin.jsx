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
              <h6 className='menu__title'>Menu</h6>
              <ul className="adminLists">
                {
                  navAdmin__links.map((item,index)=>
                  <li 
                    key={index}
                    className={`navAdmin__item ${index === selectedNavLinkAdmin ? 'selected' : ''}`}
                    onClick={()=>handleNavLinkSelected(index)}
                  >
                      <i class="ri-menu-4-line align-bottom me-1"></i>
                    <span>
                      {item.title}
                    </span>
                  </li>
                  )
                }
              </ul>
            </div>

            <div className='pt-2 mt-auto'>
              <h6 className='menu__title'>Lainnya</h6>
              <ul className='other__lists'>
                <li>
                  <i className="ri-account-circle-line align-bottom me-1"></i>
                  <span>
                    Admin
                  </span>
                </li>
                <li>
                  <i className="ri-shut-down-line align-bottom me-1"></i>
                  <span>
                    Keluar
                  </span>
                </li>
              </ul>
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