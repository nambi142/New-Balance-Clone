import React, { useState } from "react";
import "../Css/FAQ.css";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const faqs = [
  {
    question: "What is your return policy?",
    answer:
      "You can return your product within 30 days of purchase for a full refund, provided it is in original condition.",
  },
  {
    question: "When can I expect my order to ship?",
    answer:
      "Orders are typically processed and shipped within 1-2 business days.",
  },
  {
    question: "When should I expect my order?",
    answer:
      "Delivery usually takes 3–7 business days depending on your location and shipping method.",
  },
  {
    question: "How do I get a discount?",
    answer:
      "Subscribe to our newsletter or check the Promotions section for the latest offers and codes.",
  },
  {
    question: "How should I clean my shoes?",
    answer:
      "Use a soft brush with warm water and mild detergent. Avoid machine washing.",
  },
  {
    question:
      "Should I buy a running shoe, a walking shoe or a training shoe?",
    answer:
      "It depends on your activity. Running shoes are for forward motion, training shoes offer lateral support, and walking shoes are for long comfort.",
  },
  {
    question: "What payments do you accept?",
    answer:
      "We accept PayPal, major credit/debit cards, and New Balance gift cards.",
  },
  {
    question: "How do I become a member?",
    answer:
      "You can create a free account during checkout or via the Sign-Up page to access exclusive benefits.",
  },
  {
    question:
      "Can I buy something online and pick it up at my local New Balance store?",
    answer:
      "Yes, select 'In-Store Pickup' during checkout if your local store offers this option.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-page">
      <h1>Frequently Asked Questions</h1>
      <p className="subtitle">Most Popular FAQs</p>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <div className="faq-question" onClick={() => toggle(index)}>
              <span>{faq.question}</span>
              {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
            </div>
            {openIndex === index && (
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
