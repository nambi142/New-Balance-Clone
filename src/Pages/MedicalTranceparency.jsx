import React from 'react';
import '../Css/MedicalTranceparency.css';

const MedicalTransparency = () => {
  return (
    <div className="medical-transparency-container">
      <h1>Your Rights and Protections Against Surprise Medical Bills</h1>

      <p className="intro">
        When you get emergency care or get treated by an out-of-network provider at an in-network hospital or ambulatory surgical center, you are protected from surprise billing or balance billing.
      </p>

      <h2>What is “balance billing” (sometimes called “surprise billing”)?</h2>
      <p>
        When you see a doctor or other health care provider, you may owe certain out-of-pocket costs, such as a copayment, coinsurance, and/or a deductible. You may have other costs or have to pay the entire bill if you see a provider or visit a health care facility that isn’t in your health plan’s network.
      </p>
      <p>
        “Out-of-network” describes providers and facilities that haven’t signed a contract with your health plan. Out-of-network providers may be permitted to bill you for the difference between what your plan agreed to pay and the full amount charged for a service. This is called “balance billing.”
      </p>
      <p>
        “Surprise billing” is an unexpected balance bill. This can happen when you can’t control who is involved in your care—like when you have an emergency or when you schedule a visit at an in-network facility but are unexpectedly treated by an out-of-network provider.
      </p>

      <h2>You are protected from balance billing for:</h2>
      <h3>Emergency services</h3>
      <p>
        If you have an emergency medical condition and get emergency services from an out-of-network provider or facility, the most the provider or facility may bill you is your plan’s in-network cost-sharing amount (such as copayments and coinsurance).
      </p>
      <p>
        You can’t be balance billed for these emergency services. This includes services you may get after you’re in stable condition, unless you give written consent and give up your protections.
      </p>

      <h3>Certain services at an in-network hospital or ambulatory surgical center</h3>
      <p>
        When you get services from an in-network hospital or ambulatory surgical center, certain providers there may be out-of-network. In these cases, the most those providers may bill you is your plan’s in-network cost-sharing amount.
      </p>
      <p>
        These providers can’t balance bill you and may not ask you to give up your protections.
      </p>

      <h3>You’re never required to give up your protections from balance billing</h3>
      <p>
        You also aren’t required to get care out-of-network. You can choose a provider or facility in your plan’s network.
      </p>

      <h2>When balance billing isn’t allowed, you also have the following protections:</h2>
      <ul>
        <li>You are only responsible for paying your share of the cost (copayments, coinsurance, and deductibles).</li>
        <li>Your health plan will pay out-of-network providers and facilities directly.</li>
        <li>Your health plan must:
          <ul>
            <li>Cover emergency services without prior approval.</li>
            <li>Cover emergency services by out-of-network providers.</li>
            <li>Base what you owe on in-network provider rates.</li>
            <li>Count amounts toward your deductible and out-of-pocket limit.</li>
          </ul>
        </li>
      </ul>

      <p>
        If you believe you’ve been wrongly billed, contact: <a href="mailto:Glenn.Haskell@newbalance.com">Glenn.Haskell@newbalance.com</a>
      </p>

      <p>
        The Transparency in Coverage Final Rules require certain group health plans to disclose on a public website information regarding in-network provider rates and historical out-of-network allowed amounts and billed charges for covered items and services in two separate machine-readable files (MRFs).
      </p>

      <p>
        <a href="#" className="link">Click here MRF link for negotiated in-network provider rates</a><br />
        <a href="#" className="link">Click here to learn more about the new Zero Deductible Plan.</a>
      </p>
    </div>
  );
};

export default MedicalTransparency;
