import React, { useContext, useState } from 'react';
import './booking.css';
import { Form, FormGroup, ListGroup, ListGroupItem, Button, Label, Input } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { BASE_URL } from '../../utils/config';
import FormatDate from '../../shared/FormatDate';

const Booking = ({ trip, avgRating }) => {
const { schedules, reviews, title } = trip;
const navigate = useNavigate();
const { user, dispatch } = useContext(AuthContext);
const today = new Date()

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

    const price = selectedSchedule ? selectedSchedule.price : null;


    // send data to the server side

    const handleClickBookTrip = async (e) => {
        e.preventDefault();
    
        if (!user) {
          return alert('Anda perlu log in untuk dapat memesan.');
        }

        const booking = {
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

          const bookingsDataUpdated = {
            ...user,
            bookings:[...user.bookings, result.data]
          }

          dispatch({type:'UPDATE_USER_DATA', payload: bookingsDataUpdated})
    
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
            <Form className='booking__info-form' onSubmit={handleClickBookTrip}>
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
                  {schedules?.filter(schedule => new Date(schedule.tripDate) > today).map((schedule, index) => (
                    <option value={schedule._id} key={schedule._id}>
                      
                      <FormatDate dateString={schedule.tripDate}/>
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
              <ListGroupItem className='border-0 px-0 total'>
                <h5>Total</h5>
                <span>Rp {price * participantsCounts}</span>
              </ListGroupItem>
            </ListGroup>
    
            <Button className='btn primary__btn w-100 mt-4' onClick={handleClickBookTrip}>Book Now</Button>
          </div>
        </div>
      );
    };
    
    export default Booking;