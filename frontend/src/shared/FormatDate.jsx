import React from 'react'

const FormatDate = ({dateString}) => {
    const options = {year: 'numeric', month: 'long', day: 'numeric'}
    const formattedDate = new Date(dateString).toLocaleDateString('id-ID', options)
  return (
    <div>
        Tanggal : {formattedDate}
    </div>
  )
}

export default FormatDate