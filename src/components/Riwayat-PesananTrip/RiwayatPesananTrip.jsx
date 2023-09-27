import React from 'react'
import FormatDate from '../../shared/FormatDate'

const RiwayatPesananTrip = ({user}) => {
  function formatDate(dateString) {
    if (!dateString) return ''; // Mengembalikan string kosong jika tanggal kosong
  
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  }
  return (
    <div>
      {
        user.bookings.filter(booking => booking.bookingComplete === true).map((booking, index) => 
          (
            <div key={index} className='d-flex w-100'>
              <img src={booking.tripBooked.productIdofTrip.photo} alt='tripImage' style={{width:'80px',height:'100px',objectFit:'cover', marginRight:'0.75rem'}} />

              <div className='d-flex flex-column w-100'>
                <h6>
                  {booking.tripBooked.productIdofTrip.title}
                </h6>
                <FormatDate dateString={booking.tripBooked.tripDate}/>

                {
                  formatDate(booking.tripBooked.tripDate) > formatDate(Date()) ? (
                    <p className='mt-auto'>Menunggu Pelaksanaan</p>
                  ) : (
                    <p>Selesai</p>
                  )
                }
              </div>
            </div>
          )
        )
      }
    </div>
  )
}

export default RiwayatPesananTrip