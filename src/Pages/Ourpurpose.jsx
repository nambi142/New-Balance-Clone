import React from 'react';
import '../Css/Ourpurpose.css';
import jkimg from "src/assets/13584_Comp_JK_Image_OC.jpg";
import jkmade from "src/assets/13584_Comp_JK_Image_Made.jpg"
import jkimgmade from "src/assets/13584_Comp_JK_Image_Made.jpg"


const Ourpurpose = () => {
  return (
    <div className="our-purpose-container">
      <section className="our-purpose-header">
        <h1>Our Purpose</h1>
        <p>
          Independent since 1906, we empower people through sport and craftsmanship to create positive change in communities around the world.
        </p>
      </section>

      <section className="section">
        <img src={jkimg} alt="Group of kids" />
        <div className="section-text">
          <h2>Our Communities</h2>
          <p>
            We are committed to creating change by lifting underserved communities through access and opportunity to health and education.
          </p>
        </div>
      </section>

      <section className="section reverse">
        <img src={jkmade} alt="Kids on court" />
        <div className="section-text">
          <h2>Sport Culture</h2>
          <p>
            We believe Everyone's Welcome and has the right to play. We seek to amplify all voices to shape the future of the sports industry.
          </p>
        </div>
      </section>

      <section className="section">
        <img src={jkimgmade} alt="Woman in factory" />
        <div className="section-text">
          <h2>Responsibly Made</h2>
          <p>
            As craftspeople, we have a responsibility and a role to play in protecting and regenerating our ecosystem.
          </p>
        </div>
      </section>

      <section className="contact-section">
        <p>We welcome your feedback on our commitment to Responsible Leadership.</p>
        <p>
          Please feel free to contact us at{' '}
          <a href="mailto:Responsible.Leadership@newbalance.com">
            Responsible.Leadership@newbalance.com
          </a>
        </p>
      </section>
    </div>
  );
};

export default Ourpurpose;
