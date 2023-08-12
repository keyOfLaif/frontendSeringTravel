import React, {useState} from 'react';
import { Form, Label, Input, Button } from 'reactstrap';
import { BASE_URL } from '../../utils/config';

import './editProfile.css'

const EditProfile = ({user, close}) => {
    
    const [profileData, setProfileData] = useState({
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
        setProfileData({
          ...profileData,
          [e.target.name]: e.target.value,
        });
      };

      const handleSubmit = async (e) => {

        e.preventDefault();
        console.log('Data yang akan diupdate:', profileData);
    
        try {
          const profileData = new FormData()
          const res = await fetch(`${BASE_URL}/users/${user._id}`, {
            method: 'PUT',
            headers: {
              'content-type': 'application/json',
            },
            body: JSON.stringify(profileData),
          });
    
          const result = await res.json();
          if (!res.ok) {
            return alert(result.message);
          }
    
          alert(result.message);
        } catch (err) {
          alert(err.message);
        }
    
      };

  return (
    <div className='edit__profileform'>
        <h6>Ubah Data Diri</h6>
        <Form >
        <Label>Username:</Label>
        <Input name='username' type='text' value={profileData.username} onChange={handleChange} />

        <Label>Password:</Label>
        <Input name='password' type='password' disabled />

        <Label>Nama Lengkap:</Label>
        <Input name='fullName' type='text' value={profileData.fullName} onChange={handleChange} />

        <Label>Email:</Label>
        <Input name='email' type='email' value={profileData.email} onChange={handleChange} />

        <Label>Asal Kota:</Label>
        <Input name='city' type='select' value={profileData.city} onChange={handleChange}>
            <option value='jakarta'>Jakarta</option>
            <option value='bogor'>Bogor</option>
            <option value='depok'>Depok</option>
            <option value='tangerang'>Tangerang</option>
            <option value='bekasi'>Bekasi</option>
        </Input>

        <Label>Tanggal Lahir:</Label>
        <Input name='birthDate' type='date' value={profileData.birthDate} onChange={handleChange} />

        <Label>Jenis Kelamin:</Label>
        <Input name='gender' type='select' value={profileData.gender} onChange={handleChange}>
            <option></option>
            <option value={1}>laki-laki</option>
            <option value={0}>perempuan</option>
        </Input>

        <Label>WhatsApp:</Label>
        <Input name='whatsApp' type='text' value={profileData.whatsApp} onChange={handleChange} />

        <Button type="submit" onClick={handleSubmit} >Simpan Perubahan</Button>
        </Form>
    </div>
  )
}

export default EditProfile