import React, { useContext, useRef, useState } from 'react';
import {
  Row,
  Col,
  Container,
  Card,
  CardBody,
  CardSubtitle,
  CardTitle,
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

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [modalEditProfile, setModalEditProfile] = useState(false);
  const modalRef = useRef(null);
  const formRef = useRef(null)

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
      <Container className='p-3'>
        <Row>
          <Col lg='8'>
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
              <Card style={{ width: '12rem' }} className='p-1'>
                <i className='ri-close-circle-line position-absolute start'></i>
                <CardBody className='p-3'>
                  <CardTitle tag='h5'>Judul Trip</CardTitle>
                  <CardSubtitle className='mb-2 text-muted' tag='h6'>
                    20/04/2018
                  </CardSubtitle>
                </CardBody>
                <CardBody className='p-2 py-0'>
                  <CardSubtitle>Booked.</CardSubtitle>
                </CardBody>
              </Card>
            </div>
          </Col>

          <Col lg='4'>
            <Payment />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Profile;

