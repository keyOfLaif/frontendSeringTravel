import React, {useState} from 'react'

import { Form, FormGroup, Button, Collapse, Input } from 'reactstrap'
import useFetch from '../../hooks/useFetch'
import { BASE_URL } from '../../utils/config'

import './tripsmanagement.css'

const Tripsmanagement = () => {

    const {
        data:trips, 
        loading:loadingFetching, 
        error:errorFetching
      } = useFetch(`${BASE_URL}/trips`)
    
      const [isOpen, setIsOpen] = useState(false);
    
      const toggleAddTrip = () => setIsOpen(!isOpen);

      //setting up for creating new Trip
      const [newTrip, setNewTrip] = useState ({
        title: '',
        city: '',
        address: '',
      });

      //setting up for updating the Trip
      const [tripDataUpdated, setTripDataUpdated] = useState ({
        title: '',
        city: '',
        address: '',
      });
    
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

      const createNewTrip = async e => {
        e.preventDefault()
        try {
          const res = await fetch(`${BASE_URL}/trips/`, {
            method: 'POST',
            headers: {
              'content-type':'application/json'
            },
            credentials:'include',
            body: JSON.stringify(newTrip)
          })
    
          const result = await res.json()
          if (!res.ok) {
            return alert(result.message)
          }
    
          console.log("hasil : ", result)
          alert(result.message)
    
        } catch (err) {
          alert(err.message)
        }
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
            body: JSON.stringify(tripDataUpdated)
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
          const res = await fetch(`${BASE_URL}/schedules/${editSchedule}`,{
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

      const deleteTrip = async (e) => {
        try {
          const confirmed = window.confirm("Apakah Anda yakin ingin menghapus admin ini ? ", e.username);
          if(confirmed){
            const response = await fetch(`${BASE_URL}/trips/deleteTrip/${e}`, {
              method: 'DELETE',
              headers: {
                'content-type': 'application/json',
              }
            });
            const dataReponse = await response.json();
            return dataReponse;
          }
        } catch (error) {
          console.error(error);
        }
      }

    return (
      <div className='p-3'>
        <h4>Trips</h4>
          {
            trips?.map(trip => (
              <div key={trip._id} lg='3' md='6' sm='6' className='mb-4'>
                <div className='d-flex align-items-baseline'>
                  <div className='trip__photo me-2'>
                    <img src={trip.photo} alt="" />
                  </div>
                  <div>
                    <h6 className='m-0'>{trip.title}</h6>
                    {
                      trip.schedules && trip.schedules.length > 0 ? (
                        <p>Jadwal Trip: {trip.schedules.length}</p>
                        ) : (
                        <p>Tidak ada jadwal untuk trip ini.</p>
                      )
                    }
                  </div>
                  <div className='d-flex ms-4'>
                    <div onClick={()=>toggleEdit(trip._id)} className='btn__editTripData me-2'>
                      Ubah<i className="ri-edit-box-fill"></i>
                    </div>

                    <div className='btn__addScheduleTrip me-2' onClick={()=>toggleEditSchedule(trip._id)}>
                      Tambah<i className="ri-add-line"></i>
                    </div>

                    <div className='btn__deleteTrip' onClick={()=>deleteTrip(trip._id)}>
                      Hapus<i className="ri-delete-bin-2-line"></i>
                    </div>


                  </div>
                </div>

              
                {/*form for showing the current data and inputting the new updated data*/}
                {
                    editBox === trip._id && (<form onSubmit={submitUpdate}>
                      <div class="mb-3">
                        <label for="judulTrip" class="form-label">Judul Trip</label>
                        <input type="text" class="form-control" id="title" placeholder={trip.title} aria-describedby="emailHelp" onChange={(e) => setTripDataUpdated({ ...tripDataUpdated, title: e.target.value })}/>
                        <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                      </div>
                      <div class="mb-3">
                        <label for="daerahTrip" class="form-label">Daerah Tujuan Trip</label>
                        <input type="text" class="form-control" placeholder={trip.city} id="city" onChange={(e) => setTripDataUpdated({ ...tripDataUpdated, city: e.target.value })}/>
                      </div>
                      <div class="mb-3">
                        <label for="alamatTrip" class="form-label">Alamat Tujuan Trip</label>
                        <input type="text" class="form-control" id="address" placeholder={trip.address} onChange={(e) => setTripDataUpdated({ ...tripDataUpdated, address: e.target.value })}/>
                      </div>
                      
                      <button type="submit" class="btn btn-primary">Submit</button>
                    </form>)
                }
                {
                    editSchedule === trip._id && (
                      //Jadwal Baru
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
                        <Button onClick={()=>toggleEditSchedule(trip._id)} size='sm' className="btn secondary__btn auth__btn" type='reset'>
                        Cancel
                        </Button>
                        </div>
                    </div>                          
                    </Form>
                    )
                }
              
              </div>
              )
            )
          }
          
         
            <div style={{width:'min-content', margin:'0 auto'}}>
              <i className="ri-add-circle-fill" onClick={toggleAddTrip} style={{fontSize:'2rem', cursor:'pointer'}}></i>
            </div>
            <Collapse isOpen={isOpen}>
              <div className='bg-black w-50 p-4' style={{margin:'0 auto'}}>
                <div className='mb-3 mt-2'>Tambah Trip Baru</div>
                <form onSubmit={createNewTrip}>
                      <div class="mb-3">
                        <label for="judulTrip" class="form-label">Judul Trip</label>
                        <input type="text" class="form-control" id="title" placeholder="Nama Trip" aria-describedby="emailHelp" onChange={(e) => setNewTrip({ ...newTrip, title: e.target.value })}/>
                        <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                      </div>
                      <div class="mb-3">
                        <label for="daerahTrip" class="form-label">Daerah Tujuan Trip</label>
                        <input type="text" class="form-control" placeholder="Kota Tujuan Trip" id="city" onChange={(e) => setNewTrip({ ...newTrip, city: e.target.value })}/>
                      </div>
                      <div class="mb-3">
                        <label for="alamatTrip" class="form-label">Alamat Tujuan Trip</label>
                        <input type="text" class="form-control" id="address" placeholder="Alamat Tujuan Trip" onChange={(e) => setNewTrip({ ...newTrip, address: e.target.value })}/>
                      </div>
                      <button type="submit" class="btn btn-primary">Submit</button>
                    </form>
              </div>
            </Collapse>
      </div>
    )
}

export default Tripsmanagement