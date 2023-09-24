import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  Row,
  Col,
  Container,
  Collapse
} from 'reactstrap';
import './profile.css';
import profilePictDefault from '../../assets/images/profile_pic/default.jpg'
import { AuthContext } from './../../context/AuthContext';
import { BASE_URL } from '../../utils/config';
import Payment from '../../components/Payment-confirmation/Payment';
import BiographyForm from '../../components/Biography-form/BiographyForm';
import EditProfile from '../../components/Edit-profile/EditProfile';
import FormatDate from '../../shared/FormatDate';
import PesananTrip from '../../components/Pesanan-trip/PesananTrip';
import RiwayatPesananTrip from '../../components/Riwayat-PesananTrip/RiwayatPesananTrip';

const Profile = () => {
  const { user, dispatch } = useContext(AuthContext);
  const [selectedContent, setSelectedContent] = useState(0);
  const profileContent = [
    {
      title : 'Pesanan',
      content : <PesananTrip user={user} dispatch={dispatch}/>,
    },
    {
      title : 'Riwayat',
      content : <RiwayatPesananTrip/>
    }
  ]

  let profilePict = profilePictDefault;

  try {
    // Coba memuat gambar sesuai dengan direktori
    profilePict = require(`../../assets/images/profile_pic/${user.username}.JPG`);
  } catch (error) {
    // Gambar sesuai direktori tidak ditemukan, gunakan gambar default
    console.error("Gambar tidak ditemukan:", error);
  }

  const [showEditProfile, setShowEditProfile] = useState(false);



  const handleShowEditProfile = () => {
    setShowEditProfile(!showEditProfile);
  }


  return (
    <div className='outerContainer'>
      
      <Container className='p-3'>
        <Row>
          <Col lg='9'>
            <div>
              <div className='profile__information'>
                <div className='profile__picture'>
                  <img src={profilePict} alt="" />
                </div>
                <div>
                  <h4>
                  {user.username}
                  </h4>
                  <p>Alamat Jalan Jend Sudirman</p>
                </div>
              </div>

            </div>

            
            <div className='ps-0 p-4'>
              <div className='d-flex g-2'>
                {
                  profileContent.map((item, index)=>
                  <>
                  <h5 onClick={()=>setSelectedContent(index)}>{item.title}</h5>
                  </>
                )}
              </div>
                
            

              <div>
                {
                  profileContent[selectedContent].content
                }
                           
              </div>
              
            </div>

            <div>
              


              
            </div>
            

          </Col>

          <Col lg='3'>
            <div>
              <h5>Notifikasi</h5>
              {
                user.bookings && user.bookings.length > 0 && (
                  <div>
                    {user.bookings.length} Pesanan
                  </div>
                )
              }
              {
                user.bookings && user.bookings.length === 0 && (
                  <div>
                    Ayok Pesan Trip Sekarang
                  </div>
                )
              }
            </div>

            <div className='atur-akun mt-3' onClick={handleShowEditProfile}>
              <div className='btn__editProfile'>
               Ubah Akun <i className='ri-arrow-right-s-line'></i>
              </div> 
            </div>
            <div>
            <Collapse isOpen={showEditProfile}>
                  <div className='edit__profile'>
                    <EditProfile user={user} dispatch={dispatch} />
                    <div className='btn__closeEditProfile' onClick={handleShowEditProfile}>
                      <i className="ri-close-line"></i>
                    </div>
                  </div>
              </Collapse>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Profile;

