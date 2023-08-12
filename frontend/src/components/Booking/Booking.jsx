import React, { useContext, useState } from 'react';
import './booking.css';
import { Form, FormGroup, ListGroup, ListGroupItem, Button, Label, Input } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { BASE_URL } from '../../utils/config';

const Booking = ({ trip, avgRating }) => {
const { schedules, reviews, title } = trip;
const navigate = useNavigate();
const { user } = useContext(AuthContext);

const [selectedSchedule, setSelectedSchedule] = useState(null);
const [participantsCounts, setParticipantCounts] = useState(null);

    const handleChangeSchedule = (event) => {
    const selectedScheduleId = event.target.value;
    const selectedSchedule = schedules.find((schedule) => schedule._id === selectedScheduleId);

    if (selectedSchedule) {
        setSelectedSchedule(selectedSchedule);
    } else {
        setSelectedSchedule(null);
    }
    };

    const handleChangeParticipantsCounts = (event) => {
    setParticipantCounts(event.target.value);
    };

    // const generateBookingCode = () =>{
    //   if (!selectedSchedule) {
    //     return; // Do nothing if selectedSchedule is null
    //   }
    //   if (selectedSchedule.participants.length === 0) {
    //     setCodeBooking(`Bromo1`)
    //   }
    //   else {
    //     setCodeBooking(`Bromo${selectedSchedule.participants.length + 1}`)
    //   }
    // }

    

    const serviceFee = 10;
    const price = selectedSchedule ? selectedSchedule.price : null;


    // send data to the server

    const handleClick = async (e) => {
        e.preventDefault();
    
        if (!user) {
          return alert('Please sign in');
        }

        const codeBooking = `Bromo${selectedSchedule.participants.length+1}`

        if(!codeBooking){
          return alert('Sistem bermasalah, gagal memesan')
        }

        const booking = {
            noBooking : codeBooking,
            participantCount : participantsCounts
        };
    
        try {
          const res = await fetch(`${BASE_URL}/bookings/${user._id}/${selectedSchedule._id}`, {
            method: 'post',
            headers: {
              'content-type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(booking),
          });
    
          const result = await res.json();
    
          if (!res.ok) {
            return alert(result.message);
          }
    
          navigate('/thank-you');
        } catch (err) {
          alert(err.message);
        }
      };
    
      return (
        <div className='booking'>
          <div className='booking__top d-flex align-items-center justify-content-between'>
            <h3>Rp. {price}<span>/orang</span></h3>
            <span className='trip__rating d-flex align-items-center'>
              <i className='ri-star-fill'></i>{avgRating === 0 ? null : avgRating} ({reviews?.length})
            </span>
          </div>
    
          <div className='booking__form'>
            <h5>information</h5>
            <Form className='booking__info-form' onSubmit={handleClick}>
              <FormGroup>
                <Label for='selectSchedule'>Pilih Jadwal</Label>
                <Input
                  id='scheduleTrip'
                  name='scheduleTrip'
                  type='select'
                  required
                  onChange={handleChangeSchedule}
                >
                  <option value={null}>Pilih</option>
                  {schedules?.map((schedule, index) => (
                    <option value={schedule._id} key={schedule._id}>
                      Trip ke-{index + 1}
                    </option>
                  ))}
                </Input>
              </FormGroup>
              <FormGroup>
                <Input
                  type='Number'
                  placeholder='Jumlah'
                  id='maxParticipants'
                  bsSize='sm'
                  max={selectedSchedule ?  selectedSchedule.maxParticipants : 0}
                  required
                  onChange={handleChangeParticipantsCounts}
                />
              </FormGroup>
            </Form>
          </div>
    
          <div className='booking__bottom'>
            <ListGroup>
              <ListGroupItem className='border-0 px-0'>
                <h5 className='d-flex align-items-center gap-1'>
                  Rp. {price} <i className='ri-close-line'></i> {participantsCounts} Orang
                </h5>
              </ListGroupItem>
              <ListGroupItem className='border-0 px-0'>
                <h5>Biaya layanan</h5>
                <span>Rp {serviceFee}</span>
              </ListGroupItem>
              <ListGroupItem className='border-0 px-0 total'>
                <h5>Total</h5>
                <span>Rp {(price * participantsCounts)+serviceFee}</span>
              </ListGroupItem>
            </ListGroup>
    
            <Button className='btn primary__btn w-100 mt-4' onClick={handleClick}>Book Now</Button>
          </div>
        </div>
      );
    };
    
    export default Booking;