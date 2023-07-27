import React from 'react'

import { Table } from 'reactstrap'
import partisipantsData from '../../assets/data/partisipants.json'

import './reportmanagement.css'

const Reportmanagement = () => {
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
              {partisipantsData.map((item, index) => (
              <tbody key={index}>
                  <tr>
                  <th scope="row">
                    {index+1}
                  </th>
                  <td>
                    {item.name}
                  </td>
                  <td>
                    {item.city}
                  </td>
                  </tr>
                  
              </tbody>
          ))
          }
            </Table>
        </div>
    </div>
  )
}

export default Reportmanagement