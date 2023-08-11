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

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [modalEditProfile, setModalEditProfile] = useState(false);
  const [numOfParticipants, setNumOfParticipants] = useState(1);
  const [showPaymentComponent, setShowPaymentComponent] = useState(false);
  const [selectedBookingProcess, setSelectedBookingProcess] = useState([]);
  const [showInputDataComponent, setShowInputDataComponent] = useState(false);
  
  const formRef = useRef(null)
  const paymentRef = useRef(null)

  const scrollToPayment = () => {
    // Mencari referensi ke komponen Payment dan menjalankan scrollIntoView()
    if (paymentRef.current) {
      paymentRef.current.scrollIntoView({ behavior: "smooth" });
    }
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

  const toggleEditProfile = () => setModalEditProfile(!modalEditProfile);

  const [formData, setFormData] = useState({
    username: user.username || '',
    fullName: user.fullName || '',
    email: user.email || '',
    city: user.city || '',
    birthDate: user.birthDate ? user.birthDate.split('T')[0] : '',
    gender: user.gender || '',
    photo: user.photo || '',
    whatsApp: user.whatsApp || '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitParticipants = (formData) =>{
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Data yang akan diupdate:', formData);

    try {
      const formData = new FormData(formRef.current)
      const res = await fetch(`${BASE_URL}/users/${user._id}`, {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (!res.ok) {
        return alert(result.message);
      }

      alert(result.message);
    } catch (err) {
      alert(err.message);
    }

    toggleEditProfile();
  };

  return (
    <div className='outerContainer'>
      {console.log(user)}
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

              <Modal isOpen={modalEditProfile} toggle={toggleEditProfile}>
                <ModalHeader toggle={toggleEditProfile}>Edit Profile</ModalHeader>
                <ModalBody>

                  <Form innerRef={formRef}>
                    <Label>Username:</Label>
                    <Input name='username' type='text' value={formData.username} onChange={handleChange} />

                    <Label>Password:</Label>
                    <Input name='password' type='password' disabled />

                    <Label>Nama Lengkap:</Label>
                    <Input name='fullName' type='text' value={formData.fullName} onChange={handleChange} />

                    <Label>Email:</Label>
                    <Input name='email' type='email' value={formData.email} onChange={handleChange} />

                    <Label>Asal Kota:</Label>
                    <Input name='city' type='select' value={formData.city} onChange={handleChange}>
                      <option value='jakarta'>Jakarta</option>
                      <option value='bogor'>Bogor</option>
                      <option value='depok'>Depok</option>
                      <option value='tangerang'>Tangerang</option>
                      <option value='bekasi'>Bekasi</option>
                    </Input>

                    <Label>Tanggal Lahir:</Label>
                    <Input name='birthDate' type='date' value={formData.birthDate} onChange={handleChange} />

                    <Label>Jenis Kelamin:</Label>
                    <Input name='gender' type='select' value={formData.gender} onChange={handleChange}>
                      <option></option>
                      <option value={1}>laki-laki</option>
                      <option value={0}>perempuan</option>
                    </Input>

                    <Label>WhatsApp:</Label>
                    <Input name='whatsApp' type='text' value={formData.whatsApp} onChange={handleChange} />
                  </Form>
                </ModalBody>

                <ModalFooter>
                  <Button color='primary' onClick={handleSubmit}>
                    Simpan Perubahan
                  </Button>{' '}
                  <Button color='secondary' onClick={toggleEditProfile}>
                    Batal
                  </Button>
                </ModalFooter>
              </Modal>
            </div>
            <p>Alamat Jalan Jend Sudirman</p>
            <div className='ps-0 p-4'>
              <h5>Trip Pesanan</h5>
              <div>
                {
                  user.bookings.map((notif,index)=>
                  <div className='bookings__lists' key={index} onClick={() => handleShowPayment(index)}>
                    <h6>Trip {notif.tripBooked.tripDate} </h6>
                    <div>
                      {notif.bookingStatus === 0 ? 'Bayar DP' : 'Lunasi Pembayaran'}
                    </div>
                    <div>
                      {notif.bookings.participants.length === 0 ? (
                        <div onClick={()=>handleShowInputDataComponent(index)}></div>
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
                    <BiographyForm numOfParticipants={selectedBookingProcess.bookings.participantCount} onSubmit={handleSubmitParticipants}/>
                    <button onClick={handleCloseInputDataComponent}></button>
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

            <div className='atur-akun'>
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

