import React from 'react'
import './about.css'
import profil from '../../assets/images/ava-1.jpg'

import {Container} from 'reactstrap'

const About = () => {
  return (
    <div className='aboutContainer'>
      <Container>
        <div className='profil__OnAbout'>
          <img src={profil} alt="" srcset="" />
          <div className='profil__note'>
            <h6>Ilham Sakti Bimantara</h6>
            <p>"Lorem ipsum dolor sit amet consectetur adipisicing elit."</p>
          </div>
        </div>
        <div className='mt-5 profil__content'>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis perferendis architecto dolor quidem sequi autem voluptas inventore mollitia fugit, quibusdam doloremque sint culpa dolore saepe adipisci. Labore provident amet adipisci.</p>
        </div>
      </Container>
    </div>
  )
}

export default About