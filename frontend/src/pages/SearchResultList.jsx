import React, {useState} from 'react'

import CommonSection from "./../shared/CommonSection"
import {Container,Row,Col} from 'reactstrap'

import {useLocation} from "react-router-dom"
import TripCard from "./../shared/TripCard"

const SearchResultList = () => {

  const location = useLocation()
  const [data] = useState(location.state)
  

  return (
    <>
      <CommonSection title={"Trip Search Result"}/>
        <section>
          <Container>
            <Row>
              {data.length === 0 ? (
                <h4 className='text-center'>No trip found</h4>
              ):(
                data?.map(trip => (
                  <Col lg='3' className='mb-4' key={trip._id}>
                    <TripCard trip={trip}/>
                  </Col>
                ))
              )}
            </Row>
          </Container>
        </section>
    </>
  )
}

export default SearchResultList;