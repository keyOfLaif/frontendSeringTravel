import React from 'react';
import TripCard from '../../shared/TripCard';
import {Col} from 'reactstrap';

import useFetch from '../../hooks/useFetch';

import { BASE_URL } from '../../utils/config'

const FeaturedTripList = () => {

  const {data: featuredTrips, loading, error} = useFetch(`${BASE_URL}/trips/search/getFeaturedTrips`)

  return (
    <>
        {
          loading && <h4>Loading.....</h4>
        }
        {
          error && <h4>{error}</h4>
        }

        {!loading && !error && featuredTrips?.map(trip => (
            <Col lg="3" className='mb-4' md='6' sm='6' key={trip._id}>
                <TripCard trip={trip}/>
            </Col>
        ))}
    </>
  )
}

export default FeaturedTripList