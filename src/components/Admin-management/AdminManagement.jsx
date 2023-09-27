import React, { useState } from 'react'
import './adminmanagement.css'
import { BASE_URL } from '../../utils/config'
import useFetch from '../../hooks/useFetch'
import { Collapse } from 'reactstrap'

const AdminManagement = () => {

    const {
      data:admins, 
      loading:loadingFetching, 
      error:errorFetching
    } = useFetch(`${BASE_URL}/admin/getAllAdmin`)

    const [newAdmin, setNewAdmin] = useState({
        username : '',
        email : '',
        password : '',
        fullName : ''
    })

    const [editBoxAdmin, setEditBoxAdmin] = useState(null)
    const [addNewAdminBox, setAddNewAdminBox] = useState(false)

    const toggleAddNewAdminBox = () => setAddNewAdminBox(!addNewAdminBox);

    const toggleEditAdmin = (idAdmin) => {
      setEditBoxAdmin(idAdmin === editBoxAdmin ? null : idAdmin)
    }

    const updateAdminData = async e =>{
      e.preventDefault()
    }

    const addNewAdmin = async e =>{
        e.preventDefault()
        try {
            const res = await fetch(`${BASE_URL}/admin/addNewAdmin`, {
              method: 'POST',
              headers: {
                'content-type':'application/json'
              },
              credentials:'include',
              body: JSON.stringify(newAdmin)
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
    }

    const deleteAdmin = async (e) => {
      try {
        const confirmed = window.confirm("Apakah Anda yakin ingin menghapus admin ini ? ", e.username);
        if(confirmed){
          const response = await fetch(`${BASE_URL}/admin/deleteAdmin/${e}`, {
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
    <div className='container pt-3'>
      <h6>Daftar Admin</h6>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Nama</th>
            <th scope="col">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {admins?.map(admin => (
            <>
              <tr>
                <th>{admin._id}</th>
                <td>{admin.fullName}</td>
                <td>
                  <div>
                    <i className="ri-delete-bin-2-line" onClick={()=>deleteAdmin(admin._id)}></i>
                    
                    <i className="ri-edit-box-line" onClick={()=>toggleEditAdmin(admin._id)}></i>
                  </div>
                </td>
              </tr>
              {
                editBoxAdmin === admin._id && (
                  <tr>
                    <td colspan="3">
                    <Collapse isOpen={true}>
                    <h6>Edit Data {admin.fullName}</h6>
                    <form onSubmit={updateAdminData}>
                      <div className="mb-3">
                      <label for="username" className="form-label">username</label>
                      <input type="text" className="form-control" id="username" aria-describedby="emailHelp" placeholder={admin.username} onChange={(e) => setNewAdmin({ ...newAdmin, username: e.target.value })}/>
                      <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                      </div>
                      <div className="mb-3">
                      <label for="email" className="form-label">email</label>
                      <input type="email" className="form-control" id="email" placeholder={admin.email} onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}/>
                      </div>
                      <div className="mb-3">
                      <label for="fullName" className="form-label">Nama Lengkap</label>
                      <input type="text" className="form-control" placeholder={admin.fullName} id="fullName" onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}/>
                      </div>
                      
                      <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                    </Collapse>
                    </td>
                  </tr>
                )
              }
            </>
          ))}
        </tbody>
      </table>
      
        


      <div style={{width:'min-content', margin:'0 auto'}}>
        <i className="ri-add-circle-fill" onClick={toggleAddNewAdminBox} style={{fontSize:'2rem', cursor:'pointer'}}></i>
      </div>
      <Collapse isOpen={addNewAdminBox}>
        <div className='row justify-content-center'>
          <div className='col col-lg-6'>
            <form onSubmit={addNewAdmin}>
                <div className="mb-3">
                  <label for="username" className="form-label">username</label>
                  <input type="text" className="form-control" id="username" aria-describedby="emailHelp" onChange={(e) => setNewAdmin({ ...newAdmin, username: e.target.value })}/>
                </div>

                <div className="mb-3">
                  <label for="fullName" className="form-label">Nama</label>
                  <input type="text" className="form-control" id="fullName" aria-describedby="emailHelp" onChange={(e) => setNewAdmin({ ...newAdmin, fullName: e.target.value })}/>
                </div>

                <div className="mb-3">
                  <label for="email" className="form-label">email</label>
                  <input type="email" className="form-control" id="email" onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}/>
                </div>

                <div className="mb-3">
                  <label for="password" className="form-label">password</label>
                  <input type="password" className="form-control" id="password" onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}/>
                </div>
                
                <button type="submit" className="btn btn-primary">Tambah Admin</button>
            </form>
          </div>
        </div>
      </Collapse>

    </div>
  )
}

export default AdminManagement