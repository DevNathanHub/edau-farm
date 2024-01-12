import React from 'react';
import './BestLife.css'; // Import external CSS for additional styling
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { FaCheckCircle } from 'react-icons/fa'; // Import the check circle icon from react-icons

const BestLife = () => {
  return (
    <div className="container benefitslifecontainer">
      <h2 className="text-center">Live the Hello-Cleaners Life™</h2>
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <p>
            In addition to a flexible work schedule, being a HelloCleaners team member has many benefits:
          </p>
          <div className="benefits-list">
            <div className="benefit-item">
              <FaCheckCircle className="icon" />
              No night, weekend, or holiday work
            </div>
            <div className="benefit-item">
              <FaCheckCircle className="icon" />
              Weekly pay*
            </div>
            <div className="benefit-item">
              <FaCheckCircle className="icon" />
              Paid training
            </div>
            <div className="benefit-item">
              <FaCheckCircle className="icon" />
              Use of company car or paid mileage for personal vehicle*
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="benefits-list">
            <div className="benefit-item">
              <FaCheckCircle className="icon" />
              Career advancement opportunities
            </div>
            <div className="benefit-item">
              <FaCheckCircle className="icon" />
              Employee discounts
            </div>
            <div className="benefit-item">
              <FaCheckCircle className="icon" />
              Full-time and part-time positions*
            </div>
            <div className="benefit-item">
              <FaCheckCircle className="icon" />
              Medical and retirement plans*
            </div>
          </div>
          <p>*Varies by location.</p>
        </div>
      </div>
    </div>
  );
};

export default BestLife;
