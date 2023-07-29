import React, {useState, useEffect} from 'react'

import { Table } from 'reactstrap'
// import partisipantsData from '../../assets/data/partisipants.json'
import jsonData from '../../assets/data/trip_schedules.json'

import './reportmanagement.css'

const Reportmanagement = () => {

  const [tripDataPerSchedule, setTripDataPerSchedule] = useState([])

  const [selectedTripIndex, setSelectedTripIndex] = useState('')
  

  const handleShowReport = (index) => {
    setSelectedTripIndex(index);
  };

  useEffect(() => {
    const tripDataArray = jsonData.map(({ tripDate, tripPrice, maxParticipant, participants }) => ({
      tripDate,
      tripPrice,
      maxParticipant,
      participants
    }));
    // const indexData = jsonData.map(({index}))

    setTripDataPerSchedule(tripDataArray);
    // setButtonIndex(indexData);
  }, []);

  const selectedReport = tripDataPerSchedule.find((selectedTripReport) => selectedTripReport.tripDate === selectedTripIndex);

  return (
    <div className='adminSectionMainContent'>
        <div className='topNavReportManagement'>
           <h5>Bromo</h5>
           <ul className='listsTripCount'>
            {tripDataPerSchedule.map((tripData, index) => (
              <button key={tripData.tripDate} onClick={()=>handleShowReport(tripData.tripDate)}>Trip ke-{index+1}</button>
            ))
            }
           </ul>
        </div>
        <div>
        {selectedReport && (
          <div>
            <h2>{selectedReport.tripDate}</h2>
            <p>Trip Price: {selectedReport.tripPrice}</p>
            <p>Max Participant: {selectedReport.maxParticipant}</p>
            <h5>Participants Data:</h5>
            <Table
              bordered
              hover
              responsive
              >
              <thead>
                  <tr>
                  <th>
                      No
                  </th>
                  <th>
                      Nama
                  </th>
                  <th>
                      Tanggal Lahir
                  </th>
                  <th>
                      Gender
                  </th>
                  <th>
                      Pekerjaan
                  </th>
                  <th>
                      City
                  </th>
                  </tr>
              </thead>
              <tbody>
                {selectedReport.participants.map((participant, pIndex) => (
                    
                    <tr key={pIndex}>
                      <th scope="row">
                        {pIndex+1}
                      </th>
                      <td>
                        {participant.name}
                      </td>
                      <td>
                        {participant.birthDay}
                      </td>
                      <td>
                        {participant.gender}
                      </td>
                      <td>
                        {participant.job}
                      </td>
                      <td>
                        {participant.city}
                      </td>
                    </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
        </div>

    {/* <div className='adminSectionMainContent'>
        <div className='topNavReportManagement'>
          <h5>Bromo</h5>
          <ul className='listsTripCount'>
              <li>All</li>
              <li>Trip 1</li>
              <li>Trip 2</li>
          </ul>
        </div>

        <div className='cards__Container'>
          <div className='card__Report'>
            <div>
              Total
            </div>
            <div className='border border-left border-dark'>
              20
            </div>
          </div>
          <div className='card__Report'>

          </div>
          <div className='card__Report'>

          </div>

        </div>
        <div className='reportTable'>
            <Table
              bordered
              hover
              responsive
              >
              <thead>
                  <tr>
                  <th>
                      No
                  </th>
                  <th>
                      Nama
                  </th>
                  <th>
                      City
                  </th>
                  </tr>
              </thead>
              {partisipantsTripData.map((trip, index) => (
              <tbody key={index}>
                  <tr>
                  <th scope="row">
                    {index+1}
                  </th>
                  <td>
                    {item.participants.name}
                  </td>
                  <td>
                    {item.participants.city}
                  </td>
                  </tr>
                  
              </tbody>
          ))
          }
            </Table>
        </div>
    </div> */}
    </div>

  )
}

export default Reportmanagement