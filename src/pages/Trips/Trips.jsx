import React, {useState, useEffect} from 'react';
import CommonSection from '../../shared/CommonSection';

import "./trip.css";

// import tripData from '../assets/data/trips';
import TripCard from '../../shared/TripCard';
import SearchBar from '../../shared/SearchBar';
// import Newsletter from './../shared/Newsletter'
import { Container, Row, Col } from 'reactstrap';

import useFetch from '../../hooks/useFetch'
import { BASE_URL } from '../../utils/config';

const Trips = () => {

  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);

  const {
    data:trips, 
    loading, 
    error
  } = useFetch(`${BASE_URL}/trips`)

  // const {data:tripCount} = useFetch(`${BASE_URL}/trips/search/getTripCount`)

  // useEffect(() => {
  //   const pages = Math.ceils(tripCount / 8);
  //   setPageCount(pages)
  //   window.scrollTo(0,0)
  // }, [page, tripCount, trips]);

  return (
    <>
      <CommonSection title={"All Trips"}/>
      <section>
        <div className='outerContainer'>
          <Container>
            {loading && <h4 className='text-center pt-5'>Loading....</h4>}

            {error && <h4 className='text-center pt-5'>{error}</h4>}

            {
            !loading && !error && (<Row>
              {
              trips?.map(trip => (
                <Col lg='3' md='6' sm='6' className='mb-4' key={trip._id}>
                  <TripCard trip={trip}/>
                </Col>)
                )
              }

              {/* <Col lg='12'>
                <div className='pagination d-flex align-items-center justify-content-center mt-4 gap-3'>
                  {[ ...Array(pageCount).keys()].map(number => (
                    <span key={number} onClick={()=>setPage(number)}
                    className={page === number ? "active__page" : ""}
                    >
                      {number+1}
                    </span>
                  ))}
                </div>
              </Col> */}
            </Row>)
            }
          </Container>
        </div>
      </section>

    </>
  )
}

export default Trips;