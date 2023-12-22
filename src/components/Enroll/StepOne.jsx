// Import React and other dependencies
import React from 'react';
import './Enroll.css';
import './StepOne.css'

const StepOne = ({ formData, handleChange, nextStep }) => {
  return (
    <form className="row g-3 submission-form columns-container" encType="multipart/form-data">
      {/* First Column */}
      <div className="col-md-6">
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">
            First Name:
          </label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">
            Last Name:
          </label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="mobilePhone" className="form-label">
            Mobile Phone:
          </label>
          <input
            type="tel"
            className="form-control"
            id="mobilePhone"
            value={formData.mobilePhone}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="address" className="form-label">
            Address:
          </label>
          <textarea
            className="form-control"
            id="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Second Column */}
      <div className="col-md-6">
        <div className="mb-3">
          <label htmlFor="state" className="form-label">
            State / Province / Region:
          </label>
          <input
            type="text"
            className="form-control"
            id="state"
            value={formData.state}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="country" className="form-label">
            Country:
          </label>
          <input
            type="text"
            className="form-control"
            id="country"
            value={formData.country}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="city" className="form-label">
            City:
          </label>
          <input
            type="text"
            className="form-control"
            id="city"
            value={formData.city}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="postalCode" className="form-label">
            Postal Code:
          </label>
          <input
            type="text"
            className="form-control"
            id="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <button type="button" className="btn btn-primary" onClick={nextStep}>
            Next
          </button>
        </div>
      </div>
    </form>
  );
};

export default StepOne;
