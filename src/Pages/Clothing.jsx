import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "../Pages/firebase";
import '../Css/New.css';

const Clothing = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
  const fetchProducts = async () => {
    try {
      const docRef = doc(db, "products", "Cloths");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        console.log("Fetched Cloths data:", data);
        setProducts(data.products || []);
      } else {
        console.warn("Cloths document not found in Firestore.");
      }
    } catch (error) {
      console.error("Error fetching Cloths products:", error);
    }
  };
  fetchProducts();
}, []);

  const handleClick = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="new-page">
      <h2 className="section-title">Cloths Collection</h2>
      <div className="product-grid">
        {products.map((product) => (
          <div
            key={product.id}
            className="product-cards"
            onClick={() => handleClick(product.id)}
            style={{ cursor: "pointer" }}
          >
            <div className="product-image-wrapper">
              <span className="tag-new">Cloths</span>
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

export default Clothing;
