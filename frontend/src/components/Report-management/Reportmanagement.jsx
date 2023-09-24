import React, {useState, useEffect} from 'react'

import { Table,Row, Col, Card } from 'reactstrap'
// import partisipantsData from '../../assets/data/partisipants.json'
import jsonData from '../../assets/data/trip_schedules.json'
import useFetch from '../../hooks/useFetch'
import { BASE_URL } from '../../utils/config'

import './reportmanagement.css'

import Chart from './Chart'
import ReportCard from './ReportCard/ReportCard'
import FormatDate from '../../shared/FormatDate'
import ReportPerTrip from './ReportPerTrip/ReportPerTrip'
import ReportPerSchedule from './ReportPerSchedule/ReportPerSchedule'
import Report from './Report/Report'

const Reportmanagement = () => {

  const [selectedOption, setSelectedOption] = useState('all')
  const [tripDataPerSchedule, setTripDataPerSchedule] = useState([])

  const [selectedTripIndex, setSelectedTripIndex] = useState('all')

  const {
    data:trips, 
    loading, 
    error
  } = useFetch(`${BASE_URL}/trips`)
  
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

    const selectedTripData = trips.find(trip=>trip._id === selectedOption)

    if(selectedTripData) {
      const tripInformation = selectedTripData.schedules.map(( schedule, index ) => {
        // const participantsPerSchedule = jsonData[index].participants;
        const percentages = calculatePercentagesPerTrip(schedule.participants);
        
        
        // You can use the percentages and other information as needed here
    
        return {
          tripDate: schedule.tripDate,
          price: schedule.price,
          maxParticipant: schedule.maxParticipants,
          participants: schedule.participants,
          ...percentages,
        };
      });
  
      setTripDataPerSchedule(selectedTripData, tripInformation);
    } else {
      setTripDataPerSchedule([])
    }
    
    // setButtonIndex(indexData);
  }, [selectedOption]);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value); // Mengubah state ketika opsi select berubah
    setSelectedTripIndex('all');
  };

  const selectedTripData = trips.find(trip=>trip._id === selectedOption)

  // const selectedReport = tripDataPerSchedule.find((selectedTripReport) => selectedTripReport._id === selectedTripIndex);

  return (
    <div className='adminSectionMainContent'>
      <div className='topNavReportManagement p-3'>
        {/* pada bagian ini saya ingin menampilkan pilihan untuk setiap title yang ada pada data jsonData dan pilihan All (default) */}
      <select name="" id="" onChange={handleOptionChange}>
        <option value="all">All</option>
        {trips.map((trips, index) => (
          <option value={trips._id} key={index}>
            {trips.title}
          </option>
        ))}
      </select>
      {/* pada bagian ini adalah menampilkan schedules/jadwal yang ada pada data yang terpilih sebelumnya pada select tag */}
      {
        selectedOption === 'all' ? '' : (<div className='listsTripCount'>
        <div className={`btn__Trip ${selectedTripIndex === 'all' ? 'selectedButton' : ''}`} key={'all'} onClick={()=>handleShowReport('all')}>
          All
        </div>
        {selectedTripData.schedules.map((loopingSelectedTripData, index) => (
          <div className={`btn__Trip ${selectedTripIndex === loopingSelectedTripData._id ? 'selectedButton' : ''}`} key={loopingSelectedTripData._id} onClick={()=>handleShowReport(loopingSelectedTripData._id)}>Trip ke-{index+1}</div>
        ))
        }
    </div>)
      }
        
      </div>
      {/* {console.log("Dipilih ID Trip: ", selectedOption)}
      {console.log("Dipilih tripDataPerSchedule", selectedTripIndex)} */}

      

      <div className='botNavReportManagement'>
        {/* ini adalah yang ditampilkan ketika memilih select trip dari jsonData maka otomatis menampilkan tampilan all */}
        {
          // selectedTripIndex === "all" && 
          // <div className='reportAll'>
          //   <ReportCard/>
          // </div>
        }

        {/* bagian ini adalah menampilkan data yang dipilih dari schedules yang ada pada setiap Trip */}
        {
        // selectedReport && (
        //   <div className='frame__report'>
        //     <h6>Jadwal : <FormatDate dateString={selectedReport.tripDate}/> </h6>
        //     <h6>Harga : {selectedReport.price}</h6>
        //     <h6>Peserta : {selectedReport.maxParticipant}</h6>
            
        //     <div className='frame__chartCard'>

        //       <div className='chartCard'>
        //         <Chart data={[selectedReport.genderPercentage.female,selectedReport.genderPercentage.male]} dataIndicator={["Perempuan","Laki-laki"]}/>
        //       </div>

        //       <div className='chartCard'>
        //         <Chart 
        //           data={
        //             [
        //               selectedReport.jobPercentage.bekerja,
        //               selectedReport.jobPercentage.pelajar
        //             ]
        //           }
        //           dataIndicator={["Pekerja","Pelajar"]}
                  
        //         />
        //       </div>

        //       <div className='chartCard'>
        //         <Chart 
        //           data={
        //             [
        //               selectedReport.cityPercentage.Jakarta,
        //               selectedReport.cityPercentage.Depok,
        //               selectedReport.cityPercentage.Tangerang,
        //               selectedReport.cityPercentage.Bekasi,
        //             ]
        //           }
        //           dataIndicator={["Jakarta","Depok","Tangerang","Bekasi"]}
        //         />
        //       </div>

        //       {/* <div className='chartCard'>
        //       </div> */}
        //     </div>
            
        //     <div className='table__container bg-black'>
        //     <h5>Data Peserta</h5>
        //       <Table color='black'
        //         bordered
        //         hover
        //         responsive
        //         >
        //         <thead>
        //             <tr>
        //             <th>
        //                 No
        //             </th>
        //             <th>
        //                 Nama
        //             </th>
        //             <th>
        //                 Tanggal Lahir
        //             </th>
        //             <th>
        //                 Gender
        //             </th>
        //             <th>
        //                 Pekerjaan
        //             </th>
        //             <th>
        //                 City
        //             </th>
        //             </tr>
        //         </thead>
        //         <tbody>
        //           {selectedReport.participants.map((participant, pIndex) => (
                      
        //               <tr key={pIndex}>
        //                 <th scope="row">
        //                   {pIndex+1}
        //                 </th>
        //                 <td>
        //                   {participant.name}
        //                 </td>
        //                 <td>
        //                   {participant.birthDay}
        //                 </td>
        //                 <td>
        //                   {participant.gender}
        //                 </td>
        //                 <td>
        //                   {participant.job}
        //                 </td>
        //                 <td>
        //                   {participant.city}
        //                 </td>
        //               </tr>
        //           ))}
        //         </tbody>
        //       </Table>
        //     </div>
        //   </div>
        // )
        }

      {
        selectedOption === 'all' && <Report/>
      }

      {
        selectedOption !== 'all' && selectedTripIndex === 'all' && (<ReportPerTrip idTrip = {selectedOption}/>)
      }

      {
        selectedOption !== 'all' && selectedTripIndex !== 'all' && (<ReportPerSchedule idTrip = {selectedOption} idSchedule={selectedTripIndex}/>)
      }

      </div>
    </div>

  )
}

export default Reportmanagement