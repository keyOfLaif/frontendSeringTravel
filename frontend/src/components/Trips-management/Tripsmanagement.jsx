import React, {useState, useEffect} from 'react'

import { Form, FormGroup, Button, Collapse, Input } from 'reactstrap';
import useFetch from '../../hooks/useFetch';
import { BASE_URL } from '../../utils/config';
import FormatDate from '../../shared/FormatDate';

import './tripsmanagement.css';


const Tripsmanagement = () => {
  const [trips, setTrips] = useState(null);

    const {
        data:fetchedTrips, 
        loading:loadingFetching, 
        error:errorFetching,
      } = useFetch(`${BASE_URL}/trips`)

      useEffect(() => {
        if (!loadingFetching && !errorFetching) {
          setTrips(fetchedTrips);
        }
      }, [fetchedTrips, loadingFetching, errorFetching]);

    
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
    
      const [editTrip, setEditTrip] = useState(null);
      const [addNewSchedule, setAddNewSchedule] = useState(null);
      const [errorUploadImageTrip, setErrorFetching] = useState('')
      
      const toggleAddNewSchedule = (content) =>  {
          setAddNewSchedule(content === addNewSchedule ? null : content);
      };
    
      const toggleEdit = (content) =>  {
          setEditTrip(content === editTrip ? null : content);
      };

      const createNewTrip = async e => {
        e.preventDefault()
        try {
          const formData = new FormData();
          formData.append("title", newTrip.title);
          formData.append("city", newTrip.city);
          formData.append("address", newTrip.address);
          formData.append("desc", newTrip.desc);
          formData.append("imageDirectory", newTrip.directory);
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
        setEditTrip(null);
      }
  
      const submitUpdate = async e => {
        e.preventDefault()
        try {
          const formData = new FormData();
          formData.append("title", tripDataUpdated.title);
          formData.append("city", tripDataUpdated.city);
          formData.append("address", tripDataUpdated.address);
          formData.append("desc", tripDataUpdated.desc);
          formData.append("imageDirectory", tripDataUpdated.directory);
          formData.append("tripImage", tripDataUpdated.tripImage);

          const res = await fetch(`${BASE_URL}/trips/${editTrip}`, {
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
        setEditTrip(null);
      }
    
      const submitNewTripDate = async e => {
        e.preventDefault()
    
        try{
          const newSchedule = {
            tripDate : newTripDate,
            maxParticipants : maxParticipant,
            price : price,
          }
          const res = await fetch(`${BASE_URL}/schedules/${addNewSchedule}`,{
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
            alert(dataReponse.message);
            setTrips((prevTrips) => prevTrips.filter((trip) => trip._id !== e));
          }
        } catch (error) {
          console.error(error);
        }
      }

    return (
      <div className='p-3'>
        <div>
          <h4>Trips</h4>
          {
            trips?.map((seringTrip, index) => (
              <div className='border-bottom mb-3'>
                <div key={index} className='d-flex mb-3'>
                  <div className='d-flex flex-column'>
                    <img style={{width:'200px',height:'100px',objectFit:'fill'}} src={seringTrip.photo} alt="" srcset="" />
                    <div>
                      <h6>{seringTrip.title}</h6>
                    </div>

                    <div className='d-flex me-4'>
                      <div onClick={()=>toggleEdit(seringTrip._id)} className='btn__editTripData me-2'>
                        Ubah<i className="ri-edit-box-fill"></i>
                      </div>

                      <div className='btn__addScheduleTrip me-2' onClick={()=>toggleAddNewSchedule(seringTrip._id)}>
                        Tambah<i className="ri-add-line"></i>
                      </div>

                      <div className='btn__deleteTrip' onClick={()=>deleteTrip(seringTrip._id)}>
                        Hapus<i className="ri-delete-bin-2-line"></i>
                      </div>
                    </div>
                  </div>
                  <div className='schedule__Columns'>
                    {
                      seringTrip.schedules?.map((scheduleTrip, indexS)=>(
                        <div key={indexS} style={{color:'white'}} className='d-flex'>
                          <FormatDate dateString={scheduleTrip.tripDate}/>
                          <div onClick={()=>toggleEdit(seringTrip._id)} className='btn__editTripData me-2 ms-2'>
                            Ubah<i className="ri-edit-box-fill"></i>
                          </div>
                          <div className='btn__deleteTrip' onClick={()=>deleteTrip(seringTrip._id)}>
                            Hapus<i className="ri-delete-bin-2-line"></i>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                </div>
                {
                    editTrip === seringTrip._id && (
                    <form onSubmit={submitUpdate}>
                      <div className="mb-3">
                        <label htmlFor="judulTrip" className="form-label">Judul Trip</label>
                        <input type="text" className="form-control" id="title" placeholder={seringTrip.title} aria-describedby="emailHelp" onChange={(e) => setTripDataUpdated({ ...tripDataUpdated, title: e.target.id === 'title' && e.target.value === "" ? (seringTrip.title) : (e.target.value) })}/>
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                      </div>

                      <div className="mb-3">
                        <label htmlFor="daerahTrip" className="form-label">Daerah Tujuan Trip</label>
                        <input type="text" className="form-control" placeholder={seringTrip.city} id="city" onChange={(e) => setTripDataUpdated({ ...tripDataUpdated, city: e.target.id === 'city' && e.target.value === "" ? (seringTrip.city) : (e.target.value) })}/>
                      </div>

                      <div className="mb-3">
                        <label htmlFor="alamatTrip" className="form-label">Alamat Tujuan Trip</label>
                        <input type="text" className="form-control" id="address" placeholder={seringTrip.address} onChange={(e) => setTripDataUpdated({ ...tripDataUpdated, address: e.target.id === 'address' && e.target.value === "" ? (seringTrip.address) : (e.target.value) })}/>
                      </div>

                      <div className="mb-3">
                        <label htmlFor="deskripsiTrip" className="form-label">Deskripsi Trip</label>
                        <input type="text" className="form-control" id="desc" placeholder={seringTrip.desc} onChange={(e) => setTripDataUpdated({ ...tripDataUpdated, desc: e.target.id === 'desc' && e.target.value === "" ? (seringTrip.desc) : (e.target.value) })}/>
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
                    addNewSchedule === seringTrip._id && (
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
                        <Button onClick={()=>toggleAddNewSchedule(seringTrip._id)} size='sm' className="btn secondary__btn auth__btn" type='reset'>
                        Cancel
                        </Button>
                        </div>
                    </div>                          
                    </Form>
                    )
                }
              </div>
            ))
          }
        </div>
          
         
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