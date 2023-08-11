import React from 'react'

const ImagePreview = ({selectedImage}) => {
  return (
    <div>
        {selectedImage && <img src={URL.createObjectURL(selectedImage)} alt="Selected" />}
    </div>
  )
}

export default ImagePreview