import React from 'react';
import '../Css/AccessibilityStatement.css';

const AccessibilityStatement = () => {
  return (
    <div className="accessibility-container">
      <h1>Accessibility Statement</h1>

      <p>
        New Balance is committed to ensuring that individuals with disabilities have equal access to its stores and website.
      </p>

      <p>
        Our stores are designed to be accessible to people with various types of disabilities. Upon request, we provide appropriate auxiliary aids and services to ensure effective communication while shopping, and we make reasonable modifications to our standard policies, practices and procedures where necessary to ensure a great shopping experience for our customers with disabilities.
      </p>

      <p>
        We strive to make our website accessible for users with disabilities and use the Web Content Accessibility Guidelines (WCAG) 2.1 AA as a guide. However, if you have any difficulty using our website because of a disability, or have feedback regarding the accessibility of our website, we are available by telephone to provide assistance for all your shopping needs at <a href="tel:8337642181">(833) 764-2181</a>.
      </p>
    </div>
  );
};

export default AccessibilityStatement;
