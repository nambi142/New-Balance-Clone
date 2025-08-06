import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { collection, getDocs, query, where, addDoc } from "firebase/firestore";
import { db } from "../Pages/firebase";
import "../Css/Productview.css";
import { useStore } from "../Contaxt/Store";

const ProductView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [previewIndex, setPreviewIndex] = useState(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedRating, setSelectedRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [reviewData, setReviewData] = useState({
    name: "",
    email: "",
    comfort: 0,
    quality: 0,
    reviewText: "",
  });

  const { setCartItems } = useStore(); // ✅ Get from context

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size before adding to cart.");
      return;
    }

    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      images: product.images,
      selectedSize,
      quantity,
    };

    const existingCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    existingCart.push(cartItem);

    // ✅ Update localStorage
    localStorage.setItem("cartItems", JSON.stringify(existingCart));

    // ✅ Update global cart context
    setCartItems(existingCart);

    setAddedToCart(true); // optional animation or flag
  };

 
  useEffect(() => {
    const fetchReviews = async () => {
      const q = query(
        collection(db, "user-data"),
        where("productId", "==", id)
      );
      const querySnapshot = await getDocs(q);
      const fetchedReviews = querySnapshot.docs.map((doc) => doc.data());
      setReviews(fetchedReviews);
    };

    fetchReviews();
  }, [id]);

  useEffect(() => {
    const fetchProduct = async () => {
      const snapshot = await getDocs(collection(db, "products"));
      let found = null;

      snapshot.forEach((doc) => {
        const data = doc.data();
        if (data.products && typeof data.products === "object") {
          Object.values(data.products).forEach((arr) => {
            if (Array.isArray(arr)) {
              const match = arr.find((item) => String(item.id) === String(id));
              if (match) found = match;
            }
          });
        }
        if (Array.isArray(data.products)) {
          const match = data.products.find(
            (item) => String(item.id) === String(id)
          );
          if (match) found = match;
        }
      });

      if (found) setProduct(found);
    };

    fetchProduct();
  }, [id]);

  const showPreview = (index) => setPreviewIndex(index);
  const closePreview = () => setPreviewIndex(null);
  const goNext = () =>
    previewIndex < product.images.length - 1 &&
    setPreviewIndex(previewIndex + 1);
  const goPrev = () => previewIndex > 0 && setPreviewIndex(previewIndex - 1);

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setReviewData((prev) => ({ ...prev, [name]: value }));
  };

  const handleStarClick = (field, value) => {
    setReviewData((prev) => ({ ...prev, [field]: value }));
  };

  const submitReview = async () => {
    setSubmitting(true);

    try {
      const reviewRef = collection(db, "user-data");

      const newReview = {
        name: reviewData.name.trim(),
        email: reviewData.email.trim(),
        comfort: reviewData.comfort,
        quality: reviewData.quality,
        reviewText: reviewData.reviewText.trim(),
        productId: id,
        createdAt: new Date(),
      };

      await addDoc(reviewRef, newReview);

      setReviewData({
        name: "",
        email: "",
        comfort: 0,
        quality: 0,
        reviewText: "",
      });

      setShowReviewForm(false);
      alert("✅ Review submitted successfully!");

      const q = query(
        collection(db, "user-data"),
        where("productId", "==", id)
      );
      const querySnapshot = await getDocs(q);
      const fetchedReviews = querySnapshot.docs.map((doc) => doc.data());
      setReviews(fetchedReviews);
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("❌ Failed to submit review. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!product) return <div>Loading...</div>;

  const averageRating =
    reviews.reduce(
      (sum, r) => sum + ((r.quality || 0) + (r.comfort || 0)) / 2,
      0
    ) / (reviews.length || 1);

  return (
    <div className="productview-container">
      <div className="product-top">
        <div className="image-gallery">
          {product.images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`product-${i}`}
              onClick={() => showPreview(i)}
              className="product-thumbnail"
            />
          ))}
        </div>

        <div className="product-info">
          {!addedToCart ? (
            <>
              <h1>{product.name}</h1>
              {reviews.length > 0 && (
                <div className="product-rating-summary">
                  <strong>{averageRating.toFixed(1)} ★</strong>
                  <span>
                    {reviews.length}{" "}
                    {reviews.length === 1 ? "Review" : "Reviews"}
                  </span>
                </div>
              )}
              <p className="price">${product.price}</p>

              <div className="sizes">
                <label>Size</label>
                <div className="size-list">
                  {product.sizes.map((size, i) => (
                    <button
                      key={i}
                      className={selectedSize === size ? "selected" : ""}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="quantity-selector">
                <label>Quantity</label>
                <div className="qty-controls">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  >
                    -
                  </button>
                  <span>{quantity}</span>
                  <button onClick={() => setQuantity((q) => q + 1)}>+</button>
                </div>
              </div>

              <button className="add-to-cart" onClick={handleAddToCart}>
                Add to Cart
              </button>

              <div className="delivery-options">
                <button>Shipping</button>
                <button>Store pickup</button>
                <p>2–5 business days once shipped</p>
              </div>

              <div className="description">
                <h3>Description</h3>
                <p>
                  A premium fitted cotton tee with bold graphics front and
                  center.
                </p>
              </div>
            </>
          ) : (
            <div className="checkout-summary">
              <h2>✓ Added to cart</h2>
              <div className="checkout-item">
                <img src={product.images[0]} alt="Product" />
                <div>
                  <p>
                    <strong>{product.name}</strong>
                  </p>
                  <p>Size: {selectedSize}</p>
                  <p>Qty: {quantity}</p>
                  <p>${(product.price * quantity).toFixed(2)}</p>
                </div>
              </div>
              <div className="cart-buttons">
                <button className="view-cart" onClick={() => navigate("/cart")}>
                  View Cart
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Image Preview Modal */}
      {previewIndex !== null && (
        <div className="image-preview-overlay" onClick={closePreview}>
          <span className="close-button">×</span>
          <img
            src={product.images[previewIndex]}
            alt="Full preview"
            className="preview-img"
            onClick={(e) => e.stopPropagation()}
          />
          {previewIndex > 0 && (
            <button
              className="prev-button"
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
            >
              ‹
            </button>
          )}
          {previewIndex < product.images.length - 1 && (
            <button
              className="next-button"
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
            >
              ›
            </button>
          )}
        </div>
      )}

      {/* Review Section */}
      <div className="review-section">
        <h2>Rate this Product</h2>
        <div className="star-box-container">
          {[1, 2, 3, 4, 5].map((star) => (
            <div
              key={star}
              className={`star-box ${
                star <= (hoveredRating || selectedRating) ? "filled" : ""
              }`}
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(0)}
              onClick={() => {
                setSelectedRating(star);
                setShowReviewForm(true);
              }}
            >
              ★
            </div>
          ))}
        </div>
      </div>

      {/* Review Form Popup */}
      {showReviewForm && (
        <div
          className="review-popup-overlay"
          onClick={() => setShowReviewForm(false)}
        >
          <div
            className="review-form small-form"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="close-top-right"
              onClick={() => setShowReviewForm(false)}
            >
              ×
            </button>

            <h2>Write a Review</h2>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={reviewData.name}
              onChange={handleReviewChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={reviewData.email}
              onChange={handleReviewChange}
            />

            <label>Quality</label>
            <div className="star-group">
              {[1, 2, 3, 4, 5].map((s) => (
                <span
                  key={s}
                  className={`star ${reviewData.quality >= s ? "active" : ""}`}
                  onClick={() => handleStarClick("quality", s)}
                >
                  ★
                </span>
              ))}
            </div>

            <label>Comfort</label>
            <div className="star-group">
              {[1, 2, 3, 4, 5].map((s) => (
                <span
                  key={s}
                  className={`star ${reviewData.comfort >= s ? "active" : ""}`}
                  onClick={() => handleStarClick("comfort", s)}
                >
                  ★
                </span>
              ))}
            </div>

            <textarea
              name="reviewText"
              rows="4"
              placeholder="Write your review..."
              value={reviewData.reviewText}
              onChange={handleReviewChange}
            ></textarea>

            <button
              onClick={submitReview}
              disabled={submitting}
              className="submit-review-btn"
            >
              {submitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </div>
      )}

      {/* Review Summary Section */}
      <div className="review-summary-section">
        <h2>Reviews</h2>

        {/* Overall Rating Block */}
        <div className="overall-rating">
          <div>
            <h3>
              {(
                reviews.reduce((a, b) => a + (b.quality + b.comfort) / 2, 0) /
                  reviews.length || 0
              ).toFixed(1)}{" "}
              ★
            </h3>
            <p>{reviews.length} Reviews</p>
          </div>
          <div className="rating-bars">
            {[5, 4, 3, 2, 1].map((star) => {
              const count = reviews.filter(
                (r) =>
                  Math.round(((r.quality || 0) + (r.comfort || 0)) / 2) === star
              ).length;
              return (
                <div key={star} className="rating-row">
                  <span>{star} star</span>
                  <div className="bar-bg">
                    <div
                      className="bar-fill"
                      style={{
                        width: `${(count / reviews.length) * 100 || 0}%`,
                      }}
                    ></div>
                  </div>
                  <span>{count}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Average Customer Ratings */}
        <div className="average-customer-ratings">
          <h4>Average Customer Ratings</h4>
          <p>
            Quality:{" "}
            {(
              reviews.reduce((a, b) => a + (b.quality || 0), 0) /
                reviews.length || 0
            ).toFixed(1)}{" "}
            ★
          </p>
          <p>
            Comfort:{" "}
            {(
              reviews.reduce((a, b) => a + (b.comfort || 0), 0) /
                reviews.length || 0
            ).toFixed(1)}{" "}
            ★
          </p>
        </div>

        {/* Helpful Reviews */}
        <div className="highlighted-reviews">
          <div className="positive-review">
            <h4>Most Helpful Favorable Review</h4>
            {reviews[0] ? (
              <div>
                <p>
                  <strong>{reviews[0].name || "Anonymous"}</strong>
                </p>
                <p className="review-text">“{reviews[0].reviewText}”</p>
                <p className="review-rating">
                  Quality: {"★".repeat(reviews[0].quality)}
                  {"☆".repeat(5 - reviews[0].quality)} | Comfort:{" "}
                  {"★".repeat(reviews[0].comfort)}
                  {"☆".repeat(5 - reviews[0].comfort)}
                </p>
              </div>
            ) : (
              <p>No reviews yet.</p>
            )}
          </div>

          <div className="critical-review">
            <h4>Most Helpful Critical Review</h4>
            {reviews[1] ? (
              <div>
                <p>
                  <strong>{reviews[1].name || "Anonymous"}</strong>
                </p>
                <p className="review-text">“{reviews[1].reviewText}”</p>
                <p className="review-rating">
                  Quality: {"★".repeat(reviews[1].quality)}
                  {"☆".repeat(5 - reviews[1].quality)} | Comfort:{" "}
                  {"★".repeat(reviews[1].comfort)}
                  {"☆".repeat(5 - reviews[1].comfort)}
                </p>
              </div>
            ) : (
              <p>No critical reviews yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductView;
