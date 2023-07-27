import React, {useState} from 'react'

import { Row, Col, Form, FormGroup, Button, Collapse, Card, CardTitle, Input } from 'reactstrap'
import useFetch from '../../hooks/useFetch'
import { BASE_URL } from '../../utils/config'

const Tripsmanagement = () => {

    const {
        data:trips, 
        loading:loadingFetching, 
        error:errorFetching
      } = useFetch(`${BASE_URL}/trips`)
    
      const [isOpen, setIsOpen] = useState(false);
      // const [isScheudle, setIsSchedule] = useState(false);
      // const [isID, setID] = useState(null);
    
      const toggleAddTrip = () => setIsOpen(!isOpen);
      // const toggleAddSchedule = () => setIsSchedule(!isScheudle);
    
      const [updateTitle, setUpdateTitle] = useState(null);
      const [newTripDate, setNewTripDate] = useState(null);
      const [maxParticipant, setMaxParticipant] = useState(null);
      const [price, setPrice] = useState(null);
    
      const [editBox, setEditBox] = useState(null);
      const [editSchedule, setEditSchedule] = useState(null);
      
      const toggleEditSchedule = (content) =>  {
          setEditSchedule(content === editSchedule ? null : content);
      };
    
      const toggleEdit = (content) =>  {
          setEditBox(content === editBox ? null : content);
      };
    
      const closeEdit = () => {
        setEditBox(null);
      }
      const submitUpdate = async e => {
        e.preventDefault()
        try {
    
          const res = await fetch(`${BASE_URL}/trips/${editBox}`, {
            method: 'put',
            headers: {
              'content-type':'application/json'
            },
            credentials:'include',
            body: JSON.stringify({title:updateTitle})
          })
    
          const result = await res.json()
          if (!res.ok) {
            return alert(result.message)
          }
    
          alert(result.message)
    
        } catch (err) {
          alert(err.message)
        }
        setEditBox(null);
      }
    
    
      const submitNewTripDate = async e => {
        e.preventDefault()
    
        try{
          const newSchedule = {
            tripDate : newTripDate,
            maxParticipants : maxParticipant,
            price : price,
          }
          const res = await fetch(`${BASE_URL}/schedules/${editBox || editSchedule}`,{
            method: 'post',
            headers: {
              'content-type':'application/json'
            },
            credentials: "include",
            body: JSON.stringify(newSchedule)
          })
    
          const result = await res.json()
          if (!res.ok) {
            return alert(result.message);
          }
    
          alert(result.message)
    
        }catch (err) {
          alert(err.message)
        }
        
      }

    return (
    <section>
            <div className='p-3'>
                <h4>Trips</h4>
                <div className='mt-2'>
                {
                trips?.map(trip => (
                    <div key={trip._id} lg='3' md='6' sm='6' className='mb-4'>
                    {trip.schedules && trip.schedules.length > 0 ? (
            <p>Schedule Count: {trip.schedules.length}</p>
            ) : (
            <p>No schedules available for this trip.</p>
            )}
                    <span>
                        {trip.title}                    
                        <i onClick={()=>toggleEdit(trip._id)} className="ri-edit-box-fill"></i>
                        <i onClick={()=>toggleEditSchedule(trip._id)} className="ri-add-line ms-auto"></i>
                    </span>
                    {
                        editBox === trip._id && (
                        <Form onReset={closeEdit} onSubmit={submitUpdate}>
                                <div className='row row-cols-3 gap-2'>
                                <div className='col-2 p-2'>
                                    <Input
                                    type="text"
                                    placeholder={trip.title}
                                    id="title"
                                    required
                                    onChange={(e) => setUpdateTitle(e.target.value === "" ? trip.title : e.target.value)}
                                    bsSize='sm'
                                    />
                                </div>
                                <div className='col-4 d-flex p-2 gap-2'>
                                    <Button size='sm' className="btn secondary__btn auth__btn" type="submit">
                                    Save
                                    </Button>
                                    <Button size='sm' className="btn secondary__btn auth__btn" type='reset'>
                                    Cancel
                                    </Button>
                                </div>
                                </div>
                        </Form>                      
                        )
                    }
                    {
                        editSchedule === trip._id && (
                        <Form onSubmit={submitNewTripDate}>
                        <div className='row row-cols-4 gap-2'>
                            <div className='col-2 p-2'>
                            <Input
                                type="Number"
                                placeholder="Tarif"
                                id="price"
                                onChange={(e) => setPrice(e.target.value)}
                                bsSize="sm"
                            />
                            </div>
                            <div className='col-2 p-2'>
                            <Input
                                type="Number"
                                placeholder="Total Participant"
                                id="maxParticipants"
                                onChange={(e) => setMaxParticipant(e.target.value)}
                                bsSize="sm"
                            />
                            </div>
                            <div className='col-4 p-2'>
                            <Input
                                type="Date"
                                placeholder=""
                                id="tripDate"
                                onChange={(e) => setNewTripDate(e.target.value)}
                                bsSize="sm"
                            />
                            </div>
                            <div className='col col-4 d-flex gap-2 p-2'>
                            <Button size='sm' className="btn secondary__btn auth__btn" type="submit">
                            Add
                            </Button>
                            <Button size='sm' className="btn secondary__btn auth__btn" type='reset'>
                            Cancel
                            </Button>
                            </div>
                        </div>                          
                        </Form>
                        )
                    }
                    
                    </div>)
                    )
                }
                
                </div>
                
                <Row className='text-center mt-5 d-flex flex-column'>
                <React.StrictMode>
                <i className="ri-add-circle-fill" onClick={toggleAddTrip} style={{fontSize:'2rem', cursor:'pointer'}}></i>
                <Col className='mx-auto' sm='6'>
                    <Collapse isOpen={isOpen}>
                    <Card body>
                    <CardTitle className='mb-3'>ADD New Trip</CardTitle>
                    <Form>
                        <FormGroup className='d-flex flex-column align-items-start'>
                            <label htmlFor="">
                            Trips Title
                            </label>
                            <input
                            type="text"
                            placeholder="Trip Title"
                            id="title"
                            required
                            />
                        </FormGroup>
                        <FormGroup>
                
                            <label>
                            Trips Price
                            </label>
                            <input
                            type="text"
                            placeholder="Trip Price"
                            id="price"
                            required
                            />
                
                        </FormGroup>
                        <FormGroup>
                
                            <label>
                            New Schedule
                            </label>
                            <input
                            type="date"
                            placeholder=""
                            id="price"
                            />
                
                        </FormGroup>
                        <Button className="btn secondary__btn auth__btn" type="submit">
                            Save
                        </Button>
                        <Button className="btn secondary__btn auth__btn" type='reset'>
                            Cancel
                        </Button>
                        </Form>
                    </Card>
                    </Collapse>
                </Col>
                </React.StrictMode>
                </Row>
            </div>
            </section>
    )
}

export default Tripsmanagement