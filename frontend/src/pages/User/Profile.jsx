import React, {useContext, useRef, useState} from 'react'
import {Row, Col, Container, Card, CardBody, CardText,CardSubtitle, CardTitle, Modal, ModalBody, ModalHeader, ModalFooter, Button, Label, Input, Form} from 'reactstrap'
import './profile.css'

import { AuthContext } from './../../context/AuthContext'
import { BASE_URL } from '../../utils/config';
import Payment from '../../components/Payment-confirmation/Payment'

const Profile = () => {
  const {user} = useContext(AuthContext);
  const [modalEditProfile, setModalEditProfile] = useState(false);
  const modalRef = useRef(null);

  const toggleEditProfile = () => setModalEditProfile(!modalEditProfile);

  // State untuk menyimpan nilai-nilai input pengguna yang diubah
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

  // Handle perubahan nilai input pada form
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle submit form saat pengguna mengubah data
  const handleSubmit = async (e) => {
    e.preventDefault()
    // Lakukan aksi update ke backend dengan formData
    // Implementasi kode untuk mengirim data ke backend, misalnya menggunakan fetch atau Axios
    // Setelah berhasil mengirim, Anda bisa mengganti data user pada state atau refresh halaman jika diperlukan
    console.log('Data yang akan diupdate:', formData);
    
    try {

      const res = await fetch(`${BASE_URL}/users/${user._id}`, {
        method: 'PUT',
        headers: {
          'content-type':'application/json'
        },
        body: JSON.stringify(formData)
      })

      const result = await res.json()
      if (!res.ok) {
        return alert(result.message);
      }

      alert(result.message)

    } catch (err) {
      alert(err.message)
    }

    // Setelah berhasil diupdate, tutup modal
    toggleEditProfile();
  };

  return (
    
    <div className='outerContainer'>
    <Container className='p-3'>
    <Row>
      <Col lg='8'>
        <div>
          <h4>
              {user.username}
            <span>
              <i className="ri-pencil-line ms-4 align-bottom" onClick={toggleEditProfile}></i>
            </span>
          </h4>
          <React.Fragment>
            <Modal isOpen={modalEditProfile} toggle={toggleEditProfile} innerRef={modalRef} unstable_strictmode="false">
                  <ModalHeader toggle={toggleEditProfile}>Edit Profile</ModalHeader>
                  <ModalBody>
                    <Form>
                      <Label>Username:</Label>
                      <Input
                        name='username'
                        placeholder={user.username}
                        type='text'
                        value={formData.username}
                        onChange={handleChange}
                      />

                      <Label>Password:</Label>
                      {/* Tidak diperlihatkan untuk mengubah password di sini, dapat ditambahkan fitur khusus */}
                      <Input
                        name='password'
                        placeholder='******'
                        type='password'
                        disabled
                      />

                      <Label>Nama Lengkap:</Label>
                      <Input
                        name='fullName'
                        placeholder={user.fullName}
                        type='text'
                        value={formData.fullName}
                        onChange={handleChange}
                      />

                      <Label>Email:</Label>
                      <Input
                        name='email'
                        placeholder={user.email}
                        type='email'
                        value={formData.email}
                        onChange={handleChange}
                      />

                      <Label>Asal Kota:</Label>
                      <Input
                        name='city'
                        placeholder={user.city}
                        type='select'
                        value={formData.city}
                        onChange={handleChange}
                      >
                        <option value='jakarta'>Jakarta</option>
                        <option value='bogor'>Bogor</option>
                        <option value='depok'>Depok</option>
                        <option value='tangerang'>Tangerang</option>
                        <option value='bekasi'>Bekasi</option>
                      </Input>

                      <Label>Tanggal Lahir:</Label>
                      <Input
                        name='birthDate'
                        placeholder={user.birthDate}
                        type='date'
                        value={formData.birthDate}
                        onChange={handleChange}
                      />

                      <Label>Jenis Kelamin:</Label>
                      <Input
                        name='gender'
                        placeholder={user.gender}
                        type='select'
                        value={formData.gender}
                        onChange={handleChange}
                      >
                        <option></option>
                        <option>laki-laki</option>
                        <option>perempuan</option>
                      </Input>

                      {/* <Label>Foto Profil:</Label>
                      
                      {user.photo && <img src={user.photo} alt='Foto Profil' style={{ width: '100px' }} />}
                      <Input
                        name='photo'
                        type='file' 
                        onChange={handleChange} 
                      /> */}

                      <Label>WhatsApp:</Label>
                      <Input
                        name='whatsApp'
                        placeholder={user.whatsApp}
                        type='text'
                        value={formData.whatsApp}
                        onChange={handleChange}
                      />
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
          </React.Fragment>
        </div>
        <p>
          Alamat Jalan Jend Sudirman
        </p>
        <div className="ps-0 p-4">
            <Card
              style={{
                width: '12rem'
              }}
              className='p-1'
            >
              <i className="ri-close-circle-line position-absolute start"></i>
              <CardBody className='p-3'>
                <CardTitle tag="h5">
                  Judul Trip
                </CardTitle>
                <CardSubtitle
                  className="mb-2 text-muted"
                  tag="h6"
                >
                  20/04/2018
                </CardSubtitle>
              </CardBody>
              {/* <img
                alt="Card cap"
                src=""
                width="100%"
              /> */}
              <CardBody className='p-2 py-0'>
                <CardText>
                  Booked.
                </CardText>
              </CardBody>
            </Card>
        </div>
      
        </Col>

      <Col lg='4'>
        <Payment/>
      </Col>
    </Row>
    </Container>
    </div>
  )
}

export default Profile