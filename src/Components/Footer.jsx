import React, { useState, useEffect } from 'react';
import '../Css/Footer.css';
import { SiNewbalance } from "react-icons/si";
import { FaInstagram, FaFacebookF, FaYoutube, FaPinterestP, FaTiktok } from "react-icons/fa";
import { FaXTwitter, FaChevronDown, FaChevronUp } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const [activeSection, setActiveSection] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSection = (section) => {
    setActiveSection((prev) => (prev === section ? null : section));
  };

  const sections = [
    {
      key: "help",
      title: "Help",
      links: [
        { to: "/Contactus", label: "Contact us" },
        { to: "/TrackOrder", label: "Track your order" },
        { to: "/FAQ", label: "FAQ" }
      ]
    },
    {
      key: "shop",
      title: "Shop",
      links: [
        { to: "/FindStore", label: "Find a store" }
      ]
    },
    {
      key: "about",
      title: "About Us",
      links: [
        { to: "/Ourporpose", label: "Our purpose" },
        { to: "/MedicalTranceparency", label: "Medical Plan Information" }
      ]
    },
    {
      key: "foryou",
      title: "For You",
      links: [
        { to: "/IdeaSubmission", label: "Idea submission" },
        { to: "/AccessibilityStatement", label: "Accessibility statement" }
      ]
    }
  ];

  return (
    <div>
      <div className="signup">
        <h3>Be the first to know about new arrivals</h3>
        <Link to={isLoggedIn ? "/Orders" : "/Login"}>
          <button>Sign up</button>
        </Link>
      </div>

      <div className="footer1">
        {sections.map(({ key, title, links }) => (
          <div className={`footer-section ${key}`} key={key}>
            <div className="footer-header" onClick={() => isMobile && toggleSection(key)}>
              <p>{title}</p>
              {isMobile && (
                activeSection === key ? <FaChevronUp /> : <FaChevronDown />
              )}
            </div>
            <ul style={{ display: !isMobile || activeSection === key ? "block" : "none" }}>
              {links.map(({ to, label }, idx) => (
                <Link to={to} key={idx}><li>{label}</li></Link>
              ))}
            </ul>
          </div>
        ))}

        <div className='independet'>
          <h3>Fearlessly Independent</h3>
          <SiNewbalance className="icon" />
          <p>Independent since 1906, we empower people through sport and craftsmanship to create positive change in communities around the world.</p>
          <div className='external-links'>
            <Link to="https://www.instagram.com/newbalance/"><FaInstagram /></Link>
            <Link to="http://www.facebook.com/Newbalance"><FaFacebookF /></Link>
            <Link to="https://twitter.com/NewBalance"><FaXTwitter /></Link>
            <Link to="https://www.youtube.com/user/newbalance"><FaYoutube /></Link>
            <Link to="https://www.pinterest.com/newbalance/"><FaPinterestP /></Link>
            <Link to="https://www.tiktok.com/@newbalance"><FaTiktok /></Link>
          </div>
        </div>
      </div>

      <div className="footer2">
        <p>New Balance family of brands</p>
        <Link to="https://www.brine.com/"><img src="public/image/brine-logo.jpg" alt="Brine" /></Link>
        <Link to="https://www.warrior.com/"><img src="public/image/warror.jpg" alt="Warrior" /></Link>
        <Link to="https://www.newbalanceteam.com/"><img src="public/image/teamsports-logo.jpg" alt="Team Sports" /></Link>
      </div>

      <div className="copyright">
        <p>Copyright 2025, New Balance</p>
      </div>
    </div>
  );
};

export default Footer;
