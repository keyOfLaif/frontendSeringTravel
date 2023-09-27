import React from 'react'

import './imageprev.css'

const ImagePrev = (props) => {
  return (
    <div className="image-container">
        <div className="image-wrapper">
            <img src={props.imageUrl} alt="Displayed Image" />
            <button className="close-button" onClick={props.onClose}>
            Close
            </button>
        </div>
    </div>
  )
}

export default ImagePrev