import React, {useState, useEffect} from 'react'

import { Table } from 'reactstrap'
// import partisipantsData from '../../assets/data/partisipants.json'
import jsonData from '../../assets/data/trip_schedules.json'

import './reportmanagement.css'

import Chart from './Chart'

const Reportmanagement = () => {

  const [tripDataPerSchedule, setTripDataPerSchedule] = useState([])

  const [selectedTripIndex, setSelectedTripIndex] = useState('')
  

  const handleShowReport = (index) => {
    setSelectedTripIndex(index);
  };

  useEffect(() => {

    const calculatePercentagesPerTrip = (b) => {
      const totalParticipants = b.length;
      let maleCount = 0;
      let femaleCount = 0;
      let cityCounts = {};
      let jobCounts = {};
  
      b.forEach((participant) => {
        if (participant.gender === 'laki-laki') {
          maleCount++;
        } else if (participant.gender === 'perempuan') {
          femaleCount++;
        }
  
        cityCounts[participant.city] = (cityCounts[participant.city] || 0) + 1;
        jobCounts[participant.job] = (jobCounts[participant.job] || 0) + 1;
      });
  
      const genderPercentage = {
        male: (maleCount / totalParticipants) * 100,
        female: (femaleCount / totalParticipants) * 100,
      };
  
      const cityPercentage = {};
      Object.keys(cityCounts).forEach((city) => {
        cityPercentage[city] = (cityCounts[city] / totalParticipants) * 100;
      });
  
      const jobPercentage = {};
      Object.keys(jobCounts).forEach((job) => {
        jobPercentage[job] = (jobCounts[job] / totalParticipants) * 100;
      });
  
      return {
        genderPercentage,
        cityPercentage,
        jobPercentage,
      };
    };

    const tripInformation = jsonData.map(({ tripDate, tripPrice, maxParticipant, participants }, index) => {
      const participantsPerSchedule = jsonData[index].participants;
      const percentages = calculatePercentagesPerTrip(participantsPerSchedule);
      // You can use the percentages and other information as needed here
  
      return {
        tripDate,
        tripPrice,
        maxParticipant,
        participants,
        ...percentages,
      };
    });

    setTripDataPerSchedule(tripInformation);
    // setButtonIndex(indexData);
  }, []);

 

  const selectedReport = tripDataPerSchedule.find((selectedTripReport) => selectedTripReport.tripDate === selectedTripIndex);

  return (
    <div className='adminSectionMainContent'>
        <div className='topNavReportManagement'>
          
           <h5>Bromo</h5>
           <ul className='listsTripCount'>
            {tripDataPerSchedule.map((tripData, index) => (
              <button className={`btn__Trip ${selectedTripIndex === tripData.tripDate ? 'selectedButton' : ''}`} key={tripData.tripDate} onClick={()=>handleShowReport(tripData.tripDate)}>Trip ke-{index+1}</button>
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
            <div className='frame__chartCard'>

              <div className='chartCard'>
                <Chart data={[selectedReport.genderPercentage.female,selectedReport.genderPercentage.male]} dataIndicator={["Female","Male"]}/>
              </div>

              <div className='chartCard'>
                <Chart 
                  data={
                    [
                      selectedReport.jobPercentage.bekerja,
                      selectedReport.jobPercentage.pelajar
                    ]
                  }
                  dataIndicator={["Pekerja","Pelajar"]}
                  
                />
              </div>

              <div className='chartCard'>
                <Chart 
                  data={
                    [
                      selectedReport.cityPercentage.Jakarta,
                      selectedReport.cityPercentage.Depok,
                      selectedReport.cityPercentage.Tangerang,
                      selectedReport.cityPercentage.Bekasi,
                    ]
                  }
                  dataIndicator={["Jakarta","Depok","Tangerang","Bekasi"]}
                />
              </div>

              <div className='chartCard'>
              </div>
            </div>

            
            
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
    </div>

  )
}

export default Reportmanagement