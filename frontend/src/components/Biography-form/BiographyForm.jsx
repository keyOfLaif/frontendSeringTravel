import React, {useContext, useState, useEffect} from 'react'
import { Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap'

import './biographyForm.css'
import { AuthContext } from '../../context/AuthContext'

const BiographyForm = ({numOfParticipants, idUpdatedData, onSubmit, participantData}) => {
  function formatDate(dateString) {
    if (!dateString) return ''; // Mengembalikan string kosong jika tanggal kosong
  
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  }

  const {user, dispatch} = useContext(AuthContext)

  const [newParticipantData, setNewParticipantData] = useState([]);
  const [areParticipantDataChanged, setAreParticipantDataChanged] = useState(false);
  const [isSaveSuccess, setIsSaveSuccess] = useState(false);

  useEffect(() => {
    setNewParticipantData([...participantData]);
    setAreParticipantDataChanged(false); // At initialization, data is not changed
    setIsSaveSuccess(false); // Reset the save success message
  }, [participantData]);

  const handleParticipantDataChange = (index, field, value) => {
    const updatedParticipantData = [...newParticipantData];
    updatedParticipantData[index][field] = value;
    setNewParticipantData(updatedParticipantData);
    setAreParticipantDataChanged(true);
  };

  const handleSave = () => {
    // Prepare data in the format expected by onSubmit
    const dataToSubmit = newParticipantData.map((participant) => ({
      id: participant.id, // Add an ID property if you have it
      name: participant.name,
      email: participant.email,
      phone: participant.phone,
      birthDay: participant.birthDay,
      city: participant.city,
      gender: participant.gender,
      job: participant.job,
    }));

    // Simpan perubahan ke server (Anda perlu mengimplementasikan logika ini)
    onSubmit(dataToSubmit, idUpdatedData)
      .then(() => {
        // Setelah berhasil disimpan, perbarui state user dan reset status perubahan
        dispatch({
          type: 'UPDATE_USER_DATA',
          payload: {
            ...user,
            participants: dataToSubmit,
          },
        });
        setAreParticipantDataChanged(false);
        setIsSaveSuccess(true);
      })
      .catch((error) => {
        console.error('Gagal menyimpan data:', error);
        // Handle error here, e.g., display an error message to the user
      });
  };

  
    const cities = ['Jakarta', 'Bogor', 'Depok', 'Tangerang', 'Bekasi'];
    const genders = ['laki-laki', 'perempuan'];
    const jobs = ['Pekerja', 'Pelajar', 'Lainnya'];
  
    
  return (
    <div className='frame__biographyForm'>
      <Form >
        {
          newParticipantData.map((newParticipant, index)=>(
            <div key={index}>
              <h6>Peserta {index+1}</h6>
            <FormGroup>
              <Label>Nama</Label>
              <Input
                value={newParticipant.name}
                onChange={(e) => handleParticipantDataChange(index, 'name', e.target.value)}
                type="string"
              />
            </FormGroup>

            <FormGroup>
              <Label>Email</Label>
              <Input
                value={newParticipant.email}
                onChange={(e) => handleParticipantDataChange(index, 'email', e.target.value)}
                type="email"
              />
            </FormGroup>

            <FormGroup>
              <Label>No Hp</Label>
              <Input
                value={newParticipant.phone}
                onChange={(e) => handleParticipantDataChange(index, 'phone', e.target.value)}
                type="string"
              />
            </FormGroup>

            <FormGroup>
              <Label>Tanggal Lahir</Label>
              <Input
                value={formatDate(newParticipant.birthDay)}
                onChange={(e) => handleParticipantDataChange(index, 'birthDay', e.target.value)}
                type="date"
              />
            </FormGroup>

            <FormGroup>
              <Label>Asal Kota</Label>
              <Input
                type="select"
                value={newParticipant.city}
                onChange={(e) => handleParticipantDataChange(index, 'city', e.target.value)}
              >
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </Input>
            </FormGroup>

            <FormGroup>
              <Label>Jenis Kelamin</Label>
              <Input
                type="select"
                value={newParticipant.gender}
                onChange={(e) => handleParticipantDataChange(index, 'gender', e.target.value)}
              >
                {genders.map((gender) => (
                  <option key={gender} value={gender}>
                    {gender}
                  </option>
                ))}
              </Input>
            </FormGroup>

            <FormGroup>
              <Label>Profesi</Label>
              <Input
                type="select"
                value={newParticipant.job}
                onChange={(e) => handleParticipantDataChange(index, 'job', e.target.value)}
              >
                {jobs.map((job) => (
                  <option key={job} value={job}>
                    {job}
                  </option>
                ))}
              </Input>
            </FormGroup>
            </div>
          ))
        }
        
        <Button onClick={handleSave} disabled={!areParticipantDataChanged}>
          Simpan
        </Button>
      {isSaveSuccess && (
          <Alert color="success" className="mt-3">
            Data berhasil disimpan.
          </Alert>
        )}
      </Form>
    </div>
  )
}

export default BiographyForm