import React from 'react'

const PesananTrip = ({tripPesanan}) => {
  return (
    <div>
        <h6>Bromo</h6>
        <p>20 Januari 2012</p>
        <p>Status</p>
        {
            tripPesanan.map((trip, index)=>
            <div>
                {trip.tripBooked.tripDate}
            </div>
            )
        }
    </div>
  )
}

export default PesananTrip