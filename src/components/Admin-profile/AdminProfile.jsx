import React, { useContext, useState, useEffect } from 'react'
import useFetch from '../../hooks/useFetch'
import { AuthContext } from '../../context/AuthContext'

const AdminProfile = () => {
  const { user, dispatch } = useContext(AuthContext);

  //inisiasi variabel untuk data baru dan perubahannya
  const [newUsername, setNewUsername] = useState(user.username)
  const [newEmail, setNewEmail] = useState(user.email)
  const [newFullName, setNewFullName] = useState(user.fullName)

  //inisiasi variabel untuk cek perubahan data
  const [isUsernameChanged, setIsUsernameChanged] = useState(false)
  const [isEmailChanged, setIsEmailChanged] = useState(false)
  const [isFullNameChanged, setIsFullNameChanged] = useState(false)

  const handleUsernameChange = (event) =>{
    setNewUsername(event.target.value);
    setIsUsernameChanged(event.target.value !== user.username)
  }
  const handleEmailChange = (event) =>{
    setNewEmail(event.target.value);
    setIsEmailChanged(event.target.value !== user.email)
  }
  const handleFullNameChange = (event) =>{
    setNewFullName(event.target.value);
    setIsFullNameChanged(event.target.value !== user.fullName)
  }


  const handleSave = () => {
    // Simpan perubahan ke server (Anda perlu mengimplementasikan logika ini)

    // Setelah berhasil disimpan, perbarui state user
    dispatch({
      type: 'UPDATE_USER_DATA',
      payload: {
        ...user,
        username: newUsername,
        email: newEmail,
        fullName: newFullName
      },
    });
    setIsEmailChanged(false)
    setIsFullNameChanged(false)
    setIsUsernameChanged(false)
  };

  useEffect(() => {
    setIsUsernameChanged(newUsername !== user.username);
    setIsEmailChanged(newEmail !== user.email);
    setIsFullNameChanged(newFullName !== user.fullName);
  }, [newUsername, newFullName, newEmail]);

  return (
    <div>
      {console.log("Data user : ", user)}
      <h1>Admin Profile</h1>
      <p>
        Username: 
        <input
          type="text"
          value={newUsername}
          onChange={handleUsernameChange}
        />
      </p>
      <p>
        Email:
        <input
          type="email"
          value={newEmail}
          onChange={handleEmailChange}
        />
      </p>
      <p>
        Nama:
        <input
          type="text"
          value={newFullName}
          onChange={handleFullNameChange}
        />
      </p>
      <button onClick={handleSave} disabled={!isEmailChanged && !isFullNameChanged && !isUsernameChanged}>Simpan</button>
    </div>
  );
};

export default AdminProfile