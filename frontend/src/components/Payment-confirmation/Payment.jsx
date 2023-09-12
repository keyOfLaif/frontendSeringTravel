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

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('paymentType', paymentType);
    formData.append('paymentProof', selectedImage);
    
    try {
      const confirmed = window.confirm("Apakah ini sudah benar?");
      if(confirmed){
        const response = await fetch(`${BASE_URL}/bookings/${dataBookingProcessSent._id}`, {
          method: 'PUT',
          body: formData,
        });
  
        const responseData = await response.json();

        // const bookingsDataUpdated = {
        //   ...user,
        //   bookings:[...user.bookings, responseData.data]
        // }

        // dispatch({type:'UPDATE_USER_DATA', payload: bookingsDataUpdated})
        return alert(responseData.message);
      }
    } 
    catch (error) {
      console.error(error); // Handle error
      return alert(error.message)
    }
    
  };

  return (
    <div className='frame__payment'>
          Pembayaran
          <form>
            <div>

              <select required onChange={handlePaymentTypeChange}>
                {
                  dataBookingProcessSent.dp === 0 && <option value="DP">Bayar DP Rp.{dataBookingProcessSent.participantCount * (dataBookingProcessSent.tripBooked.price/2)}</option>
                }
                <option value="FullPayment">Bayar Pelunasan {dataBookingProcessSent.participantCount * (dataBookingProcessSent.tripBooked.price)}</option>
              </select>
            </div>

            <div>
              <input type="file" accept="image/*" onChange={handleImageInputted} />
              <ImagePreview selectedImage={selectedImage}/>
            </div>

            <button type="button" onClick={handleSubmit}>
              Kirim Bukti Pembayaran
            </button>
          </form>
        
    </div>
  )
}

export default Payment