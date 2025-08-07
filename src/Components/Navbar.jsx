import "../Css/Navbar.css";
import { SiNewbalance } from "react-icons/si";
import { VscAccount } from "react-icons/vsc";
import { BsCart3 } from "react-icons/bs";
import { FiMenu, FiX } from "react-icons/fi"; // new icons
import { useStore } from "../Contaxt/Store";
import { Link, useNavigate } from "react-router-dom";
import Search from "../Components/Search";
import { useState } from "react";

const Navbar = () => {
  const {
    scrolled,
    handleMouseEnter,
    handleMouseLeave,
    newOpen,
    setNewOpen,
    newTimeout,
    cartItems,
    user,
  } = useStore();

  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleAccountClick = () => {
    navigate(user ? "/Orders" : "/Login");
  };

  return (
    <>
      <nav
        className="navbar-2"
        style={{
          top: scrolled ? "0px" : "40px",
          position: "fixed",
          width: "100%",
          zIndex: 1000,
        }}
      >
        {/* ======= Desktop Navbar ======= */}
        <div className="items">
          <SiNewbalance className="icon" />
          <Link to="/" className="nav-label">
            {" "}
            <span>Home</span>{" "}
          </Link>
          <div
            className="nav-item"
            onMouseEnter={() => handleMouseEnter(setNewOpen, newTimeout)}
            onMouseLeave={() => handleMouseLeave(setNewOpen, newTimeout)}
          >
            <Link to="/New" className="nav-label">
              {" "}
              <span>New</span>{" "}
            </Link>
          </div>
          <Link to="/Men" className="nav-label">
            <span>Men</span>
          </Link>
          <Link to="/Women" className="nav-label">
            <span>Women</span>
          </Link>
          <Link to="/Kids" className="nav-label">
            <span>Kids</span>
          </Link>
          <Link to="/Backtoschool" className="nav-label red-label">
            <span>Back to School</span>
          </Link>
        </div>

        <div className="items-2">
          <Search />
          <div onClick={handleAccountClick} style={{ cursor: "pointer" }}>
            <VscAccount className="ac-icon" title="My Account" />
          </div>
          <Link to="/Cart" className="cart-container">
            <BsCart3 className="cart" title="My Cart" />
            {cartItems.length > 0 && (
              <span className="cart-count">
                {cartItems.reduce((total, item) => total + item.quantity, 0)}
              </span>
            )}
          </Link>
        </div>
      </nav>

      {/* ======= Dropdown Desktop ======= */}
      {newOpen && (
        <div
          className="dropdown-wrapper"
          onMouseEnter={() => handleMouseEnter(setNewOpen, newTimeout)}
          onMouseLeave={() => handleMouseLeave(setNewOpen, newTimeout)}
        >
          <ul className="dropdown-images">
            <li>
              <Link to="/Backtoschool">
                <img
                  src="/image/NB-3811_Comp_VizNav_BTS.jpg"
                  alt="Back to School"
                />
                <p>Back to school</p>
              </Link>
            </li>
            <li>
              <Link to="/Men">
                <img
                  src="/image/NB-3811_Comp_VizNav_MenNewArrivals.jpg"
                  alt="Men"
                />
                <p>Men’s new arrivals</p>
              </Link>
            </li>
            <li>
              <Link to="/Women">
                <img
                  src="/image/NB-3811_Comp_VizNav_WomenNewArrivals.jpg"
                  alt="Women"
                />
                <p>Women’s new arrivals</p>
              </Link>
            </li>
            <li>
              <Link to="/Kids">
                <img
                  src="/image/NB-3811_Comp_VizNav_KidsNewArrivals.jpg"
                  alt="Kids"
                />
                <p>Kids’ new arrivals</p>
              </Link>
            </li>
            <li>
              <Link to="/New">
                <img src="/image/NB2966_Comp_NBC_Image1.jpg" alt="Launch" />
                <p>Launch calendar</p>
              </Link>
            </li>
          </ul>
        </div>
      )}

      {/* ====== Mobile Navbar ====== */}
      <div
        className="mobile-navbar"
        style={{
          top: scrolled ? "0px" : "40px",
          position: "fixed",
          width: "100%",
          zIndex: 1000,
        }}
      >
        <div className="mobile-left">
          <FiMenu
            className="mobile-icon"
            onClick={() => setMobileMenuOpen(true)}
          />
          <VscAccount className="mobile-icon" onClick={handleAccountClick} />
        </div>
        <div className="mobile-center">
          <SiNewbalance className="mobile-logo" />
        </div>
        <div className="mobile-right-icons">
          <Link to="/Cart" className="cart-container">
            <BsCart3 className="cart" />
            {cartItems.length > 0 && (
              <span className="cart-count">
                {cartItems.reduce((total, item) => total + item.quantity, 0)}
              </span>
            )}
          </Link>
        </div>
      </div>

      {mobileMenuOpen && (
        <div
          className="mobile-sidebar-overlay"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div className="mobile-sidebar" onClick={(e) => e.stopPropagation()}>
            <div className="sidebar-header">
              <SiNewbalance className="icon" />
              <FiX
                onClick={() => setMobileMenuOpen(false)}
                className="close-icon"
              />
            </div>
            <Link to="/" onClick={() => setMobileMenuOpen(false)}>
              Home
            </Link>
            <Link to="/New" onClick={() => setMobileMenuOpen(false)}>
              New
            </Link>
            <Link to="/Men" onClick={() => setMobileMenuOpen(false)}>
              Men
            </Link>
            <Link to="/Women" onClick={() => setMobileMenuOpen(false)}>
              Women
            </Link>
            <Link to="/Kids" onClick={() => setMobileMenuOpen(false)}>
              Kids
            </Link>
            <Link
              to="/Backtoschool"
              onClick={() => setMobileMenuOpen(false)}
              className="red-label"
            >
              Back to School
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
