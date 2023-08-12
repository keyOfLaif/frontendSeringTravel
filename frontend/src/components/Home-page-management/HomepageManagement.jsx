import React, {useState} from 'react'
import { List, Row, Col, Modal, ModalBody, ModalHeader, ListInlineItem } from 'reactstrap'
import ImageUploader from '../ImageUploader/ImageUploader'
import './homepagemanagement.css'

const HomepageManagement = () => {
  const [modalImage, setModalImage] = useState(false);

  const toggleModalImage = () => setModalImage(!modalImage);


  return (
    <section className='pt-0'>
      <div className='section__cover p-3'>
        <h5>Section Cover</h5>
        <div className='section__coverInputBox d-flex align-items-center'>
          <div className='section__coverInputBoxIndicator'>Judul</div>
          <input type="text" placeholder='Ayo Ikut Sering Travel'/>
        </div>
        <div className='section__coverInputBox d-flex align-items-center'>
          <div className='section__coverInputBoxIndicator'>Sub Judul</div>
          <input type="text" placeholder='Perjalanan menemukan impian dan kenangan'/>
        </div>
        <div className='section__coverInputBox d-flex align-items-center'>
          <div className='section__coverInputBoxIndicator'>Deskripsi</div>
          <input type="text" placeholder='Ayo Ikut Sering Travel'/>
        </div>
      </div>

      <div className='section__cover p-3'>
        <h5>Section Cover</h5>
        <div className='section__coverInputBox d-flex align-items-center'>
          <div className='section__coverInputBoxIndicator'>Judul</div>
          <input type="text" placeholder='Ayo Ikut Sering Travel'/>
        </div>
        <div className='section__coverInputBox d-flex align-items-center'>
          <div className='section__coverInputBoxIndicator'>Sub Judul</div>
          <input type="text" placeholder='Ayo Ikut Sering Travel'/>
        </div>
        <div className='section__coverInputBox d-flex align-items-center'>
          <div className='section__coverInputBoxIndicator'>Deskripsi</div>
          <input type="text" placeholder='Ayo Ikut Sering Travel'/>
        </div>
      </div>

      <div className='section__cover p-3'>
        <h5>Section Experience</h5>
        <div className='section__coverInputBox d-flex align-items-center'>
          <div className='section__coverInputBoxIndicator'>Judul</div>
          <input type="text" placeholder='Ayo Ikut Sering Travel'/>
        </div>
        <div className='section__coverInputBox d-flex align-items-center'>
          <div className='section__coverInputBoxIndicator'>Sub Judul</div>
          <input type="text" placeholder='Ayo Ikut Sering Travel'/>
        </div>
        <div className='section__coverInputBox d-flex align-items-center'>
          <div className='section__coverInputBoxIndicator'>Deskripsi</div>
          <input type="text" placeholder='Ayo Ikut Sering Travel'/>
        </div>
      </div>

      <div className='section__testimony p-3'>
        <h5>Section Testimony</h5>
      </div>

      <div className='p-3'>
        <h4>Gallery</h4>
        <Row>
          <h5>Images</h5>
          <Col lg='6'>
            <List type="inline" className='p-0'>
              <ListInlineItem>
                <span className='border-end pe-1'>
                Lorem ipsum<i onClick={toggleModalImage} className="ri-eye-line align-bottom ms-2"></i><i className="ri-close-circle-line align-bottom ms-2"></i>
                </span>
              </ListInlineItem>
              <ListInlineItem>
                <span className='border-end pe-1'>
                Lorem ipsum<i onClick={toggleModalImage} className="ri-eye-line align-bottom ms-2"></i><i className="ri-close-circle-line align-bottom ms-2"></i>
                </span>
              </ListInlineItem>
              <ListInlineItem>
                <span className='border-end pe-1'>
                Lorem ipsum<i onClick={toggleModalImage} className="ri-eye-line align-bottom ms-2"></i><i className="ri-close-circle-line align-bottom ms-2"></i>
                </span>
              </ListInlineItem>
              <ListInlineItem>
                <span className='border-end pe-1'>
                Lorem ipsum<i onClick={toggleModalImage} className="ri-eye-line align-bottom ms-2"></i><i className="ri-close-circle-line align-bottom ms-2"></i>
                </span>
              </ListInlineItem>
            </List>
          </Col>
          <Col lg='6'>
            <ImageUploader directoryUpload={`../frontend/public/tour-images`}/>
          </Col>
            <Modal isOpen={modalImage} toggle={toggleModalImage}>
              <ModalHeader toggle={toggleModalImage}>Judul Image</ModalHeader>
              <ModalBody>
                
              </ModalBody>
            </Modal>
        </Row>
        
      </div>
    </section>
  )
}

export default HomepageManagement