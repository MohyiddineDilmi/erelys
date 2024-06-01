import React from "react";
import './services-list.css';
import styles from '../../modules/styles.module.css';
import imgSrc0 from '../../assets/i-1.png'
import imgSrc1 from '../../assets/i-2.png'
import imgSrc2 from '../../assets/i-3.png'
import imgSrc3 from '../../assets/i-4.png'
import imgSrc5 from '../../assets/i-6.jpg'
import ImagePlayer from "../components/ImagePlayer";
import VideoPlayer from "../components/VideoPlayer";

const videoUrls = [
    "https://raw.githubusercontent.com/MohyiddineDilmi/data/main/videos/v-7_resized.mp4",
    "https://raw.githubusercontent.com/MohyiddineDilmi/data/main/videos/v-4_resized.mp4",
    "https://raw.githubusercontent.com/MohyiddineDilmi/data/main/videos/v-2_resized.mp4",
    "https://raw.githubusercontent.com/MohyiddineDilmi/data/main/videos/v-1_resized.mp4",
    "https://raw.githubusercontent.com/MohyiddineDilmi/data/main/videos/v-6_resized.mp4",
  ];

  const videoUrls_1 = [
    "https://raw.githubusercontent.com/MohyiddineDilmi/data/main/videos/__v_0.mp4",
    "https://raw.githubusercontent.com/MohyiddineDilmi/data/main/videos/__v_3.mp4",
    "https://raw.githubusercontent.com/MohyiddineDilmi/data/main/videos/__v_5.mp4",
  ];

  const imgUrls = [
    "https://raw.githubusercontent.com/MohyiddineDilmi/data/main/images/__i_0.png",
    "https://raw.githubusercontent.com/MohyiddineDilmi/data/main/images/__i_2.png",
  ];

  function ServicesList() {
    return (
      <>
          <div className="text-tech-container">
              <h1 className={styles.title_primary}>Our Services</h1>
              <p className={styles.text}>We offers top-quality drone services, specializing in Aerial photography, Cinematography and Videography. Quality, safety, and customer satisfaction are our top priorities.</p>
          </div>
        {/* <VideoPlayer videoUrls={videoUrls} /> */}
        <div className="services_list">

          <div className='srvice-card'>
            <VideoPlayer title={"Cinematography and Videography"} description={"SkyFrame provides top-quality aerial cinematography and videography services for film, TV, marketing, and online content. We capture stunning footage and deliver a polished final product to meet your needs."} videoUrls={videoUrls} />
          </div>

          <div className='srvice-card'>
            <ImagePlayer title={"Aerial Photography"} description={"SkyFrame provides high-quality aerial photography services for a variety of purposes, including real estate, marketing, and events. The company's drones are equipped with high-resolution cameras that can capture stunning images from unique angles and perspectives."} images={imgUrls} duration={5}/>
          </div>
        </div>

        {/* <VideoPlayer videoUrls={videoUrls} /> */}
        <div className="services_list">

          <div className='srvice-card'>
            <ImagePlayer title={"Thermography"} description={"Employing advanced thermal imaging technology to provide comprehensive solutions for diverse industries. Our Thermography service offers a vital perspective, revealing hidden details and enabling informed decisions based on temperature variations and heat patterns."} images={[imgSrc0, imgSrc1, imgSrc2, imgSrc5]} duration={5}/>
          </div>

          <div className='srvice-card'>
            <VideoPlayer title={"Photogrammetry"} description={"A state-of-the-art technique that harnesses the power of aerial imagery and precision measurements to create detailed 3D models and maps. Our Photogrammetry service empowers industries with accurate data for informed decision-making and innovative solutions."} videoUrls={videoUrls_1} />
          </div>
        </div>
      </>
    );
  }
  
  export default ServicesList;