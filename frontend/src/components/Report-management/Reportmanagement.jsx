import React, {useState, useEffect} from 'react'

import { Table } from 'reactstrap'
// import partisipantsData from '../../assets/data/partisipants.json'
// import partisipantsTripData from '../../assets/data/trip_schedules.json'

import './reportmanagement.css'

const Reportmanagement = () => {
  const [tripData, setTripData] = useState([]); // To store trip data (tripDate, tripPrice, maxParticipant)
  const [participantsData, setParticipantsData] = useState([]); // To store participants data
  const [selectedTripIndex, setSelectedTripIndex] = useState(null); // To store the index of the selected trip

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('../assets/data/trip_schedules.json'); // Adjust the path to the JSON file based on your project setup
        if (!response.ok) {
          throw new Error('Failed to fetch data.');
        }
        const jsonData = await response.json();

        // Extract trip data (tripDate, tripPrice, maxParticipant) and participants data
        const tripDataArray = jsonData.map(({ tripDate, tripPrice, maxParticipant, participants }) => ({
          tripDate,
          tripPrice,
          maxParticipant,
        }));
        const participantsDataArray = jsonData.map(({ participants }) => participants);

        setTripData(tripDataArray);
        setParticipantsData(participantsDataArray);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleTripButtonClick = (index) => {
    setSelectedTripIndex(index);
  };

  return (
    <div>
      {tripData.map((trip, index) => (
        <div key={index}>
          <h2>Trip Data:</h2>
          <p>Trip Date: {trip.tripDate}</p>
          <p>Trip Price: {trip.tripPrice}</p>
          <p>Max Participant: {trip.maxParticipant}</p>

          <button onClick={() => handleTripButtonClick(index)}>Show Participants</button>

          {selectedTripIndex === index && (
            <>
              <h2>Participants Data:</h2>
              {participantsData[index].map((participant, pIndex) => (
                <div key={pIndex}>
                  <p>Name: {participant.name}</p>
                  <p>Gender: {participant.gender}</p>
                  {/* Display other participant details as needed */}
                </div>
              ))}
            </>
          )}
        </div>
      ))}
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