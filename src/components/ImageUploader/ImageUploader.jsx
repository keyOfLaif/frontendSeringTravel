import React, { useState } from 'react';
import { Form, Button } from 'reactstrap';
import { BASE_URL } from '../../utils/config'

const ImageUploader = ({directoryUpload}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const allowedTypes = ['image/jpeg', 'image/png'];
    const maxSizeInBytes = 2 * 1024 * 100 ; // 500 Kb

    if (file && allowedTypes.includes(file.type) && file.size <= maxSizeInBytes) {
      setSelectedImage(file);
      setErrorMessage('');
    } else {
      setSelectedImage(null);
      setErrorMessage('Please select a valid image file (JPEG or PNG) within 200Kb.');
    }
  };

  const handleUploadImage = async e =>{
    e.preventDefault();

    if (!selectedImage){
      setErrorMessage('Please select an image')
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedImage);
    // formData.append('directory', directoryUpload);
    console.log(formData)

     try {
              const res = await fetch(`${BASE_URL}/gallerys/upImage?directory=${directoryUpload}`,{
                  method: 'POST',
                  body: formData,
              })

              if(!res.ok) {
                const result = await res.json()
                return alert(result.message)
              }
              const result = await res.json()
              console.log(result)
              alert(result.message)
              setSelectedImage(null);
              setErrorMessage('');
          } catch (err) {
              alert(err.message)
      }
  }

  return (
    <div>
      <Form onSubmit={handleUploadImage}>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        {errorMessage && <p>{errorMessage}</p>}
        {selectedImage && <img src={URL.createObjectURL(selectedImage)} alt="Selected" />}
        <Button type='submit' onClick={handleUploadImage}>Upload</Button>
      </Form>
    </div>
  );
};

export default ImageUploader;
