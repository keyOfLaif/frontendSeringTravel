import React, {useState} from 'react'
import { Form, FormGroup, Button, Label, Input, Row, Col } from 'reactstrap'

import './payment.css'

import ImagePreview from '../InputImagePreview/ImagePreview'

const Payment = ({dataBookingProcessSent}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleImageInputted = (event) =>{
    const file = event.target.files[0];
    const allowedTypes = ['image/jpeg', 'image/png'];
    const maxSizeInBytes = 2 * 1024 * 100 ; // 500 Kb

    if (file && allowedTypes.includes(file.type) && file.size <= maxSizeInBytes) {
      setSelectedImage(file);
      setErrorMessage('');
    } else {
      setSelectedImage(null);
      setErrorMessage('Please select a valid image file (JPEG or PNG) within 200Kb.');
    }
  }

  return (
    <div className='frame__payment'>
          {
            dataBookingProcessSent.bookingStatus === 0 ? (
                <h5>Bayar DP</h5>
              ) : (
                <h5>Bayar Pelunasan</h5>
              )
          }
          <form action="">
            <div className='mb-3'>
              <label htmlFor="" className='me-3'>Kode Booking</label>
              <input type="text" />
            </div>
            <div>
              <input type="file" accept="image/*" onChange={handleImageInputted} />
              <ImagePreview selectedImage={selectedImage}/>
            </div>
          </form>
        
    </div>
  )
}

export default Payment