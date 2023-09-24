import React, {useState} from 'react'
import FormatDate from '../../shared/FormatDate'
import {
  Row,
  Col,
  Container,
  Collapse
} from 'reactstrap';
import Payment from '../Payment-confirmation/Payment';
import BiographyForm from '../Biography-form/BiographyForm';
import { BASE_URL } from '../../utils/config'
import './pesananTrip.css'

const PesananTrip = ({user, dispatch}) => {
  const initialBookingStates = user.bookings.map(() => ({
    showPayment: false,
    showInputData: false,
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
            user.bookings.map((trip, index)=>
            (<div key={index} className='d-flex w-100'>
              <img src={trip.tripBooked.productIdofTrip.photo} alt='tripImage' style={{width:'80px',height:'100px',objectFit:'cover', marginRight:'0.75rem'}} />
              
              <div className='d-flex flex-column w-100'>
                <div className='d-flex flex-column w-100' style={{height:'100px'}}>
                  <h6>{trip.tripBooked.productIdofTrip.title}</h6>
                  <FormatDate dateString={trip.tripBooked.tripDate}/>
                  <div className='aksi d-flex mt-auto'>
                    {
                      trip.paymentProofs.fullPayment === '' ? (<div onClick={() => handleShowPayment(index)} className='btn__payBooking'>Bayar<i className='ri-arrow-down-s-line'></i></div>) : (
                        <div className='me-3'>Menunggu Dikonfirmasi</div>
                      )
                    }
                    
                    <div onClick={() => handleShowInputDataComponent(index)} className='btn__inputData'>Isi Data Pemesan<i className='ri-arrow-down-s-line'></i></div>
                    <div className='ms-auto'>
                    <i onClick={()=>deleteBooking(trip._id)} className="ri-close-line btn__deleteBooking"></i>
                    </div>
                  </div>
                </div>
                <div>
                  <Collapse isOpen={bookingStates[index].showPayment}>
                    <Payment dataBookingProcessSent={trip}/>
                  </Collapse>
                  <Collapse isOpen={bookingStates[index].showInputData}>
                    <BiographyForm numOfParticipants={trip.participantCount} idUpdatedData={trip._id} onSubmit={handleSubmitParticipants} participantData={trip.participants}/>
                  </Collapse>
                </div>
              </div>
            </div>)
            )
        }
    </div>
  )
}

export default PesananTrip