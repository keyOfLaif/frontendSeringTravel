import React from 'react'
import '../styles/home.css'

import {Container, Row, Col} from 'reactstrap';
import Subtitle from '../shared/Subtitle';
import heroImg from '../assets/images/hero-img01.jpg';
import heroImg02 from '../assets/images/hero-img02.jpg';
import heroVideo from '../assets/images/hero-video.mp4';
import worldImg from '../assets/images/world.png';
// import SearchBar from '../shared/SearchBar';
import ServiceList from '../services/ServiceList';
import FeaturedTripList from '../components/Featured-trips/FeaturedTripList';
import experienceImg from '../assets/images/experience.png';
import MasonryImagesGallery from '../components/Image-gallery/MasonryImagesGallery';
import Testimony from '../components/Testimony/Testimony';
import Newsletter from '../shared/Newsletter';

const Home = () => {
  return (
  <>
      <section>
        <Container>
          <Row>
          <Col lg='2'>
              <div className='hero__img-box'>
                <img src={heroImg} alt="" />
              </div>
            </Col>
            <Col lg='2'>
              <div className='hero__img-box hero__video-box mt-4'>
                <img src={heroImg02} alt="" />
              </div>
            </Col>
            <Col lg='2'>
              <div className='hero__img-box mt-5'>
                <video src={heroVideo} alt="" controls />
              </div>
            </Col>
            <Col lg='6'>
              <div className="hero__content">
                <div className="hero__subtitle d-flex align-items-center">
                  <Subtitle subtitle={'Ayok Ikut Sering Travel'}/>
                  <img src={worldImg} alt="" />
                </div>
                  <h1>
                    Perjalanan menemukan <span className="highlight">impian dan kenangan</span>
                  </h1>
                  <p>
                    Sering Travel menyajikan suasana perjalanan yang menyenangkan dan tak terlupakan bagi teman-teman yang ingin .
                  </p>
              </div>
            </Col>
            
            {/* <SearchBar/> */}
          </Row>
        </Container>
      </section>
      
      {/* Hero Section */}
      <section>
        <Container>
          <Row>
            <Col lg='3'>
              <h5 className='services__subtitle'>Layanan dari Kami</h5>
              <h2 className='services__title'>Siap memberi yang terbaik</h2>
            </Col>
            
          <ServiceList/>
          </Row>
        </Container>
      </section>

      {/* Featured Trip SEction */}
      <section>
        <Container>
          <Row>
            <Col lg="12" className='mb-5'>
              <Subtitle subtitle={"Explore"}/>
              <h2 className="featured__trip-title">Trip yang kami sediakan</h2>
            </Col>
            <FeaturedTripList/>
          </Row>
        </Container>
      </section>

      {/* Experience Section */}
      <section>
        <Container>
          <Row>
            <Col lg='6'>
              <div className="experience__content">
                <Subtitle subtitle={"Experience"}/>

                <h2>
                  Dengan Segenap Hati <br/> kami akan melayanimu
                </h2>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.<br/> Doloremque voluptate doloribus voluptas perferendis neque.
                </p>
              </div>
              <div className="counter__wrapper d-flex align-items-center gap-5">
                <div className="counter__box">
                  <span>12k+</span>
                  <h6>Trip Terselenggara</h6>
                </div>
                <div className="counter__box">
                  <span>2k+</span>
                  <h6>Pelanggan</h6>
                </div>
                <div className="counter__box">
                  <span>3</span>
                  <h6>Lama Berdiri</h6>
                </div>
              </div>
            </Col>
            <Col lg='6'>
              <div className="experience__img">
                <img src={experienceImg} alt="" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Gallery section */}
      <section>
        <Container>
          <Row>
            <Col lg='12'>
              <Subtitle subtitle={'Gallery'}/>
              <h2 className='gallery__title'>Lihat Gallery Pelanggan Kami</h2>
            </Col>
            <Col lg='12'>
              <MasonryImagesGallery/>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Testimony Section */}
      <section>
        <Container>
          <Row>
            <Col lg='12'>
              <Subtitle subtitle={'Fans Love'}/>
              <h2 className='testimoni__title'>Testimony</h2>
            </Col>
          </Row>
          <Col lg='12'>
            <Testimony/>
          </Col>
        </Container>
      </section>

      {/* <Newsletter/> */}

    </>
    );
}

export default Home;
