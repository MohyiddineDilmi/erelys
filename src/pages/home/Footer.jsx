import React from "react";
import './footer.css';
import logoPath from '../../assets/air-borne-logo-white.svg';
import styles from '../../modules/styles.module.css';
import ContactUs from "../components/ContactUs";

const footer_data = [
    {
        title: "Vision",
        description: "SkyFrame's vision is to transform the way people see and experience the world. By using the latest technology and innovative techniques, the company aims to capture breathtaking aerial imagery that inspires and informs. SkyFrame's ultimate goal is to help clients achieve their vision, whether it's by creating stunning marketing content, conducting detailed surveys and inspections, or providing actionable data insights."
    },
    {
        title: "Mission",
        description: "SkyFrame's mission is to provide safe, efficient, and high-quality drone services that exceed client expectations. The company is committed to delivering innovative solutions that are tailored to each client's unique needs. SkyFrame strives to maintain the highest standards of safety and regulatory compliance in all aspects of its operations. Above all, SkyFrame is dedicated to providing exceptional customer service and building lasting relationships with its clients."
    },
    {
        title: "Values",
        description: "Innovation - SkyFrame is committed to staying at the forefront of the drone services industry by using the latest technology and innovative techniques to provide clients with the best possible solutions. Safety - Safety is a top priority for SkyFrame, and the company takes all necessary precautions to ensure that its operations are conducted safely and in compliance with all regulatory requirements. Quality - SkyFrame is dedicated to delivering high-quality drone services that exceed client expectations. The company has a team of skilled professionals who take pride in their work and strive to produce the best possible results. Customer service - SkyFrame places a strong emphasis on providing exceptional customer service. The company is responsive to client needs and works closely with them to understand their goals and objectives. Integrity - SkyFrame operates with integrity and transparency in all aspects of its business. The company values honesty, fairness, and ethical conduct, and seeks to build trust and credibility with its clients and partners."
    }
]


export default function Footer () {
    return (
        <>
        <div className="footer-container">
            <img src={logoPath} alt="air-borne-logo" style={{ width: '200px', padding: '1rem'}} />
            <div className="text-container">
                {footer_data.map((data, index) => (
                    <div className="text-item" key={index}>
                         <h2 className={styles.title_white}> {data.title} </h2>
                        <p className={styles.text_no_margin}> {data.description} </p>
                    </div>           
                    ))}
            </div>

            <div className="contact-container">
                <h2 className={styles.title_white}> Contact Us </h2>
                <ContactUs/>
                <p className={styles.text_no_margin}>© 2023 SkyFrame. All rights reserved.<br/>
                    Canada, Privacy Policy. </p>
            </div>
        </div> 
        </>
    )
}