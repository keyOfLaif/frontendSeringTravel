import React, {useState, useEffect} from 'react';
import { Form, Label, Input, Button } from 'reactstrap';
import { BASE_URL } from '../../utils/config';

import './editProfile.css'

const EditProfile = ({user, dispatch}) => {

  //inisiasi variabel untuk data baru dan perubahannya
  const [newUsername, setNewUsername] = useState(user.username)
  const [newEmail, setNewEmail] = useState(user.email)
  const [newFullName, setNewFullName] = useState(user.fullName)
  const [newWhatsApp, setNewWhatsApp] = useState(user.whatsApp)
  const [newCity, setNewCity] = useState(user.city)
  const [newBirthDate, setNewBirthDate] = useState(user.birthDate)
  const [newGender, setNewGender] = useState(user.gender)

  //inisiasi variabel untuk cek perubahan data
  const [isUsernameChanged, setIsUsernameChanged] = useState(false)
  const [isEmailChanged, setIsEmailChanged] = useState(false)
  const [isFullNameChanged, setIsFullNameChanged] = useState(false)
  const [isWhatsAppChanged, setIsWhatsAppChanged] = useState(false)
  const [isCityChanged, setIsCityChanged] = useState(false)
  const [isBirthDateChanged, setIsBirthDateChanged] = useState(false)
  const [isGenderChanged, setIsGenderChanged] = useState(false)

  const handleUsernameChange = (event) =>{
    setNewUsername(event.target.value);
    setIsUsernameChanged(event.target.value !== user.username)
  }
  const handleEmailChange = (event) =>{
    setNewEmail(event.target.value);
    setIsEmailChanged(event.target.value !== user.email)
  }
  const handleFullNameChange = (event) =>{
    setNewFullName(event.target.value);
    setIsFullNameChanged(event.target.value !== user.fullName)
  }
  const handleWhatsAppChange = (event) =>{
    setNewWhatsApp(event.target.value);
    setIsWhatsAppChanged(event.target.value !== user.whatsApp)
  }
  const handleCityChange = (event) =>{
    setNewCity(event.target.value);
    setIsCityChanged(event.target.value !== user.city)
  }
  const handleBirthDateChange = (event) =>{
    setNewBirthDate(event.target.value);
    setIsBirthDateChanged(event.target.value !== user.birthDate)
  }
  const handleGenderChange = (event) =>{
    setNewGender(event.target.value);
    setIsGenderChanged(event.target.value !== user.gender)
  }
    
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

    const handleSave = async (e) => {
      e.preventDefault();
    // Simpan perubahan ke server (Anda perlu mengimplementasikan logika ini)
    try {
      const newUserData = {
        username: newUsername,
        email: newEmail,
        fullName: newFullName,
        whatsApp: newWhatsApp,
        city: newCity,
        birthDate: newBirthDate,
        gender: newGender,
      }
      const res = await fetch(`${BASE_URL}/users/${user._id}`, {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(newUserData),
      });

      const result = await res.json();
      if (!res.ok) {
        return alert(result.message);
      }

      // Setelah berhasil disimpan, perbarui state user
      dispatch({
        type: 'UPDATE_USER_DATA',
        payload: {
          ...user,
          username: newUsername,
          email: newEmail,
          fullName: newFullName,
          whatsApp: newWhatsApp,
          city: newCity,
          birthDate: newBirthDate,
          gender: newGender,
        },
      });
      setIsEmailChanged(false);
      setIsFullNameChanged(false);
      setIsUsernameChanged(false);
      setIsWhatsAppChanged(false);
      setIsCityChanged(false);
      setIsBirthDateChanged(false);
      setIsGenderChanged(false);

      alert(result.message);
    } catch (err) {
      console.err("Error: ", err)
      alert(err.message);
    }
    
    };

    useEffect(() => {
      setIsUsernameChanged(newUsername !== user.username);
      setIsEmailChanged(newEmail !== user.email);
      setIsFullNameChanged(newFullName !== user.fullName);
      setIsWhatsAppChanged(newWhatsApp !== user.whatsApp);
      setIsCityChanged(newCity !== user.city);
      setIsBirthDateChanged(newBirthDate !== user.birthDate);
      setIsGenderChanged(newGender !== user.gender);
    }, [newUsername, newFullName, newEmail, newWhatsApp, newCity, newBirthDate, newGender]);

  return (
    <div className='edit__profileform'>
        <h6>Ubah Data Diri</h6>
        <Form >
        <Label>Username:</Label>
        <Input name='username' type='text' value={newUsername} onChange={handleUsernameChange} />

        <Label>Password:</Label>
        <Input name='password' type='password' disabled />

        <Label>Nama:</Label>
        <Input name='fullName' type='text' value={newFullName} onChange={handleFullNameChange} />

        <Label>Email:</Label>
        <Input name='email' value={newEmail} onChange={handleEmailChange} />

        <Label>Asal Kota:</Label>
        <Input name='city' type='select' value={newCity} onChange={handleCityChange}>
            <option value='jakarta'>Jakarta</option>
            <option value='bogor'>Bogor</option>
            <option value='depok'>Depok</option>
            <option value='tangerang'>Tangerang</option>
            <option value='bekasi'>Bekasi</option>
        </Input>

        <Label>Tanggal Lahir:</Label>
        <Input name='birthDate' type='date' value={newBirthDate} onChange={handleBirthDateChange} />

        <Label>Jenis Kelamin:</Label>
        <Input name='gender' type='select' value={newGender} onChange={handleGenderChange}>
            <option></option>
            <option value={true}>laki-laki</option>
            <option value={false}>perempuan</option>
        </Input>

        <Label>WhatsApp:</Label>
        <Input name='whatsApp' value={newWhatsApp} onChange={handleWhatsAppChange} />

        <Button type="submit" onClick={handleSubmit} >Simpan Perubahan</Button>
        <Button type="submit" onClick={handleSave} disabled={!isEmailChanged && !isFullNameChanged && !isUsernameChanged && !isWhatsAppChanged && !isCityChanged && !isBirthDateChanged && !isGenderChanged}>Simpan</Button>
        </Form>
    </div>
  )
}

export default EditProfile