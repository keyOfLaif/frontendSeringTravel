import React from 'react'

const History = () => {
  return (
    <div className='container pt-3'>
        <h6>Histori Transaksi</h6>
        <table className="table">
            <thead>
                <tr>
                <th scope="col">No</th>
                <th scope="col">Nama</th>
                <th scope="col">User/Admin</th>
                <th scope="col">Kegiatan</th>
                <th scope="col">Waktu</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <th scope="row">1</th>
                <td>Andrie</td>
                <td>User</td>
                <td>Mengirimkan Bukti Pembayaran</td>
                <td>Senin 20 Mei 1999 23:00</td>
                </tr>
                <tr>
                <th scope="row">2</th>
                <td>Ahmad</td>
                <td>Admin</td>
                <td>Mengkonfirmasi Bukti Pembayaran</td>
                <td>Selasa 29 MEi 2093 22:00</td>
                </tr>
            </tbody>
        </table>
    </div>
  )
}

export default History