import React, { useState, useEffect, useRef } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../Pages/firebase"; 
import "../Css/Search.css";
import { Link } from "react-router-dom";

const Search = () => {
  const [query, setQuery] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef(null);

  // Fetch all products once
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const snapshot = await getDocs(collection(db, "products"));
        const loaded = [];

        snapshot.forEach(doc => {
          const data = doc.data();
          if (Array.isArray(data.products)) {
            loaded.push(...data.products);
          }
        });

        setAllProducts(loaded);
      } catch (err) {
        console.error("🔥 Error loading products:", err);
      }
    };

    fetchProducts();
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle typing
  const handleSearch = (e) => {
    const input = e.target.value.toLowerCase();
    setQuery(input);

    if (!input.trim()) {
      setFilteredProducts([]);
      setShowDropdown(false);
      return;
    }

    const matches = allProducts.filter(product =>
      product.name?.toLowerCase().includes(input)
    );

    setFilteredProducts(matches);
    setShowDropdown(true);
  };

  // Handle clearing search
  const handleClear = () => {
    setQuery("");
    setFilteredProducts([]);
    setShowDropdown(false);
  };

  return (
    <div className="search-box-wrapper" ref={searchRef}>
      <div className="search-input-container">
        <input
          type="text"
          placeholder="Search for products..."
          value={query}
          onChange={handleSearch}
          className="search-input"
        />
        {query && (
          <button className="clear-btn" onClick={handleClear}>
            ✕
          </button>
        )}
      </div>

      {showDropdown && query && (
        <div className="search-dropdown">
          <div className="search-results">
            <h4 className="section-title">Top Results</h4>
            {filteredProducts.slice(0, 4).map((item, idx) => (
              <Link to={`/product/${item.id || idx}`} key={idx} className="search-card">
                <img
                  src={item.images?.[0] || "/placeholder.jpg"}
                  alt={item.name}
                  className="thumb"
                />
                <div className="details">
                  <p className="name">{item.name}</p>
                  <p className="price">${item.price}</p>
                </div>
              </Link>
            ))}
            
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
