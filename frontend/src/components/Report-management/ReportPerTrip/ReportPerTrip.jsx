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
    <div className='bg-danger'>total jadwal : {dataPerTrip.totalSchedule}</div>
  )
}

export default ReportPerTrip