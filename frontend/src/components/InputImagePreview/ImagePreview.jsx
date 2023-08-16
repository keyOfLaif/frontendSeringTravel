import React from 'react'

const ImagePreview = ({selectedImage}) => {
  return (
    <div>
        {selectedImage && <img src={URL.createObjectURL(selectedImage)} alt="Selected" style={{ maxWidth: '100%', height: 'auto', display: 'block' }}/>}
    </div>
  )
}

export default ImagePreview