import React, {useState} from 'react'

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
          Pembayaran
          <form>
            <div>
              {console.log(dataBookingProcessSent)}
              <select name="" id="">
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
          </form>
        
    </div>
  )
}

export default Payment