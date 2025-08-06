import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "../Pages/firebase";
import '../Css/New.css';

const Women = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
  const fetchKidsProducts = async () => {
    try {
      const docRef = doc(db, "products", "Back to school");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        console.log("Fetched school data:", data);
        setProducts(data.products || []);
      } else {
        console.warn("Backto to school document not found in Firestore.");
      }
    } catch (error) {
      console.error("Error fetching Back to school products:", error);
    }
  };
  fetchKidsProducts();
}, []);

  const handleClick = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="new-page">
      <h2 className="section-title">Back to School Collection</h2>
      <div className="product-grid">
        {products.map((product) => (
          <div
            key={product.id}
            className="product-cards"
            onClick={() => handleClick(product.id)}
            style={{ cursor: "pointer" }}
          >
            <div className="product-image-wrapper">
              <span className="tag-new">Back to school</span>
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

export default Women;
