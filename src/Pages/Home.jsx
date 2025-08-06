import React, { useState, useEffect } from "react";
import "../Css/Home.css";
import { Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../Pages/firebase";
import adultimport from "/assets/NB-3811_Comp_A_9060_Adults_Desktop.jpg"
import rcshorts from "public/image/NB-3811_Comp_I1_Image_RCShorts.jpg"

const Home = () => {
  const [activeTab, setActiveTab] = useState("women");
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRecommendedLeftArrow, setShowRecommendedLeftArrow] =
    useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchHomeProducts = async () => {
      try {
        const docRef = doc(db, "products", "Home");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          console.log("✅ Fetched Home products:", data.products);
          setProducts(data.products || []);
        } else {
          console.warn("⚠️ Home document not found in Firestore.");
        }
      } catch (error) {
        console.error("❌ Error fetching Home products:", error);
      }
    };

    fetchHomeProducts();
  }, []);

  const recommendedProducts = products?.Recommended?.slice(0, 6) || [];

  const productsByTab = {
    women: products?.Women || [],
    men: products?.Men || [],
    kids: products?.Kids || [],
  };

  const handleProgressClick = (e, containerId, progressId) => {
    const container = document.getElementById(containerId);
    const progress = document.getElementById(progressId);
    const progressBar = e.currentTarget;

    if (!container || !progress || !progressBar) return;

    const clickX = e.nativeEvent.offsetX;
    const barWidth = progressBar.offsetWidth;
    const scrollWidth = container.scrollWidth - container.clientWidth;

    const targetScrollLeft = (clickX / barWidth) * scrollWidth;
    container.scrollTo({
      left: targetScrollLeft,
      behavior: "smooth",
    });

    const isRight = clickX > barWidth / 2;
    progress.style.left = isRight ? "50%" : "0%";
    progress.style.width = "50%";

    setTimeout(() => {
      progress.style.width = "0%";
    }, 800);
  };

  const handleScrollLeft = () => {
    const container = document.getElementById("scrollContainer");
    if (container) {
      container.scrollLeft -= 300;
      setShowLeftArrow(container.scrollLeft > 0);
    }
  };

  const handleScrollRight = () => {
    const container = document.getElementById("scrollContainer");
    if (container) {
      container.scrollLeft += 300;
      setShowLeftArrow(container.scrollLeft > 0);
    }
  };

  useEffect(() => {
    const container = document.getElementById("scrollContainer");
    const progress = document.getElementById("scrollProgress");

    const recommendedContainer = document.getElementById(
      "recommendedScrollContainer"
    );
    const recommendedProgress = document.getElementById(
      "recommendedScrollProgress"
    );

    if (container && progress) {
      const updateScrollState = () => {
        const scrollWidth = container.scrollWidth - container.clientWidth;
        const scrollLeft = container.scrollLeft;
        const scrolled = (scrollLeft / scrollWidth) * 100;
        progress.style.width = `${scrolled}%`;
        setShowLeftArrow(scrollLeft > 0);
      };
      container.addEventListener("scroll", updateScrollState);
      return () => container.removeEventListener("scroll", updateScrollState);
    }

    if (recommendedContainer && recommendedProgress) {
      const updateRecommendedScroll = () => {
        const scrollWidth =
          recommendedContainer.scrollWidth - recommendedContainer.clientWidth;
        const scrollLeft = recommendedContainer.scrollLeft;
        const scrolled = (scrollLeft / scrollWidth) * 100;
        recommendedProgress.style.width = `${scrolled}%`;
        setShowRecommendedLeftArrow(scrollLeft > 0);
      };
      recommendedContainer.addEventListener("scroll", updateRecommendedScroll);
      return () =>
        recommendedContainer.removeEventListener(
          "scroll",
          updateRecommendedScroll
        );
    }
  }, []);

  return (
    <div className="home">
      {/* Hero Section */}
      <div className="image-container">
        <img
          src={adultimport}
          alt="background"
          className="background"
        />
        <div className="overlay-content">
          <h1>The 9060</h1>
          <p>Modern Expressionism</p>
          <Link to={"/New"}>
            <button type="button" className="button">Shop Now</button>
          </Link>
        </div>
      </div>

      {/* Categories */}
      <div className="categories-grid">
        {[
          {
            src: "/image/NB-5794_Multi_Tile_Shoes.jpg",
            label: "Shoes",
            route: "/Shoes",
          },
          {
            src: "/image/NB-3811_Multi_Tile_Clothing.jpg",
            label: "Clothing",
            route: "/clothing",
          },
          {
            src: "/image/NB-3811_Multi_Tile_Accessories.jpg",
            label: "Accessories",
            route: "/accessories",
          },
          {
            src: "/image/NB-3811_Multi_Tile_NewArrivals.jpg",
            label: "New arrivals",
            route: "/New",
          },
        ].map((cat, idx) => (
          <Link to={cat.route} key={idx} className="category-card">
            <img src={cat.src} alt={cat.label} />
            <span className="label">{cat.label}</span>
          </Link>
        ))}
      </div>

      {/* Trending Tabs */}
      <div className="trendings">
        <h2>Trending for Back to School</h2>
        <div className="category-tabs">
          {["women", "men", "kids"].map((tab) => (
            <button
              key={tab}
              className={`tab-item ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
              type="button"
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div className="products-carousel-wrapper">
          {showLeftArrow && (
            <button className="scroll-button left" onClick={handleScrollLeft}>
              {"<"}
            </button>
          )}
          <div className="products-carousel" id="scrollContainer">
            {productsByTab[activeTab].map((item, idx) => (
              <Link
                to={`/product/${item.id}`}
                key={idx}
                className="product-card"
              >
                <img src={item.images[0]} alt={item.name} />
                <p>{item.name}</p>
                <p>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</p>
                <p className="price">${item.price}</p>
              </Link>
            ))}
          </div>
          <button className="scroll-button right" onClick={handleScrollRight}>
            {">"}
          </button>

          <div className="scroll-footer">
            <div
              className="scroll-bar"
              onClick={(e) =>
                handleProgressClick(e, "scrollContainer", "scrollProgress")
              }
            >
              <div className="scroll-progress" id="scrollProgress"></div>
            </div>
            <Link to={"/New"}><button type="button" className="shop-button">
              Shop all
            </button></Link>
          </div>
        </div>
      </div>

      <div className="shop-by-category">
        <h2>Shop by category</h2>
        <div className="shop-img">
          <div>
            <Link to={"/Women"}><img
              src="/public/image/NB-3811_Comp_I1_Image_WomenRunning.jpg"
              alt="image"
              className="shopby"
            />
            <p>Women's Collection</p></Link>
          </div>
          <div>
            <Link to={"/Men"}><img
              src={rcshorts}
              alt="image"
              className="shopby"
            />
            <p>Men's collection</p></Link>
          </div>
          <div>
            <Link to={"/Kids"}><img
              src="/public/image/NB-3811_Comp_I1_Image_Kids.jpg"
              alt="image"
              className="shopby"
            />
            <p>Kids</p></Link>
          </div>
        </div>
      </div>

      <div className="image-container">
        <img
          src="/assets/NB-3811_Comp_A_RunFast_Desktop.jpg"
          alt="background"
          className="background"
        />
        <div className="overlay-content">
          <h1>We're back</h1>
          <p>Essentials for running and performance.</p>
          <Link to={"/Clothing"}>
            <button type="button" className="button">Shop Now</button>
          </Link>
        </div>
      </div>

      <div className="recommended">
        <h2>Recommended for you</h2>

        {showRecommendedLeftArrow && (
          <button
            className="scroll-button left"
            onClick={() => {
              const container = document.getElementById(
                "recommendedScrollContainer"
              );
              if (container) {
                container.scrollLeft -= 300;
                setShowRecommendedLeftArrow(container.scrollLeft > 0);
              }
            }}
          >
            {"<"}
          </button>
        )}

        <div className="recommended-images" id="recommendedScrollContainer">
          {recommendedProducts.map((item, index) => (
            <Link to={`/product/${item.id}`} key={index}>
              <div>
                <img src={item.images[0]} alt={item.name} />
                <p className="product">{item.name}</p>
                <p className="catogory">{item.catogory}</p>
                <p className="price">${item.price}</p>
              </div>
            </Link>
          ))}
        </div>

        <button
          className="scroll-button right"
          onClick={() => {
            const container = document.getElementById(
              "recommendedScrollContainer"
            );
            if (container) {
              container.scrollLeft += 300;
              setShowRecommendedLeftArrow(container.scrollLeft > 0);
            }
          }}
        >
          {">"}
        </button>

        <div className="scroll-footer">
          <div
            className="scroll-bar"
            onClick={(e) =>
              handleProgressClick(
                e,
                "recommendedScrollContainer",
                "recommendedScrollProgress"
              )
            }
          >
            <div
              className="scroll-progress"
              id="recommendedScrollProgress"
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
