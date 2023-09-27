import React, {useState} from 'react'
import FormatDate from '../../shared/FormatDate'
import {
  Row,
  Col,
  Container,
  Collapse,
  Button
} from 'reactstrap';
import Payment from '../Payment-confirmation/Payment';
import BiographyForm from '../Biography-form/BiographyForm';
import { BASE_URL } from '../../utils/config'
import './pesananTrip.css'
import ImagePreview from '../InputImagePreview/ImagePreview';

const PesananTrip = ({user, dispatch}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');


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


  const initialBookingStates = user.bookings.filter(booking => booking.bookingComplete === false)
  .map(() => ({
    showPayment: false,
    showInputData: false,
    showPaymentProofs: false,
  }));

  const [bookingStates, setBookingStates] = useState(initialBookingStates);

  const handleSubmitParticipants = async (arrayParticipants, idUpdatedData) =>{
    try {
      
      const response = await fetch(`${BASE_URL}/bookings/updateBookers/${idUpdatedData}`, {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(arrayParticipants),
      });
      const dataReponse = await response.json();
      return alert(dataReponse.message);
    } catch (error) {
      return alert(error.message);
    }
  };

  const handleShowPaymentProofs = (index) =>{
    const updatedBookingStates = [...bookingStates];
    updatedBookingStates[index] = {
      ...updatedBookingStates[index],
      showPaymentProofs: !updatedBookingStates[index].showPaymentProofs,
    };
    setBookingStates(updatedBookingStates);
  }

  const handleShowPayment = (index) =>{
    const updatedBookingStates = [...bookingStates];
    updatedBookingStates[index] = {
      ...updatedBookingStates[index],
      showPayment: !updatedBookingStates[index].showPayment,
    };
    setBookingStates(updatedBookingStates);
  }

  const handleShowInputDataComponent = (index) => {
    const updatedBookingStates = [...bookingStates];
    updatedBookingStates[index] = {
      ...updatedBookingStates[index],
      showInputData: !updatedBookingStates[index].showInputData,
    };
    setBookingStates(updatedBookingStates);
  }

  const handleChangePaymentProofs = async (idBookingToChange, paymentTypeToChange) => {
    try {
      const formData = new FormData();
      formData.append('paymentTypeToChange', paymentTypeToChange);
      formData.append('proofsImage', selectedImage);
  
      const confirmed = window.confirm("Apakah anda yakin akan mengganti bukti pembayaran?");
      if (confirmed) {
        const response = await fetch(`${BASE_URL}/bookings/changeBookingProofs/${idBookingToChange}/${paymentTypeToChange}`, {
          method: 'PUT',
          body: formData, // Menggunakan formData untuk mengirim file
        });
  
        if (response.ok) {
          const dataResponse = await response.json();
          const updatedBookings = user.bookings.map((booking) => {
            if (booking._id === idBookingToChange) {
              if (paymentTypeToChange === 'dp') {
                return {
                  ...booking,
                  dpProofs: dataResponse.updatedProofsURL,
                };
              } else if (paymentTypeToChange === 'full') {
                return {
                  ...booking,
                  fullPaymentProofs: dataResponse.updatedProofsURL,
                };
              }
            }
            return booking;
          });
  
          const userDataUpdated = {
            ...user,
            bookings: updatedBookings,
          };
  
          dispatch({ type: 'UPDATE_USER_DATA', payload: userDataUpdated });
          alert(dataResponse.message);
        } else {
          alert("Gagal mengganti bukti pembayaran.");
        }
      }
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan saat mengganti bukti pembayaran.");
    }
  };

  const deleteBooking = async (e) => {
    try {
      const confirmed = window.confirm("Apakah anda yakin ingin menghapus pesanan ini?");
      if(confirmed){
        const response = await fetch(`${BASE_URL}/bookings/${e}`, {
          method: 'DELETE',
          headers: {
            'content-type': 'application/json',
          }
        });
        const dataReponse = await response.json();
        const updatedBookings = user.bookings.filter(booking => booking._id !== e);
        const userDataUpdated = {
          ...user,
          bookings:updatedBookings
        }

        dispatch({type:'UPDATE_USER_DATA', payload: userDataUpdated})
        return alert(dataReponse.message);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
        {
            user.bookings.filter(booking => booking.bookingComplete === false).map((trip, index)=>
              (
                <div key={index} className='d-flex w-100'>
                  <img src={trip.tripBooked.productIdofTrip.photo} alt='tripImage' style={{width:'80px',height:'100px',objectFit:'cover', marginRight:'0.75rem'}} />
                  
                  <div className='d-flex flex-column w-100'>
                    <div className='d-flex flex-column w-100' style={{height:'100px'}}>
                      <h6>{trip.tripBooked.productIdofTrip.title}</h6>
                      <FormatDate dateString={trip.tripBooked.tripDate}/>
                      <div className='aksi d-flex mt-auto'>
                        {/* Tombol untuk memunculkan form kirim bukti pembayaran */}
                        {
                          trip.fullPaymentProofs === '' ? (<div onClick={() => handleShowPayment(index)} className='btn__payBooking'>Bayar<i className='ri-arrow-down-s-line'></i></div>) : (
                            <div className='me-3'>Menunggu Dikonfirmasi</div>
                          )
                        }

                        {/* Tombol untuk memunculkan data pemesan */}
                        <div onClick={() => handleShowInputDataComponent(index)} className='btn__inputData me-3'>Data Pemesan<i className='ri-arrow-down-s-line'></i></div>

                        {/* Tombol untuk memunculkan bukti pembayaran */}

                        <div onClick={() =>handleShowPaymentProofs(index)} className='btn__inputData'>
                          Bukti Pembayaran<i className='ri-arrow-down-s-line'></i>
                        </div>
                        <div className='ms-auto'>
                        <i onClick={()=>deleteBooking(trip._id)} className="ri-close-line btn__deleteBooking"></i>
                        </div>
                      </div>
                    </div>

                    {/* Komponen */}
                    <div>
                      <Collapse isOpen={bookingStates[index].showPayment}>
                        <Payment dataBookingProcessSent={trip} onPaymentComplete={() => handleShowPayment(index)}/>
                      </Collapse>
                      <Collapse isOpen={bookingStates[index].showInputData}>
                        <BiographyForm numOfParticipants={trip.participantCount} idUpdatedData={trip._id} onSubmit={handleSubmitParticipants} participantData={trip.participants}/>
                      </Collapse>
                      <Collapse isOpen={bookingStates[index].showPaymentProofs}>
                        <div>
                          <h6>Bukti DP</h6>
                          <img style={{ maxWidth: '400px' }} src={trip.dpProofs} alt="Bukti DP" />
                          <div>
                            <input type="file" accept="image/*" onChange={(e) => handleImageInputted(e, 'dp')} />
                            <ImagePreview selectedImage={selectedImage.dp} />
                            <Button disabled={!selectedImage.dp} onClick={() => handleChangePaymentProofs(trip._id, 'dp')}>
                              Ganti Bukti DP
                            </Button>
                          </div>

                          <h6>Bukti Pelunasan</h6>
                          <img style={{ maxWidth: '400px' }} src={trip.fullPaymentProofs} alt="Bukti Pelunasan" />
                          <div>
                            <input type="file" accept="image/*" onChange={(e) => handleImageInputted(e, 'full')} />
                            <ImagePreview selectedImage={selectedImage.full} />
                            <Button disabled={!selectedImage.full} onClick={() => handleChangePaymentProofs(trip._id, 'full')}>
                              Ganti Bukti Pelunasan
                            </Button>
                          </div>
                        </div>
                      </Collapse>


                    </div>

                  </div>
                </div>
              )
            )
        }
    </div>
  )
}

export default PesananTrip