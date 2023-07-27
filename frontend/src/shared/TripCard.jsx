import React from 'react';
import {Card, CardBody} from 'reactstrap';
import {Link} from 'react-router-dom';
import calculateAvgRating from '../utils/avgRating';

import './trip-card.css';

const TripCard = ({trip}) => {

    const {_id, title, city, photo, price, featured, reviews } = trip;

    const {totalRating, avgRating} = calculateAvgRating(reviews)

  return (
    <div className='trip__card'>
        <Card>
            <div className='trip__img'>
                <img src={photo} alt="trip-img" />
                { featured && <span>featured</span>}
            </div>
        </Card>

        <CardBody>
            <div className="card__top d-flex align-items-center justify-content-between">
                <span className='trip__location d-flex align-items-center gap-1'>
                    <i className='ri-map-pin-line'></i>{city}
                </span>
                <span className='trip__rating d-flex align-items-center gap-1'>
                    <i className='ri-star-fill'></i>{avgRating === 0 ? null : avgRating}
                    {totalRating === 0 ? (
                        'Not Rated'
                        ) : (
                            <span>({reviews?.length})</span>
                        )}
                    
                </span>
            </div>

            <h5 className='trip__title'><Link to={`/trips/${_id}`}>{title}</Link></h5>

            <div className="card__bottom d-flex align-items-center justify-content-between mt-3">
                <h5>${price}
                <span>
                    /per person
                </span>
                </h5>
                <button className="btn booking__btn">
                    <Link to={`/trips/${_id}`}>Book Now</Link>
                </button>
            </div>
        </CardBody>
    </div>
  )
}

export default TripCard