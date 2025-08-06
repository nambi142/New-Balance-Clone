import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "../Pages/firebase";
import '../Css/New.css';

const Kids = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
  const fetchKidsProducts = async () => {
    try {
      const docRef = doc(db, "products", "Kids");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        console.log("Fetched Kids data:", data);
        setProducts(data.products || []);
      } else {
        console.warn("Kids document not found in Firestore.");
      }
    } catch (error) {
      console.error("Error fetching Kids products:", error);
    }
  };
  fetchKidsProducts();
}, []);

  const handleClick = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="new-page">
      <h2 className="section-title">Kids Collection</h2>
      <div className="product-grid">
        {products.map((product) => (
          <div
            key={product.id}
            className="product-cards"
            onClick={() => handleClick(product.id)}
            style={{ cursor: "pointer" }}
          >
            <div className="product-image-wrapper">
              <span className="tag-new">Kids</span>
              <img
                src={product.images[0]}
                alt={product.name}
                className="product-image primary-image"
              />
              {product.images[1] && (
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

export default Kids;
