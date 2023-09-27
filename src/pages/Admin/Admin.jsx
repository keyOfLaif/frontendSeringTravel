import React, {useState, useContext, useEffect} from 'react'
import logo from '../../assets/images/SeringTravelLogo.png'


import './admin.css'

import HomepageManagement from '../../components/Home-page-management/HomepageManagement'
import Paymentmanagement from '../../components/Payment-management/Paymentmanagement'
import Tripsmanagement from '../../components/Trips-management/Tripsmanagement'
import Reportmanagement from '../../components/Report-management/Reportmanagement'
import AdminManagement from '../../components/Admin-management/AdminManagement'
import History from '../../components/History/History'
import AdminProfile from '../../components/Admin-profile/AdminProfile'

import { AuthContext } from './../../context/AuthContext'
import { BASE_URL } from '../../utils/config'
import { useNavigate } from 'react-router-dom'

const Admin = () => {
  
  const { user:dataUser, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Lakukan pemeriksaan peran saat komponen dimuat
    if (!dataUser || dataUser.role === 'user') {
      navigate('/login')
    }
  }, [dataUser, navigate]);

  const [selectedNavLink, setSelectedNavLink] = useState(0);
  const [profile, setProfile] = useState(false);
  
  const navAdmin__links=[
    {
      title:'Kelola Trip',
      content:<Tripsmanagement/>
    },
    {
      title:'Pembayaran',
      content:<Paymentmanagement/>,
    },
  ]

  const navOwner__links=[
    // {
    //   title:'Beranda',
    //   content:<HomepageManagement/>,
    // },
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
    setProfile(false);
  }

  const handleShowProfile = () =>{
    setProfile(true);
    setSelectedNavLink(99);
  }

  const logout = () =>{
    dispatch({type: 'LOGOUT'})
    navigate('/login')
  }

  return (
    <>{dataUser && (
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
              <h6 className='menu__title'>menu</h6>
              <ul className="adminLists">
                  {
                    dataUser.role === 'admin' && (navAdmin__links.map((item,index)=>
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
                    dataUser.role === 'owner' && (navOwner__links.map((item,index)=>
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
              </ul>
            </div>

            <div className='pt-2 mt-auto'>
                { dataUser &&               
                  <h6 className='menu__title'>
                    {dataUser.role}
                  </h6>
                }
              <ul className='other__lists'>
                
                <li onClick={handleShowProfile}>
                <i className="ri-account-circle-line align-bottom me-1"></i>
                  <span>
                    Profile
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
              {
                profile && selectedNavLink === 99 ? (<div className='Content__title'>Profile</div>) : (
                  <>
                    { 
                      dataUser.role === 'admin' && (<div className='Content__title'>{navAdmin__links[selectedNavLink].title}</div>)
                    }
      
                    { 
                      dataUser.role === 'owner' && (<div className='Content__title'>{navOwner__links[selectedNavLink].title}</div>)
                    }
                  </>
                )
              }
          </div>
            {
              profile && selectedNavLink === 99 ? (<div className='bottomMainContent'><AdminProfile/></div>) : (
                <>
                  {
                    dataUser.role === 'admin' && (<div className='bottomMainContent'>{navAdmin__links[selectedNavLink].content}</div>)
                  }
                  {
                    dataUser.role === 'owner' && (<div className='bottomMainContent'>{navOwner__links[selectedNavLink].content}</div>)
                  }
                </>
              )
            }
            
        </div>
      </div>
    )}
    </>
    
    
  )
}

export default Admin