import React, { useEffect, useRef, useState, useContext } from 'react'
import '../styles/trip-details.css'
import { Container, Row, Col, Form, ListGroup } from 'reactstrap'
import { useParams } from 'react-router-dom'
// import tripData from '../assets/data/trips'
import calculateAvgRating from '../utils/avgRating'
import avatar from '../assets/images/avatar.jpg'
import Booking from '../components/Booking/Booking'
import useFetch from './../hooks/useFetch'
import { BASE_URL } from './../utils/config'

import { AuthContext } from '../context/AuthContext'

const TripDetails = () => {

  const {id} = useParams()
  const reviewMsgRef = useRef("")
  const [tripRating, setTripRating] = useState(null)
  const {user} = useContext(AuthContext)

  // fetch data
  const { data: trip, loading, error} = useFetch(`${BASE_URL}/trips/${id}`)
  // const trip = tripData.find(trip=>trip.id === id)

  // destructure properties from trip object
  const {
    photo,
    title,
    desc,
    address,
    schedules,
    reviews,
    city} = trip

  const {totalRating, avgRating} = calculateAvgRating (reviews)

  // format date
  const options = { day: "numeric", month: "long", year: "numeric"};

  //submit reques to the server

  const submitHandler = async e => {
    e.preventDefault()
    const reviewText = reviewMsgRef.current.value;
    
    try {
      if(!user || user === "" || user === null){
        alert('Please sign in')
      }

      const reviewObj = {
        username: user?.username,
        reviewText,
        rating: tripRating
      }

      const res = await fetch(`${BASE_URL}/review/${id}`, {
        method: 'post',
        headers: {
          'content-type':'application/json'
        },
        credentials:'include',
        body: JSON.stringify(reviewObj)
      })

      const result = await res.json()
      if (!res.ok) {
        return alert(result.message);
      }

      alert(result.message)

    } catch (err) {
      alert(err.message)
    }
  }

  useEffect(()=>{
    window.scrollTo(0,0)
  },[trip])

  return (
    <>
    <section>
      <Container>
        {
          loading && <h4 className='text-center pt-5'>Loading....</h4>
        }
        {
          error && <h4 className='text-center pt-5'>{error}</h4>
        }
        {
          !loading && !error && (<Row>
          <Col lg='8'>
            <div className="trip__content">
              <img src={photo} alt="" />
              <div className="trip__info">
                <h2>{title}</h2>

                <div className="d-flex align-items-center gap-5">

                <span className='trip__rating d-flex align-items-center gap-1'>
                    <i className='ri-star-fill' style={{color:"var(--secondary-color)"}}></i>{avgRating === 0 ? null : avgRating}
                    {totalRating === 0 ? (
                        'Not Rated'
                        ) : (
                            <span>({reviews?.length})</span>
                        )}
                    
                </span>

                <span>
                  <i className='ri-map-pin-fill'></i> {address}
                </span>

                </div>

                <div className="trip__extra-details">
                  <span>
                    <i className='ri-map-pin-2-line'></i> {city}
                  </span>
                  <span>
                    {/* <i className='ri-money-dollar-circle-line'></i> ${price} /per person */}
                  </span>
                  <span>
                    {/* <i className='ri-map-pin-time-line'></i> {distance} k/m */}
                  </span>
                  <span>
                    {/* <i className='ri-group-line'></i> {maxGroupSize} people */}
                  </span>
                </div>

                    <h5>Description</h5>
                    
                    <p>{desc}</p>

              </div>
              {/* trip reviews */}
              <div className="trip__reviews mt-4">
                <h4>Reviews ({reviews?.length} reviews)</h4>

                <Form onSubmit={submitHandler}>
                  <div className="d-flex align-items-center gap-3 mb-4">
                    <span onClick={()=>setTripRating(1)}>
                      1 <i className='ri-star-s-fill'></i>
                    </span>
                    <span onClick={()=>setTripRating(2)}>
                      2 <i className='ri-star-s-fill'></i>
                    </span>
                    <span onClick={()=>setTripRating(3)}>
                      3 <i className='ri-star-s-fill'></i>
                    </span>
                    <span onClick={()=>setTripRating(4)}>
                      4 <i className='ri-star-s-fill'></i>
                    </span>
                    <span onClick={()=>setTripRating(5)}>
                      5 <i className='ri-star-s-fill'></i>
                    </span>
                  </div>

                  <div className="review__input">

                    <input type="text" ref={reviewMsgRef} placeholder='share your opini' required/>

                    <button className='btn primary__btn text-white' type='submit'>
                      Submit
                    </button>

                  </div>
                </Form>

                <ListGroup className='user__reviews'>
                    {
                      reviews?.map(review=>(
                        <div className="review__item" key={review._id}>
                          <img src={avatar} alt=""/>

                          <div className="w-100">
                            <div className="d-flex align-items-center justify-content-between">
                              <div>
                                <h5>{review.username}</h5>
                                <p>
                                  {new Date(review.createdAt).toLocaleDateString("en-US", options)}
                                </p>
                              </div>
                              <span className='d-flex align-items-center'>
                                {review.rating}<i className='ri-star-s-fill'></i>
                              </span>
                            </div>

                            <h6>{review.reviewText}</h6>
                          </div>
                        </div>
                      ))
                    }
                </ListGroup>
              </div>
            </div>
          </Col>

          <Col lg='4'>
              <Booking trip={trip} avgRating={avgRating}/>
          </Col>
        </Row>
        )}
      </Container>
    </section>
    </>
  )
}

export default TripDetails;