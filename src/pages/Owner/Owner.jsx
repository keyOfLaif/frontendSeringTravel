import React, {useState} from 'react'
import {Container, Row, Col, Button, Card, CardBody, CardHeader, CardTitle, CardFooter} from 'reactstrap'
//import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './owner.css'

const Owner = () => {
  const [showReport, setShowReport] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showHome, setShowHome] = useState(false);



  const handleReportClick = () => {
    setShowReport(true);
    setShowAdmin(false);
    setShowHome(false);
  }

  const handleAdminClick = () => {
    setShowReport(false);
    setShowAdmin(true);
    setShowHome(false);
  }

  const handleHomeClick = () => {
    setShowHome(true);
    setShowReport(false);
    setShowAdmin(false);
  }

  return (
    <Container>
      <Row>
      <Row>
      <div className='d-flex gap-4 mt-5 w-100 justify-content-center'>
        <Button active={showReport} size='sm' outline onClick={handleReportClick} ><i className="ri-file-chart-line"></i></Button>
        <Button active={showHome} size='sm' outline onClick={handleHomeClick}><i className="ri-home-7-line"></i></Button>
        <Button active={showAdmin} size='sm' outline onClick={handleAdminClick}><i className="ri-admin-line"></i></Button>
      </div>
      </Row>
        <section style={{display : showReport === true ? "block" : "none"}}>
          <div className='d-flex gap-4 flex-wrap justify-content-center'>
            <Card
              className="my-2"
              style={{
                width: '20rem'
              }}
            >
              <CardHeader>
              <CardTitle tag="h5">
                  Special Title Treatment
                </CardTitle>
              </CardHeader>
              <CardBody style={{height:'18rem'}}>
              </CardBody>
              <CardFooter>
                Footer
              </CardFooter>
            </Card>
            <Card
              className="my-2"
              style={{
                width: '20rem'
              }}
            >
              <CardHeader>
              <CardTitle tag="h5">
                  Special Title Treatment
                </CardTitle>
              </CardHeader>
              <CardBody style={{height:'18rem'}}>
              </CardBody>
              <CardFooter>
                Footer
              </CardFooter>
            </Card>
            <Card
              className="my-2"
              style={{
                width: '20rem'
              }}
            >
              <CardHeader>
              <CardTitle tag="h5">
                  Special Title Treatment
                </CardTitle>
              </CardHeader>
              <CardBody style={{height:'18rem'}}>
              </CardBody>
              <CardFooter>
                Footer
              </CardFooter>
            </Card>
            <Card
              className="my-2"
              style={{
                width: '20rem'
              }}
            >
              <CardHeader>
              <CardTitle tag="h5">
                  Special Title Treatment
                </CardTitle>
              </CardHeader>
              <CardBody style={{height:'18rem'}}>
              </CardBody>
              <CardFooter>
                Footer
              </CardFooter>
            </Card>
          </div>
        </section>
        <section style={{display : showAdmin === true ? "block" : "none"}}>
          Admin
        </section>
        <section style={{display : showHome === true ? "block" : "none"}}>
          <Row className='gy-4 justify-content-center'>
            <Col sm="4">
              <Card body className='text-center'>
                <i className="ri-user-follow-line mr-auto"></i>
                <div className='d-flex justify-content-between align-items-center'>
                  <h6>Trips Client</h6> 
                  <h5>1000k</h5>
                </div>
              </Card>
            </Col>
            <Col sm="4">
              <Card body className='text-center'>
                <i className="ri-check-double-line"></i>
                <div className='d-flex justify-content-between align-items-center'>
                  <h6>Successfull Trips</h6> 
                  <h5>50</h5>
                </div>
              </Card>
            </Col>
            <Col sm="4">
              <Card body className='text-center'>
                <i className="ri-funds-line"></i>
                <div className='d-flex justify-content-between align-items-center'>
                  <h6>Total Income</h6> 
                  <h5>30M</h5>
                </div>
              </Card>
            </Col>
            <Col sm="4">
              <Card body className='text-center'>
                <i className="ri-instagram-fill"></i>
                <div className='d-flex justify-content-between align-items-center'>
                  <h6>Instagram Follower</h6> 
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
        </section>
      </Row>
     </Container>
  )
}

export default Owner