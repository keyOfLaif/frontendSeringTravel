import React from 'react'
import useFetch from '../../../hooks/useFetch'
import { BASE_URL } from '../../../utils/config'

import './report.css'
const Report = () => {
    const {
        data:fullReport, 
        loading, 
        error
      } = useFetch(`${BASE_URL}/report/fullReport`)
  return (
    <div className='container px-3'>

        <div className='d-flex flex-wrap gy-2'>
            <div className='totalReport__Card'>
                <h6>
                    Total Trip
                </h6>
                <h5>
                    {fullReport.totalTrip}
                </h5>
                <i className="ri-menu-4-line iconCard"></i>
            </div>

            <div className='totalReport__Card'>
                <h6>
                    Total Jadwal
                </h6>
                <h5>
                    {fullReport.totalSchedule}
                </h5>
            </div>

            <div className='totalReport__Card'>
                <h6>
                    Trip Selesai
                </h6>
                <h5>
                    {fullReport.totalCompletedSchedules}
                </h5>
            </div>

            <div className='totalReport__Card'>
                <h6>
                    Trip Selanjutnya
                </h6>
                <h5>
                    {fullReport.totalUpcomingSchedules}
                </h5>
            </div>

            <div className='totalReport__Card'>
                <h6>
                    Total Peserta
                </h6>
                <h5>
                    {fullReport.totalParticipants}
                </h5>
                <i className="ri-team-fill iconCard"></i>
            </div>

            <div className='totalReport__Card'>
                <h6>
                    Peserta Laki-laki
                </h6>
                <h5>
                    {fullReport.totalMaleParticipants}
                </h5>
                <i className="ri-men-fill iconCard"></i>
            </div>

            <div className='totalReport__Card'>
                <h6>
                    Peserta Perempuan
                </h6>
                <h5>
                    {fullReport.totalFemaleParticipants}
                </h5>
                <i className="ri-women-fill iconCard"></i>
            </div>

            <div className='totalReport__Card'>
                <h6>
                    Review
                </h6>
                <h5>
                    {fullReport.totalReview}

                </h5>
            </div>

            <div className='totalReport__Card'>
                <h6>
                    Pemasukan
                </h6>
                <h5 style={{fontSize:'2rem'}}>
                    {fullReport.totalProfit}
                </h5>
                <i className="ri-wallet-2-fill iconCard"></i>
            </div>
        </div>
        

    </div>
  )
}

export default Report