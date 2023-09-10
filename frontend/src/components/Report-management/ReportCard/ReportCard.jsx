import React from 'react'
import './reportcard.css'
import { Table,Row, Col, Card } from 'reactstrap'

const ReportCard = () => {
  return (
    <Row className='gy-4 justify-content-center report__card'>
            <Col sm="4">
              <Card body className='text-center'>
                <i className="ri-user-follow-line mr-auto"></i>
                <div className='d-flex justify-content-between align-items-center'>
                  <h6>Total Peserta Trip</h6> 
                  <h5>1000k</h5>
                </div>
              </Card>
            </Col>
            <Col sm="4">
              <Card body className='text-center'>
                <i className="ri-check-double-line"></i>
                <div className='d-flex justify-content-between align-items-center'>
                  <h6>Trip Sukses</h6> 
                  <h5>50</h5>
                </div>
              </Card>
            </Col>
            <Col sm="4">
              <Card body className='text-center'>
                <i className="ri-funds-line"></i>
                <div className='d-flex justify-content-between align-items-center'>
                  <h6>Total Pendapatan</h6> 
                  <h5>30M</h5>
                </div>
              </Card>
            </Col>
            <Col sm="4">
              <Card body className='text-center'>
                <i className="ri-instagram-fill"></i>
                <div className='d-flex justify-content-between align-items-center'>
                  <h6>Total Review</h6> 
                  <h5>1M</h5>
                </div>
              </Card>
            </Col>
            <Col sm="4">
              <Card body className='text-center'>
                <i className="ri-instagram-fill"></i>
                <div className='d-flex justify-content-between align-items-center'>
                  <h6>Twitter Follower</h6> 
                  <h5>900k</h5>
                </div>
              </Card>
            </Col>
          </Row>
  )
}

export default ReportCard