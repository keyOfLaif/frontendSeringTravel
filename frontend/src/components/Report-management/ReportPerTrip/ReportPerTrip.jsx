import React from 'react'
import useFetch from '../../../hooks/useFetch'
import { BASE_URL } from '../../../utils/config'
const ReportPerTrip = ({idTrip}) => {
    const {
        data:dataPerTrip, 
        loading, 
        error
      } = useFetch(`${BASE_URL}/report/reportPerTrip/${idTrip}`)

  return (
    <div className='container px-3'>
      <div className='d-flex flex-wrap gy-2'>

        <div className='totalReport__Card'>
            <h6>
                Total Peserta
            </h6>
            <h5>
                {dataPerTrip.totalParticipants}
            </h5>
            <i className="ri-team-fill iconCard"></i>
        </div>

        <div className='totalReport__Card'>
            <h6>
                Peserta Laki-laki
            </h6>
            <h5>
                {dataPerTrip.totalMaleParticipants}
            </h5>
            <i className="ri-men-fill iconCard"></i>
        </div>

        <div className='totalReport__Card'>
            <h6>
                Peserta Perempuan
            </h6>
            <h5>
                {dataPerTrip.totalFemaleParticipants}
            </h5>
            <i className="ri-women-fill iconCard"></i>
        </div>

        <div className='totalReport__Card'>
            <h6>
                Total Jadwal
            </h6>
            <h5>
                {dataPerTrip.totalSchedule}
            </h5>
        </div>

        <div className='totalReport__Card'>
            <h6>
                Trip Selesai
            </h6>
            <h5>
                {dataPerTrip.totalCompletedSchedules}
            </h5>
        </div>

        <div className='totalReport__Card'>
            <h6>
                Trip Selanjutnya
            </h6>
            <h5>
                {dataPerTrip.totalUpcomingSchedules}
            </h5>
        </div>

        <div className='totalReport__Card'>
            <h6>
                Pemasukan
            </h6>
            <h5 style={{fontSize:'2rem'}}>
                {dataPerTrip.totalProfit}
            </h5>
            <i className="ri-wallet-2-fill iconCard"></i>
        </div>

        <div className='totalReport__Card'>
            <h6>
                Review
            </h6>
            <h5>
                {dataPerTrip.totalReview}
            </h5>
        </div>
        
      </div>

    </div>
  )
}

export default ReportPerTrip