import React, {useState} from 'react'

import './payment.css'

import ImagePreview from '../InputImagePreview/ImagePreview'
import { BASE_URL } from '../../utils/config';

const Payment = ({dataBookingProcessSent}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [paymentType, setPaymentType] = useState('')


  const handlePaymentTypeChange = (event) => {
    const selectedPaymentType = event.target.value;
    console.log('Selected payment Type:', selectedPaymentType)
    setPaymentType(selectedPaymentType);
  };


  const handleImageInputted = (event) =>{
    const file = event.target.files[0];
    const allowedTypes = ['image/jpeg', 'image/png'];
    const maxSizeInBytes = 5 * 1024 * 100 ; // 500 Kb

    if (file && allowedTypes.includes(file.type) && file.size <= maxSizeInBytes) {
      setSelectedImage(file);
      setErrorMessage('');
    } else {
      setSelectedImage(null);
      setErrorMessage('Please select a valid image file (JPEG or PNG) within 200Kb.');
    }

  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("paymenttypebefor:", paymentType)
    const formData = new FormData();
    formData.append('paymentType', paymentType);
    formData.append('paymentProof', selectedImage);
    
    try {
      const confirmed = window.confirm("Apakah ini sudah benar?");
      if(confirmed){
        const response = await fetch(`${BASE_URL}/bookings/${dataBookingProcessSent._id}`, {
          method: 'PUT',
          body: formData
        });
  
        const responseData = await response.json();
      }
    } 
    catch (error) {
      console.error(error); // Handle error
    }
    
  };

  return (
    <div className='frame__payment'>
          Pembayaran
          <form>
              <select required name="paymentType" id="paymentType" onChange={handlePaymentTypeChange}>
                {
                  dataBookingProcessSent.dp === 0 && <option value="DP">Bayar DP Rp.{dataBookingProcessSent.participantCount * (dataBookingProcessSent.tripBooked.price/2)}</option>
                }
                <option value="FullPayment">Bayar Pelunasan {dataBookingProcessSent.participantCount * (dataBookingProcessSent.tripBooked.price)}</option>
              </select>

              <input type="file" name="paymentProof" id='paymentProof' accept="image/*" onChange={handleImageInputted} />
              <ImagePreview selectedImage={selectedImage}/>

            <button type="button" onClick={handleSubmit}>
              Kirim Bukti Pembayaran
            </button>
          </form>
        
    </div>
  )
}

export default Payment