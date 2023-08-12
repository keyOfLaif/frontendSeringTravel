import React, {useState} from 'react';
import { Form, Label, Input, Button } from 'reactstrap';
import { BASE_URL } from '../../utils/config';

import './editProfile.css'

const EditProfile = ({user, dispatch}) => {
    
    const [profileDataUpdated, setProfileDataUpdated] = useState({
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
        const {name,value} = e.target;
        setProfileDataUpdated({
          ...profileDataUpdated,
          [name]: value,
        });
        
        
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const res = await fetch(`${BASE_URL}/users/${user._id}`, {
            method: 'PUT',
            headers: {
              'content-type': 'application/json',
            },
            body: JSON.stringify(user),
          });
    
          const result = await res.json();
          if (!res.ok) {
            return alert(result.message);
          }

          dispatch({type:'UPDATE_USER_DATA', payload: profileDataUpdated})
    
          alert(result.message);
        } catch (err) {
          console.err("Error: ", err)
          alert(err.message);
        }
    
      };

  return (
    <div className='edit__profileform'>
        <h6>Ubah Data Diri</h6>
        <Form >
        <Label>Username:</Label>
        <Input name='username' type='text' placeholder={profileDataUpdated.username} onChange={handleChange} />

        <Label>Password:</Label>
        <Input name='password' type='password' disabled />

        <Label>Nama Lengkap:</Label>
        <Input name='fullName' type='text' placeholder={profileDataUpdated.fullName} onChange={handleChange} />

        <Label>Email:</Label>
        <Input name='email' type='email' placeholder={profileDataUpdated.email} onChange={handleChange} />

        <Label>Asal Kota:</Label>
        <Input name='city' type='select' value={profileDataUpdated.city} onChange={handleChange}>
            <option value='jakarta'>Jakarta</option>
            <option value='bogor'>Bogor</option>
            <option value='depok'>Depok</option>
            <option value='tangerang'>Tangerang</option>
            <option value='bekasi'>Bekasi</option>
        </Input>

        <Label>Tanggal Lahir:</Label>
        <Input name='birthDate' type='date' value={profileDataUpdated.birthDate} onChange={handleChange} />

        <Label>Jenis Kelamin:</Label>
        <Input name='gender' type='select' value={profileDataUpdated.gender} onChange={handleChange}>
            <option></option>
            <option value={true}>laki-laki</option>
            <option value={false}>perempuan</option>
        </Input>

        <Label>WhatsApp:</Label>
        <Input name='whatsApp' type='text' placeholder={profileDataUpdated.whatsApp} onChange={handleChange} />

        <Button type="submit" onClick={handleSubmit} >Simpan Perubahan</Button>
        </Form>
    </div>
  )
}

export default EditProfile