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
        desc:'',
        featured:false,
        tripImage:null,
        directory: '../frontend/public/tripImages'
      });

      //setting up for updating the Trip
      const [tripDataUpdated, setTripDataUpdated] = useState ({
        title: '',
        city: '',
        address: '',
        desc:'',
        tripImage:null,
        directory: '../frontend/public/tripImages'
      });
    
      const [updateTitle, setUpdateTitle] = useState(null);
      const [newTripDate, setNewTripDate] = useState(null);
      const [maxParticipant, setMaxParticipant] = useState(null);
      const [price, setPrice] = useState(null);
    
      const [editBox, setEditBox] = useState(null);
      const [editSchedule, setEditSchedule] = useState(null);
      const [errorUploadImageTrip, setErrorFetching] = useState('')
      
      const toggleEditSchedule = (content) =>  {
          setEditSchedule(content === editSchedule ? null : content);
      };
    
      const toggleEdit = (content) =>  {
          setEditBox(content === editBox ? null : content);
      };

      const createNewTrip = async e => {
        e.preventDefault()
        try {
          const formData = new FormData();
          formData.append("title", newTrip.title);
          formData.append("city", newTrip.city);
          formData.append("address", newTrip.address);
          formData.append("desc", newTrip.desc);
          formData.append("tripDirectory", newTrip.directory);
          formData.append("featured", newTrip.featured);
          formData.append("tripImage", newTrip.tripImage);

          const res = await fetch(`${BASE_URL}/trips`, {
            method: 'POST',
            body : formData,
          })
    
          const result = await res.json()
          if (!res.ok) {
            return alert(result.message)
          }

          return alert(result.message)
    
        } catch (err) {
          setErrorFetching(err.message);
          alert(err.message);
        }
        setEditBox(null);
      }
  
      const submitUpdate = async e => {
        e.preventDefault()
        try {
          const formData = new FormData();
          formData.append("title", tripDataUpdated.title);
          formData.append("city", tripDataUpdated.city);
          formData.append("address", tripDataUpdated.address);
          formData.append("desc", tripDataUpdated.desc);
          formData.append("tripDirectory", tripDataUpdated.directory);
          formData.append("tripImage", tripDataUpdated.tripImage);

          const res = await fetch(`${BASE_URL}/trips/${editBox}`, {
            method: 'put',
            body: formData
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
          const confirmed = window.confirm("Apakah Anda yakin ingin menghapus Trip ini ? ", e.username);
          if(confirmed){
            const response = await fetch(`${BASE_URL}/trips/deleteTrip/${e}`, {
              method: 'DELETE',
              headers: {
                'content-type': 'application/json',
              }
            });
            const dataReponse = await response.json();
            return alert(dataReponse.message);
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
                    editBox === trip._id && (
                    <form onSubmit={submitUpdate}>
                      <div className="mb-3">
                        <label htmlFor="judulTrip" className="form-label">Judul Trip</label>
                        <input type="text" className="form-control" id="title" placeholder={trip.title} aria-describedby="emailHelp" onChange={(e) => setTripDataUpdated({ ...tripDataUpdated, title: e.target.id === 'title' && e.target.value === "" ? (trip.title) : (e.target.value) })}/>
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                      </div>

                      <div className="mb-3">
                        <label htmlFor="daerahTrip" className="form-label">Daerah Tujuan Trip</label>
                        <input type="text" className="form-control" placeholder={trip.city} id="city" onChange={(e) => setTripDataUpdated({ ...tripDataUpdated, city: e.target.id === 'city' && e.target.value === "" ? (trip.city) : (e.target.value) })}/>
                      </div>

                      <div className="mb-3">
                        <label htmlFor="alamatTrip" className="form-label">Alamat Tujuan Trip</label>
                        <input type="text" className="form-control" id="address" placeholder={trip.address} onChange={(e) => setTripDataUpdated({ ...tripDataUpdated, address: e.target.id === 'address' && e.target.value === "" ? (trip.address) : (e.target.value) })}/>
                      </div>

                      <div className="mb-3">
                        <label htmlFor="deskripsiTrip" className="form-label">Deskripsi Trip</label>
                        <input type="text" className="form-control" id="desc" placeholder={trip.desc} onChange={(e) => setTripDataUpdated({ ...tripDataUpdated, desc: e.target.id === 'desc' && e.target.value === "" ? (trip.desc) : (e.target.value) })}/>
                      </div>

                      <div className="mb-3">
                        <label htmlFor="gambarTrip" className="form-label">Gambar</label>
                        <input type="file" accept="image/*" onChange={(e) => setTripDataUpdated({ ...tripDataUpdated, tripImage: e.target.files[0] })}/>
                      </div>
                      
                      <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                    )
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
                {errorFetching && <p className="error-message">{errorFetching}</p>}
                <div className='mb-3 mt-2'>Tambah Trip Baru</div>
                  <form onSubmit={createNewTrip}>
                      <div className="mb-3">
                        <label htmlFor="judulTrip" className="form-label">Judul Trip</label>
                        <input type="text" className="form-control" id="title" placeholder="Nama Trip" aria-describedby="emailHelp" onChange={(e) => setNewTrip({ ...newTrip, title: e.target.value })} required/>
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="daerahTrip" className="form-label">Daerah Tujuan Trip</label>
                        <input type="text" className="form-control" placeholder="Kota Tujuan Trip" id="city" onChange={(e) => setNewTrip({ ...newTrip, city: e.target.value })} required/>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="alamatTrip" className="form-label">Alamat Tujuan Trip</label>
                        <input type="text" className="form-control" id="address" placeholder="Alamat Tujuan Trip" onChange={(e) => setNewTrip({ ...newTrip, address: e.target.value })} required/>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="deskripsiTrip" className="form-label">Deskripsi</label>
                        <input type="text" className="form-control" id="desc" placeholder="Deskripsi tentang Tripnya" onChange={(e) => setNewTrip({ ...newTrip, desc: e.target.value })} required/>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="gambarTrip" className="form-label">Gambar</label>
                        <input type="file" accept="image/*" onChange={(e) => setNewTrip({ ...newTrip, tripImage: e.target.files[0] })} required/>
                      </div>
                      
                      <button type="submit" className="btn btn-primary">Submit</button>
                  </form>
              </div>
            </Collapse>
      </div>
    )
}

export default Tripsmanagement