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
            <div className="card__top">
                <span className='trip__location'>
                    <i className='ri-map-pin-line'></i>{city}
                </span>
                <span className='trip__rating'>
                    <i className='ri-star-fill'></i>{avgRating === 0 ? null : avgRating}
                    {totalRating === 0 ? (
                        'Not Rated'
                        ) : (
                            <span>({reviews?.length})</span>
                        )}
                    
                </span>
            </div>

            <h5 className='trip__title'><Link to={`/trips/${_id}`}>{title}</Link></h5>

            <div className="card__bottom">
                <h5>Rp{price}
                <span>
                    /per orang
                </span>
                </h5>
                <button className="btn booking__btn">
                    <Link to={`/trips/${_id}`}>Pesan</Link>
                </button>
            </div>
        </CardBody>
    </div>
  )
}

export default TripCard