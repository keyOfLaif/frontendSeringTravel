import React from 'react'
import FormatDate from '../../shared/FormatDate'
import { BASE_URL } from '../../utils/config'

const PesananTrip = ({tripPesanan}) => {
  return (
    <div>
        {
            tripPesanan.map((trip, index)=>
            <div className='d-flex'>
              <div className='me-2'>
                <img src={trip.tripBooked.productIdofTrip.photo} style={{width:'80px',height:'100px',objectFit:'cover'}} />
              </div>
              <div>
                <h6>{trip.tripBooked.productIdofTrip.title}</h6>
                <FormatDate dateString={trip.tripBooked.tripDate}/>
                <div>
                  
                </div>
              </div>
            </div>
            )
        }
    </div>
  )
}

export default PesananTrip