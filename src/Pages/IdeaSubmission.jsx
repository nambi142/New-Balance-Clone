import React from 'react';
import '../Css/IdeaSubmission.css';

const IdeaSubmission = () => {
  return (
    <div className="idea-submission-container">
      <h1>Idea Submission</h1>
      <h2>Submit Your Patented Idea or Design</h2>

      <p>
        The below information is available for those with patented product ideas, designs, or inventions. If you have a general suggestion for us regarding products you would like us to offer (for example, bringing back discontinued models, adding activity-specific shoes, etc.), improvements to our current products (for example, new colors, additional widths, etc.), or would like assistance with other issues such as orders or product recommendations, please <a href="#">email us here</a>. We look forward to hearing your suggestions and assisting you in any way we can!
      </p>

      <p>
        Thank you for your interest in our evaluation procedures for externally submitted inventions and design ideas. As a company, we are, in principle, very happy to evaluate ideas against our specific business requirements, subject to the following conditions:
      </p>

      <ol>
        <li>
          We will only consider product designs and ideas. Please do not send us marketing ideas or trademarks.
        </li>
        <li>
          The design or idea must be novel and must be protected by a patent or patent application. If you need help filing a patent, please refer to the <a href="https://www.uspto.gov" target="_blank" rel="noopener noreferrer">United States Patent and Trademark Office</a> or contact your local state bar organization to seek opinion from a patent attorney or patent agent. The decision to apply for a patent rests entirely with you and you should be aware that there is no guarantee, either expressed or implied, that New Balance has an interest in your submission.
        </li>
        <li>
          The design or idea must be relevant to our core business (athletic footwear, apparel, and related accessories), must be economically viable from a manufacturing and marketing perspective and, in our opinion, must satisfy the needs of our customers.
        </li>
        <li>
          Any materials submitted for evaluation will not be returned.
        </li>
        <li>
          Any materials submitted for evaluation must be submitted on a non-confidential basis. New Balance does NOT execute Non-Disclosure Agreements related to unsolicited invention submissions and, as such, we will immediately discard without review any submission requiring a Non-Disclosure Agreement.
        </li>
        <li>
          All disclosures MUST be submitted directly to our Intellectual Property Department for review. Please do not attempt to submit your design or idea to any other New Balance employee as you will only be directed back to this procedure and any submissions that are not initially vetted by our Intellectual Property Department will be rejected.
        </li>
      </ol>

      <p>
        General suggestions about the products we offer, improvements you would like to see, and other feedback or thoughts you would like to share with us should be submitted <a href="#">here</a>.
      </p>

      <p>
        If you feel your patented design or idea satisfies the above conditions, please download the <strong>External Submission Form</strong> provided below and submit it, with any related materials appended thereto, by email or mail to the appropriate address provided on the Form:
      </p>

      <p>
        <a href="#" className="download-link">External Submission Form</a>
      </p>

      <p className="note">
        Please note that decision time regarding evaluation of submissions can vary from as little as a few weeks to several months. Although we consider every submission that we receive which is sent according to the above conditions, due to the high volume of submissions we unfortunately cannot respond personally to each submission.
      </p>
    </div>
  );
};

export default IdeaSubmission;
