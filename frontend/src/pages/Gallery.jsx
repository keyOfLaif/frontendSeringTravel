import React, { useState } from 'react'
import { Container } from 'reactstrap'

import './pages_css/gallery.css'
import MasonryImagesGallery from '../components/Image-gallery/MasonryImagesGallery'

const Gallery = () => {
    const [activeTab, setActiveTab] = useState('photo');

    const handleClick = (tab) =>{
        setActiveTab(tab);
    }
  return (
    
        <Container>
            <div className='gallery__container py-5'>
                <div className='gallery__controller'>
                    <div className={`p-2 ${activeTab === 'photo' ? 'active' : ''}`} onClick={() => handleClick('photo')}>Foto</div>
                    <div className={`p-2 border-right ${activeTab === 'video' ? 'active' : ''}`} onClick={() => handleClick('video')}>Video</div>
                </div>
                <div className='py-3'>
                    <MasonryImagesGallery/>
                    <div className='d-flex align-items-center justify-content-center p-5'>
                        <div>Lihat</div>
                    </div>
                </div>
            </div>
        </Container>
    
  )
}

export default Gallery