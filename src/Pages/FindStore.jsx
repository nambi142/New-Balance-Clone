import React from "react";
import "../Css/FindStore.css";
import heroImg from "/assets/Microsoft_Teams-image_2.webp";
import returnsImg from "/assets/Rectangle_30.png";
import fittedImg from "/assets/Rectangle_32.png";
import footscanImg from "/assets/D_CompX_slot3.webp";
import pickupImg from "/assets/D_CompX_slot4.webp";

const FindStore = () => {
  return (
    <div className="find-store">
      <div className="visit-store">
        <img src={heroImg} alt="Store Hero" className="visit-image" />
        <div className="visit-content">
          <h1>Visit New Balance</h1>
          <p>Search by ZIP code to find a New Balance store near you</p>
          <a
            href="https://www.google.com/maps/search/new+balnce+stores+/@16.7452246,84.860878,6663313m/data=!3m2!1e3!4b1?authuser=0&entry=ttu&g_ep=EgoyMDI1MDczMC4wIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            className="visit-btn"
          >
            Find a store
          </a>
        </div>
      </div>

      <div className="store-services">
        <h2>In Store Services</h2>
        <p>
          At New Balance stores, you will find a comprehensive selection of
          footwear and apparel. We specialize in personalized, one-on-one
          service to help you find the perfect fit.
        </p>
        <div className="service-cards">
          <div className="card">
            <img src={returnsImg} alt="Easy Returns" />
            <h4>Easy Returns</h4>
            <p>Make returns within 45 days at a store near you.</p>
          </div>
          <div className="card">
            <img src={fittedImg} alt="Get Fitted" />
            <h4>Get Fitted by a Pro</h4>
            <p>Stop into any store for an expert evaluation.</p>
          </div>
          <div className="card">
            <img src={footscanImg} alt="3D Foot Scan" />
            <h4>3D Foot Scan</h4>
            <p>Find the right shoe with a 3D foot scan.</p>
          </div>
          <div className="card">
            <img src={pickupImg} alt="Pick up in Store" />
            <h4>Pick up in Store</h4>
            <p>Buy online and pick up in store.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindStore;
