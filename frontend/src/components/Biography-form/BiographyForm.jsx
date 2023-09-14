import React, {useState} from 'react'
import { Form, FormGroup, Label, Input, Button } from 'reactstrap'

import './biographyForm.css'

  const BiographyForm = ({numOfParticipants, idUpdatedData, onSubmit}) => {
    const initialFormData = {
      participantName: '',
      participantEmail: '',
      participantPhoneNumber: '',
      participantCity: 'Jakarta',
      participantGender: 'laki-laki',
      participantJob: 'Pekerja',
      participantBirthDay: '',
    };
  
    const [formData, setFormData] = useState(Array.from({ length: numOfParticipants }, () => ({ ...initialFormData })));
  
    const cities = ['Jakarta', 'Bogor', 'Depok', 'Tangerang', 'Bekasi'];
    const genders = ['laki-laki', 'perempuan'];
    const jobs = ['Pekerja', 'Pelajar', 'Lainnya'];
  
    const handleInputChange = (index, field, value) => {
      const newFormData = [...formData];
      newFormData[index][field] = value;
      setFormData(newFormData);
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      onSubmit(formData, idUpdatedData);
    };

  return (
    <div className='frame__biographyForm'>
      <Form onSubmit={handleSubmit}>
        {formData.map((data, index) => (
          <div key={index}>
            <h4>Data Peserta {index+1}</h4>
            <FormGroup>
              <Label for={`participantName${index}`}>Nama</Label>
              <Input
                id={`participantName${index}`}
                name={`participantName${index}`}
                value={data.participantName}
                onChange={(event) => handleInputChange(index, 'participantName', event.target.value)}
                placeholder="Kimi No Nawa"
                type="string"
              />
            </FormGroup>

            <FormGroup>
              <Label for={`participantEmail${index}`}>Email</Label>
              <Input
                id={`participantEmail${index}`}
                name={`participantEmail${index}`}
                value={data.participantEmail}
                onChange={(event) => handleInputChange(index, 'participantEmail', event.target.value)}
                placeholder="Email"
                type="email"
              />
            </FormGroup>

            <FormGroup>
              <Label for={`participantPhoneNumber${index}`}>No Hp</Label>
              <Input
                id={`participantPhoneNumber${index}`}
                name={`participantPhoneNumber${index}`}
                value={data.participantPhoneNumber}
                onChange={(event) => handleInputChange(index, 'participantPhoneNumber', event.target.value)}
                placeholder="Nomor Hp"
                type="string"
              />
            </FormGroup>

            <FormGroup>
              <Label for={`participantBirthDay${index}`}>Tanggal Lahir</Label>
              <Input
                id={`participantBirthDay${index}`}
                name={`participantBirthDay${index}`}
                value={data.participantBirthDay}
                onChange={(event) => handleInputChange(index, 'participantBirthDay', event.target.value)}
                type="date"
              />
            </FormGroup>

            <FormGroup>
              <Label for={`participantCity${index}`}>Asal Kota</Label>
              <Input
                id={`participantCity${index}`}
                name={`participantCity${index}`}
                type="select"
                value={data.participantCity}
                onChange={(event) => handleInputChange(index, 'participantCity', event.target.value)}
              >
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </Input>
            </FormGroup>

            <FormGroup>
              <Label for={`participantGender${index}`}>Jenis Kelamin</Label>
              <Input
                id={`participantGender${index}`}
                name={`participantGender${index}`}
                type="select"
                value={data.participantGender}
                onChange={(event) => handleInputChange(index, 'participantGender', event.target.value)}
              >
                {genders.map((gender) => (
                  <option key={gender} value={gender}>
                    {gender}
                  </option>
                ))}
              </Input>
            </FormGroup>

            <FormGroup>
              <Label for={`participantJob${index}`}>Select</Label>
              <Input
                id={`participantJob${index}`}
                name={`participantJob${index}`}
                type="select"
                value={data.participantJob}
                onChange={(event) => handleInputChange(index, 'participantJob', event.target.value)}
              >
                {jobs.map((job) => (
                  <option key={job} value={job}>
                    {job}
                  </option>
                ))}
              </Input>
            </FormGroup>
          </div>
        ))}
        <Button type="submit">Submit</Button>
      </Form>
    </div>
  )
}

export default BiographyForm