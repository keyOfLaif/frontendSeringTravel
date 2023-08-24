import React, { useState } from 'react'
import './adminmanagement.css'
import { BASE_URL } from '../../utils/config'

const AdminManagement = () => {
    const [newAdmin, setNewAdmin] = useState({
        username : '',
        email : '',
        password : '',
    })

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
  return (
    <div className='container pt-3'>
        <h6>Daftar Admin</h6>
        <table className="table">
            <thead>
                <tr>
                <th scope="col">No</th>
                <th scope="col">Nama</th>
                <th scope="col">Aksi</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>
                    <i className="ri-delete-bin-2-line"></i><i className="ri-edit-box-line"></i>
                </td>
                </tr>
                <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                </tr>
                <tr>
                <th scope="row">3</th>
                <td colspan="2">Larry the Bird</td>
                </tr>
            </tbody>
        </table>
        <form onSubmit={addNewAdmin}>
            <div class="mb-3">
            <label for="username" class="form-label">username</label>
            <input type="text" class="form-control" id="username" aria-describedby="emailHelp" onChange={(e) => setNewAdmin({ ...newAdmin, username: e.target.value })}/>
            <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div class="mb-3">
            <label for="email" class="form-label">email</label>
            <input type="email" class="form-control" id="email" onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}/>
            </div>
            <div class="mb-3">
            <label for="password" class="form-label">password</label>
            <input type="password" class="form-control" id="password" onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}/>
            </div>
            
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </div>
  )
}

export default AdminManagement