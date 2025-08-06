import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../Pages/firebase"; // Make sure this path is correct
import { doc, getDoc } from "firebase/firestore";
import "../Css/New.css"; // Reuse your existing styles

const New = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const docRef = doc(db, "products", "New");
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (Array.isArray(data.products)) {
            setProducts(data.products);
          } else {
            console.error("⚠️ 'products' is not an array");
          }
        } else {
          console.error("⚠️ 'New' document not found");
        }
      } catch (error) {
        console.error("❌ Error fetching New products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleClick = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="new-page">
      <h2 className="section-title">New Arrivals</h2>
      <div className="product-grid">
        {products.map((product) => (
          <div
            key={product.id}
            className="product-cards"
            onClick={() => handleClick(product.id)}
            style={{ cursor: "pointer" }}
          >
            <div className="product-image-wrapper">
              <span className="tag-new">New</span>
              <img
                src={product.images?.[0] || "/placeholder.png"}
                alt={product.name}
                className="product-image primary-image"
              />
              {product.images?.[1] && (
                <img
                  src={product.images[1]}
                  alt={`${product.name} - alternate`}
                  className="product-image secondary-image"
                />
              )}
            </div>

            <div className="product-info">
              <div className="product-name">{product.name}</div>
              <div className="product-type">{product.catogory}</div>
              <div className="product-price">${product.price}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default New;
