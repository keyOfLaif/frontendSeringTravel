import React, {useContext, useState} from 'react'
import './booking.css'
import { Form, FormGroup, ListGroup, ListGroupItem, Button, Label, Input } from 'reactstrap'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { BASE_URL } from '../../utils/config'


const Booking = ({trip, avgRating}) => {

    const {schedules, reviews, title} = trip
    const navigate = useNavigate()

    const {user} = useContext(AuthContext)

    const [price, setPrice] = useState(null)
    const [selectedSchedule, setSelectedSchedule] = useState(null)
    const [participantsCounts, setParticipantCounts] = useState(null)

    const handleChangeSchedule = (event) =>{
        const selectedScheduleId = event.target.value;
        const selectedSchedule = schedules.find((schedule)=>schedule._id === selectedScheduleId);

        if(selectedSchedule){
            setPrice(selectedSchedule.price)
            setSelectedSchedule(selectedSchedule)
        }else{
            setPrice(null);
            setSelectedSchedule(null);
        }
    }

    const handleChangeParticipantsCounts = (event) =>{
        if(event){
            setParticipantCounts(event.target.value)
        }else{
            setParticipantCounts(null)
        }
    }

    const [booking, setBooking] = useState({
        // userId: user && user._id,
        // userEmail: user && user.email,
        // tripName: title,
        // fullName:'',
        // phone:''
        // noBooking: bookingCode
    })

    // const handleChange = e => {
    //     setBooking(prev => ({ ...prev, [e.target.id]: e.target.value}));
    // };

    const serviceFee = 10
    const totalAmount = Number(price) + Number(serviceFee)


    // send data to the server

    const handleClick = async e => {
        e.preventDefault();

        try {
            if(!user || user === undefined || user === null){
                return alert('Please sign in')
            }

            const res = await fetch(`${BASE_URL}/bookings/${user._id}/${schedules._id}`,{
                method: 'post',
                headers: {
                    'content-type':'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(booking)
            })
            

            const result = await res.json()

            if(!res.ok) {
                return alert(result.message)
            }
            navigate("/thank-you")
        } catch (err) {
            alert(err.message)
        }

        
    }

  return (
    <div className='booking'>

        <div className="booking__top d-flex align-items-center justify-content-between">
            <h3>Rp. {price}<span>/orang</span></h3>
            <span className='trip__rating d-flex align-items-center'>
                    <i className='ri-star-fill'></i>{avgRating === 0 ? null : avgRating} ({reviews?.length})
                </span>
        </div>

        {/* booking form */}
        <div className="booking__form">
            <h5>information</h5>
            <Form className="booking__info-form" onSubmit={handleClick}>
                <FormGroup>
                    <Label for="selectSchedule">
                    Pilih Jadwal
                    </Label>
                    <Input
                    id="scheduleTrip"
                    name="scheduleTrip"
                    type="select"
                    required
                    onChange={handleChangeSchedule}
                    >
                        <option value={(null)}>
                            Pilih
                        </option>
                        {
                            schedules?.map((schedule,index) => (
                            <option value={schedule._id} key={schedule._id}>
                                Trip ke-{index+1}
                            </option>)
                            )
                        }
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Input
                        type="Number"
                        placeholder="Jumlah"
                        id="maxParticipants"
                        bsSize="sm"
                        required
                        onChange={handleChangeParticipantsCounts}
                    />
                </FormGroup>
            </Form>
        </div>
        {/* booking end */}

        {/* booking bottom */}

        <div className="booking__bottom">
            <ListGroup>
                <ListGroupItem className='border-0 px-0'>
                    <h5 className='d-flex align-items-center gap-1'>Rp. {price} <i className='ri-close-line'></i> {participantsCounts} Orang</h5>
                </ListGroupItem>
                <ListGroupItem className='border-0 px-0'>
                    <h5>Biaya layanan</h5>
                    <span>Rp {serviceFee}</span>
                </ListGroupItem>
                <ListGroupItem className='border-0 px-0 total'>
                    <h5>Total</h5>
                    <span>Rp {price*participantsCounts}</span>
                </ListGroupItem>
            </ListGroup>

            <Button className='btn primary__btn w-100 mt-4' onClick={handleClick}>Book Now</Button>
        </div>
    </div>
  )
}

export default Booking