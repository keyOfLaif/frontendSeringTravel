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

const Profile = () => {
  const { user, dispatch } = useContext(AuthContext);

  const initialBookingStates = user.bookings.map(() => ({
    showPayment: false,
    showInputData: false,
  }));
  const [bookingStates, setBookingStates] = useState(initialBookingStates);


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

  const handleShowInputDataComponent = (index) => {
    const updatedBookingStates = [...bookingStates];
    updatedBookingStates[index] = {
      ...updatedBookingStates[index],
      showInputData: !updatedBookingStates[index].showInputData,
    };
    setBookingStates(updatedBookingStates);
  }
  
  const handleShowPayment = (index) =>{
    const updatedBookingStates = [...bookingStates];
    updatedBookingStates[index] = {
      ...updatedBookingStates[index],
      showPayment: !updatedBookingStates[index].showPayment,
    };
    setBookingStates(updatedBookingStates);
  }

  const handleSubmitParticipants = async (arrayParticipants, idUpdatedData) =>{
    try {
      const response = await fetch(`${BASE_URL}/bookings/updateBookers/${idUpdatedData}`, {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(arrayParticipants),
      });
      const dataReponse = await response.json();
      return alert(dataReponse.message);
    } catch (error) {
      return  alert(error.message);
    }
  };

  const deleteBooking = async (e) => {
    try {
      const confirmed = window.confirm("Apakah Anda yakin ingin menghapus pesanan ini?");
      if(confirmed){
        const response = await fetch(`${BASE_URL}/bookings/${e}`, {
          method: 'DELETE',
          headers: {
            'content-type': 'application/json',
          }
        });
        const dataReponse = await response.json();
        return dataReponse;
      }
    } catch (error) {
      console.error(error);
    }
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
              <h5>Trip Pesanan</h5>
              {console.log(user)}
              <div>
                {
                  user.bookings.map((notif,index)=>
                  <div className='bookings__lists mb-2' key={index}>
                    <div className='d-flex align-items-end justify-content-between'>
                      <div>
                        Trip <FormatDate dateString={notif.tripBooked.tripDate}/> Untuk : {notif.participantCount} Status Pesanan : {notif.paymentStatus}
                      </div>

                      <div>
                        Dp (
                        {
                          notif.dp === 0 && <i className='ri-close-line'></i>
                        }
                        {
                          notif.dp === 1 && <i className="ri-loader-2-line"></i>
                        }
                        {
                          notif.dp === 2 && <i className="ri-loader-2-line"></i>
                        } )
                      </div>

                      <div>
                        Lunas (
                        {
                          notif.fullPayment === 0 && <i className='ri-close-line'></i>
                        }
                        {
                          notif.fullPayment === 1 && <i className="ri-loader-2-line"></i>
                        }
                        {
                          notif.fullPayment === 2 && <i className="ri-loader-2-line"></i>
                        } )
                      </div>

                      {
                        notif.paymentStatus !== 'lunas' &&
                        <div onClick={() => handleShowPayment(index)} className='btn__payBooking clicked'>
                        Bayar
                        <i className='ri-arrow-down-s-line'></i>
                        </div>
                      }

                        {notif.participants.length === 0 ? (
                          <div onClick={() => handleShowInputDataComponent(index)} className='btn__inputData'>
                            Isi Data Pemesan
                            <i className='ri-arrow-down-s-line'></i>
                          </div>
                        ) : (
                          <div>Kamus sudah mengisi data peserta, Mau mengisi lagi?</div>
                        )}
                        <i onClick={()=>deleteBooking(notif._id)} className="ri-close-line btn__deleteBooking"></i>
                    </div>

                    <Collapse isOpen={bookingStates[index].showPayment}>
                      <Payment dataBookingProcessSent={notif}/>
                    </Collapse>
                    
                    <Collapse isOpen={bookingStates[index].showInputData}>
                      <BiographyForm numOfParticipants={notif.participantCount - notif.participants.length} idUpdatedData={notif._id} onSubmit={handleSubmitParticipants}/>
                    </Collapse>
                  </div>
                  )
                }
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

            <div>
              <h5>Riwayat Trip</h5>
              <h6>Trip Bromo</h6>
              <ul className='p-0'>
                <li>
                  20 Januari 2019
                </li>
                <li>
                  30 April 2019
                </li>
                <li>
                  20 Maret 2020
                </li>
              </ul>
            </div>

            <div className='atur-akun' onClick={handleShowEditProfile}>
              <div className='btn__editProfile'>
               Ubah Akun <i className='ri-arrow-right-s-line'></i>
              </div> 
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Profile;

