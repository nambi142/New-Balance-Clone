import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "../Pages/firebase";
import '../Css/New.css';

const Men = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMenProducts = async () => {
      const docRef = doc(db, "products", "Men");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProducts(docSnap.data().products);
      }
    };
    fetchMenProducts();
  }, []);

  // ✅ Fix: Define this function to handle navigation
  const handleClick = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="new-page">
      <h2 className="section-title">Men Collection</h2>
      <div className="product-grid">
        {products.map((product) => (
          <div
            key={product.id}
            className="product-cards"
            onClick={() => handleClick(product.id)}
            style={{ cursor: "pointer" }}
          >
            <div className="product-image-wrapper">
              <span className="tag-new">Men</span>
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

export default Men;
