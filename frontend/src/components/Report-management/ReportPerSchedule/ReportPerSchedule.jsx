import React from 'react'
import useFetch from '../../../hooks/useFetch'
import { BASE_URL } from '../../../utils/config'

const ReportPerSchedule = ({idTrip, idSchedule}) => {
  const {
    data:scheduleReport,
    loading, 
    error
  } = useFetch(`${BASE_URL}/report/reportPerSchedule/${idSchedule}`)

  return (
    <div className='container px-3'>

        <div className='d-flex flex-wrap gy-2'>
            {/* <div className='totalReport__Card'>
                <h6>
                    Total Trip
                </h6>
                <h5>
                    {scheduleReport.totalTrip}
                </h5>
                <i className="ri-menu-4-line iconCard"></i>
            </div>

            <div className='totalReport__Card'>
                <h6>
                    Total Jadwal
                </h6>
                <h5>
                    {scheduleReport.totalSchedule}
                </h5>
            </div>

            <div className='totalReport__Card'>
                <h6>
                    Trip Selesai
                </h6>
                <h5>
                    {scheduleReport.totalCompletedSchedules}
                </h5>
            </div>

            <div className='totalReport__Card'>
                <h6>
                    Trip Selanjutnya
                </h6>
                <h5>
                    {scheduleReport.totalUpcomingSchedules}
                </h5>
            </div> */}

            <div className='totalReport__Card'>
                <h6>
                    Total Peserta
                </h6>
                <h5>
                    {scheduleReport.totalParticipants}
                </h5>
                <i className="ri-team-fill iconCard"></i>
            </div>

            <div className='totalReport__Card'>
                <h6>
                    Peserta Laki-laki
                </h6>
                <h5>
                    {scheduleReport.totalMaleParticipants}
                </h5>
                <i className="ri-men-fill iconCard"></i>
            </div>

            <div className='totalReport__Card'>
                <h6>
                    Peserta Perempuan
                </h6>
                <h5>
                    {scheduleReport.totalFemaleParticipants}
                </h5>
                <i className="ri-women-fill iconCard"></i>
            </div>

            <div className='totalReport__Card'>
                <h6>
                    Asal Kota
                </h6>
                <h5>
                    {scheduleReport.totalCity}
                </h5>
                <i className="ri-building-fill iconCard"></i>
            </div>

            {/* <div className='totalReport__Card'>
                <h6>
                    Review
                </h6>
                <h5>
                    {scheduleReport.totalReview}

                </h5>
            </div> */}

            <div className='totalReport__Card'>
                <h6>
                    Pemasukan
                </h6>
                <h5 style={{fontSize:'2rem'}}>
                    {scheduleReport.income}
                </h5>
                <i className="ri-wallet-2-fill iconCard"></i>
            </div>
        </div>
        

    </div>
  )
}

export default ReportPerSchedule