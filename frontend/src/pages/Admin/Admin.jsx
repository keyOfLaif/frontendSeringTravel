import React, {useState, useContext, useEffect} from 'react'
import logo from '../../assets/images/SeringTravelLogo.png'


import './admin.css'

import HomepageManagement from '../../components/Home-page-management/HomepageManagement'
import Paymentmanagement from '../../components/Payment-management/Paymentmanagement'
import Tripsmanagement from '../../components/Trips-management/Tripsmanagement'
import Reportmanagement from '../../components/Report-management/Reportmanagement'
import AdminManagement from '../../components/Admin-management/AdminManagement'
import History from '../../components/History/History'
import { AuthContext } from './../../context/AuthContext'
import { BASE_URL } from '../../utils/config'
import { useNavigate } from 'react-router-dom'

const Admin = () => {
  
  const { user:dataUser, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Lakukan pemeriksaan peran saat komponen dimuat
    if (!dataUser) {
      navigate('/login')
    } else if (dataUser.role==='user'){
      navigate('/')
    }
  }, [dataUser, navigate]);

  const [selectedNavLink, setSelectedNavLink] = useState(0);
  
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
      title:'Pembayaran',
      content:<Paymentmanagement/>,
    },
    // {
    //   title:'Kelola Admin',
    //   content:<AdminManagement/>,
    // },
    // {
    //   title:'Laporan',
    //   content:<Reportmanagement/>,
    // },
    // {
    //   title:'Histori Transaksi',
    //   content:<History/>,
    // },
  ]

  const navOwner__links=[
    {
      title:'Beranda',
      content:<HomepageManagement/>,
    },
    {
      title:'Kelola Trip',
      content:<Tripsmanagement/>
    },
    {
      title:'Pembayaran',
      content:<Paymentmanagement/>,
    },
    {
      title:'Kelola Admin',
      content:<AdminManagement/>,
    },
    {
      title:'Laporan',
      content:<Reportmanagement/>,
    },
    {
      title:'Histori Transaksi',
      content:<History/>,
    },
  ]


  const handleNavLinkSelected = (index) =>{
    setSelectedNavLink(index);
  }

  const logout = ()=>{
    dispatch({type: 'LOGOUT'})
    navigate('/login')
  }

  return (
    
      <div className='outerAdminContainer d-flex'>
        {console.log("user :",dataUser)}
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
                  <>
                  {
                    dataUser === 'admin' && (navAdmin__links.map((item,index)=>
                    <li 
                      key={index}
                      className={`navAdmin__item ${index === selectedNavLink ? 'selected' : ''}`}
                      onClick={()=>handleNavLinkSelected(index)}
                    >
                        <i className="ri-menu-4-line align-bottom me-1"></i>
                      <span>
                        {item.title}
                      </span>
                    </li>
                    ))
                  }
                  {
                    dataUser === 'owner' && (navOwner__links.map((item,index)=>
                    <li 
                      key={index}
                      className={`navAdmin__item ${index === selectedNavLink ? 'selected' : ''}`}
                      onClick={()=>handleNavLinkSelected(index)}
                    >
                        <i className="ri-menu-4-line align-bottom me-1"></i>
                      <span>
                        {item.title}
                      </span>
                    </li>
                    ))
                  }
                </>
                }
                
                
              </ul>
            </div>

            <div className='pt-2 mt-auto'>
              <h6 className='menu__title'>{dataUser.role}</h6>
              <ul className='other__lists'>
                <li>
                  <i className="ri-account-circle-line align-bottom me-1"></i>
                  <span>
                    Admin
                  </span>
                </li>
                <li onClick={logout}>
                  <i className="ri-shut-down-line align-bottom me-1"></i>
                  <span>
                    Keluar
                  </span>
                </li>
              </ul>
            </div>
            
          </div>

        </div>

        <div className='mainContent'>
          <div className='topBarMainContent bg-primary'>
            <div className='Content__title'>
              { 
                dataUser === 'admin' && navAdmin__links[selectedNavLink].title
              }
              { 
                dataUser === 'owner' && navOwner__links[selectedNavLink].title
              }
            </div>
          </div>
          <div className='bottomMainContent'>
            {
              dataUser === 'admin' && navAdmin__links[selectedNavLink].content
            }
            {
              dataUser === 'owner' && navOwner__links[selectedNavLink].content
            }
          </div>
        </div>
      </div>
    
    
  )
}

export default Admin