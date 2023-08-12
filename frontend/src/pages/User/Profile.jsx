import React, { useContext, useRef, useState } from 'react';
import {
  Row,
  Col,
  Container,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Button,
  Label,
  Input,
  Form,
} from 'reactstrap';
import './profile.css';
import { AuthContext } from './../../context/AuthContext';
import { BASE_URL } from '../../utils/config';
import Payment from '../../components/Payment-confirmation/Payment';
import BiographyForm from '../../components/Biography-form/BiographyForm';
import EditProfile from '../../components/Edit-profile/EditProfile';

const Profile = () => {
  const { user, dispatch } = useContext(AuthContext);
  const [modalEditProfile, setModalEditProfile] = useState(false);
  const [numOfParticipants, setNumOfParticipants] = useState(1);
  const [showPaymentComponent, setShowPaymentComponent] = useState(false);
  const [selectedBookingProcess, setSelectedBookingProcess] = useState([]);
  const [showInputDataComponent, setShowInputDataComponent] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false)
  
  const formRef = useRef(null)
  const paymentRef = useRef(null)
  const inputBiodataRef = useRef(null)

  const scrollToPayment = () => {
    // Mencari referensi ke komponen Payment dan menjalankan scrollIntoView()
    if (paymentRef.current) {
      paymentRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }

  const handleShowEditProfile = () => {
    setShowEditProfile(true);
  }

  const handleShowInputDataComponent = (index) => {
    setSelectedBookingProcess(user.bookings[index]);
    setShowInputDataComponent(true);
  }
  
  const handleShowPayment = (index) =>{
    setSelectedBookingProcess(user.bookings[index]);
    setShowPaymentComponent(true);
  }

  const handleCloseInputDataComponent = () =>{
    setShowInputDataComponent(false);
  }

  const handleClosePayment = () =>{
    setShowPaymentComponent(false);
  }

  const handleCloseEditProfile = ()=>{
    setShowEditProfile(false);
  }

  const toggleEditProfile = () => setModalEditProfile(!modalEditProfile);

  // const [profileData, setProfileData] = useState({
  //   username: user.username || '',
  //   fullName: user.fullName || '',
  //   email: user.email || '',
  //   city: user.city || '',
  //   birthDate: user.birthDate ? user.birthDate.split('T')[0] : '',
  //   gender: user.gender || '',
  //   photo: user.photo || '',
  //   whatsApp: user.whatsApp || '',
  // });

  // const handleChange = (e) => {
  //   setProfileData({
  //     ...profileData,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  const handleSubmitParticipants = (profileData) =>{
    console.log(profileData);
  };

  const deleteBooking = async (e) => {
    try {
      const response = await fetch(`${BASE_URL}/bookings/${e}`, {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json',
        }
      });

      const dataReponse = await response.json();
      return dataReponse;
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
              <h4>
                {user.username}
                <span>
                  <i className='ri-pencil-line ms-4 align-bottom' onClick={toggleEditProfile}></i>
                </span>
              </h4>


              <div>
                {
                  showEditProfile &&
                  <div className='edit__profile'>
                    <EditProfile user={user} dispatch={dispatch} />
                    <div className='btn__closeEditProfile' onClick={handleCloseEditProfile}>
                      <i className="ri-close-line"></i>
                    </div>
                  </div>
                }
              </div>

            </div>

            <p>Alamat Jalan Jend Sudirman</p>
            <div className='ps-0 p-4'>
              <h5>Trip Pesanan</h5>
              <div>
                {
                  user.bookings.map((notif,index)=>
                  <div className='bookings__lists' key={index} onClick={() => handleShowPayment(index)}>
                    <div className='d-flex'>
                      Trip {notif.tripBooked.tripDate}
                      <div onClick={()=>deleteBooking(notif._id)} className='deleteBooking__button'>
                        <i className="ri-close-line"></i>
                      </div>
                    </div>
                    <div>
                      {notif.bookingStatus === 0 ? 'Bayar DP' : 'Lunasi Pembayaran'}
                    </div>
                    <div>
                      {notif.participants.length === 0 ? (
                        <div onClick={()=>handleShowInputDataComponent(index)}>Isi Data</div>
                      ) : (
                        <div>Kamus sudah mengisi data peserta, Mau mengisi lagi?</div>
                      )}
                    </div>
                  </div>
                  )
                }
              </div>
              
            </div>

            <div ref={paymentRef}>
              {showPaymentComponent && (
                <div>
                  <Payment dataBookingProcessSent = {selectedBookingProcess}/>
                  <button onClick={handleClosePayment}>Close</button>
                </div>
              )
              }
            </div>

            <div ref={inputBiodataRef}>
              {
                showInputDataComponent && (
                  <div>
                    <BiographyForm numOfParticipants={selectedBookingProcess.participantCount} onSubmit={handleSubmitParticipants}/>
                    <button onClick={handleCloseInputDataComponent}>Close</button>
                  </div>
                )
              }
            </div>
            
            {/* <div className='booking__process'>
              <div className='box__process'>
                <Payment />
              </div>
              <div className='box__process'>
                <BiographyForm numOfParticipants={2} onSubmit={handleSubmitParticipants}/>
              </div>
            </div> */}

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
              <span>
               Ubah Akun <i className='ri-arrow-right-s-line'></i>
              </span> 
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Profile;

