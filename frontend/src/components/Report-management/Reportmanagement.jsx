import React, {useState, useEffect} from 'react'

import { Table } from 'reactstrap'
// import partisipantsData from '../../assets/data/partisipants.json'
import jsonData from '../../assets/data/trip_schedules.json'

import './reportmanagement.css'

const Reportmanagement = () => {

  const [tripDataPerSchedule, setTripDataPerSchedule] = useState([])
  const [tripParticipantsPerSchedule, setTripParticipantsPerSchedule] = useState([])
  const [buttonIndex, setButtonIndex] = useState([])

  const [selectedTripIndex, setSelectedTripIndex] = useState(null); // To store the index of the selected trip

  const handleTripButtonClick = (index) => {
    setSelectedTripIndex(index);
  };

  useEffect(() => {
    const tripDataArray = jsonData.map(({ tripDate, tripPrice, maxParticipant, participants, index }) => ({
      tripDate,
      tripPrice,
      maxParticipant,
      participants,
      index
    }));
    const participantsDataArray = jsonData.map(({ participants }) => participants);
    // const indexData = jsonData.map(({index}))

    setTripDataPerSchedule(tripDataArray);
    setTripParticipantsPerSchedule(participantsDataArray);
    // setButtonIndex(indexData);
  }, []);

  return (
    <div className='adminSectionMainContent'>
        <div className='topNavReportManagement'>
           <h5>Bromo</h5>
           <ul className='listsTripCount'>
               <li>All</li>
               <li>Trip 1</li>
               <li>Trip 2</li>
           </ul>
         </div>
            <div>
              {tripDataPerSchedule.map((trip, index) => (
                <div key={index}>
                  

                  <li onClick={() => handleTripButtonClick(index)}>Show Participants</li>

                  {selectedTripIndex === index && (

                    <div>
                      <h2>Trip Data:</h2>
                      <p>Trip Date: {trip.tripDate}</p>
                      <p>Trip Price: {trip.tripPrice}</p>
                      <p>Max Participant: {trip.maxParticipant}</p>
                      <h2>Participants Data:</h2>
                      {trip.participants.map((participant, pIndex) => (
                        <div key={pIndex}>
                          <p>Name: {participant.name}</p>
                          <p>Gender: {participant.gender}</p>
                          {/* Display other participant details as needed */}
                        </div>
                      ))}
                    </div>
                  )}
                  
                </div>
              ))}
            </div>
    </div>

    // <div className='adminSectionMainContent'>
    //     <div className='topNavReportManagement'>
    //       <h5>Bromo</h5>
    //       <ul className='listsTripCount'>
    //           <li>All</li>
    //           <li>Trip 1</li>
    //           <li>Trip 2</li>
    //       </ul>
    //     </div>

    //     <div className='cards__Container'>
    //       <div className='card__Report'>
    //         <div>
    //           Total
    //         </div>
    //         <div className='border border-left border-dark'>
    //           20
    //         </div>
    //       </div>
    //       <div className='card__Report'>

    //       </div>
    //       <div className='card__Report'>

    //       </div>

    //     </div>
    //     <div className='reportTable'>
    //         <Table
    //           bordered
    //           hover
    //           responsive
    //           >
    //           <thead>
    //               <tr>
    //               <th>
    //                   No
    //               </th>
    //               <th>
    //                   Nama
    //               </th>
    //               <th>
    //                   City
    //               </th>
    //               </tr>
    //           </thead>
    //           {partisipantsTripData.map((trip, index) => (
    //           <tbody key={index}>
    //               <tr>
    //               <th scope="row">
    //                 {index+1}
    //               </th>
    //               <td>
    //                 {item.participants.name}
    //               </td>
    //               <td>
    //                 {item.participants.city}
    //               </td>
    //               </tr>
                  
    //           </tbody>
    //       ))
    //       }
    //         </Table>
    //     </div>
    // </div>
  )
}

export default Reportmanagement