import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";
import "./Form.css";

const Form = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    ownerName: "",
    storeName: "",
    storeType: "",
    otherStoreType: "",
    storeSize: "",
    businessModel: "",
    preferredCity: "",
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
      ...(name === "storeType" && value !== "other" && { otherStoreType: "" }),
    }));

    if (name === "storeType") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        storeType: value ? "" : "Store type is required",
      }));
    }

    if (name === "otherStoreType") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        otherStoreType: value ? "" : "Please specify your store type",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    const newErrors = {};
    if (!formData.ownerName.trim()) newErrors.ownerName = "Owner name is required";
    if (!formData.storeName.trim()) newErrors.storeName = "Store name is required";
    if (!formData.storeType) newErrors.storeType = "Store type is required";
    if (!formData.storeSize) newErrors.storeSize = "Store size is required";
    if (!formData.businessModel) newErrors.businessModel = "Business model is required";
    if (!formData.preferredCity.trim()) newErrors.preferredCity = "Preferred city is required";
    if (!formData.agreeToTerms) newErrors.agreeToTerms = "You must agree to the terms";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Prepare data to send to the backend
    const dataToSend = {
      City: formData.preferredCity,
      "Store Type": formData.storeType === "other" ? formData.otherStoreType : formData.storeType,
    };

    try {
      // Send POST request to Flask backend
      const response = await axios.post("http://localhost:5000/find-store", dataToSend);
      console.log("Response from backend:", response.data);

      // Navigate to the HeatmapViewer component with the heatmap URL
      if (response.data.heatmap_url) {
        navigate("/heatmap", { state: { heatmapUrl: response.data.heatmap_url } });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleBackToHome = () => {
    navigate("/"); // Navigate back to the home page
  };

  return (
    <div className="form-container">
      <div className="back-button-container">
        <button type="button" onClick={handleBackToHome} className="back-to-home-button">
          ← Back to Home
        </button>
      </div>
      <div className="form-header">
        <div className="logo-container">
          <svg
            className="store-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
        </div>
        <h1 className="form-title">StoreManager</h1>
      </div>

      <p className="form-description">
        Complete the form below to help us analyze the best location for your new store
      </p>

      <form onSubmit={handleSubmit}>
        {/* Owner Name Field */}
        <div className="form-group">
          <label htmlFor="ownerName" className="form-label">
            Owner Name <span className="required">*</span>
          </label>
          <input
            type="text"
            id="ownerName"
            name="ownerName"
            className={`form-input ${errors.ownerName ? "input-error" : ""}`}
            value={formData.ownerName}
            onChange={handleChange}
            placeholder="Enter owner name"
          />
          {errors.ownerName && <div className="error-message">{errors.ownerName}</div>}
        </div>

        {/* Store Name Field */}
        <div className="form-group">
          <label htmlFor="storeName" className="form-label">
            Store Name <span className="required">*</span>
          </label>
          <input
            type="text"
            id="storeName"
            name="storeName"
            className={`form-input ${errors.storeName ? "input-error" : ""}`}
            value={formData.storeName}
            onChange={handleChange}
            placeholder="Enter store name"
          />
          {errors.storeName && <div className="error-message">{errors.storeName}</div>}
        </div>

        {/* Store Type Field */}
        <div className="form-group">
          <label htmlFor="storeType" className="form-label">
            Store Type <span className="required">*</span>
          </label>
          <select
            id="storeType"
            name="storeType"
            className={`form-select ${errors.storeType ? "input-error" : ""}`}
            value={formData.storeType}
            onChange={handleChange}
          >
            <option value="" disabled>
              Select store type
            </option>
            <option value="retail">Retail</option>
            <option value="restaurant">Restaurant</option>
            <option value="service">Service</option>
            <option value="grocery">Grocery</option>
            <option value="electronics">Electronics</option>
            <option value="other">Other</option>
          </select>
          {formData.storeType === "other" && (
            <div className="mt-2">
              <input
                type="text"
                id="otherStoreType"
                name="otherStoreType"
                className={`form-control ${errors.otherStoreType ? "input-error" : ""}`}
                placeholder="Enter store type"
                value={formData.otherStoreType || ""}
                onChange={handleChange}
                required
              />
              {errors.otherStoreType && <div className="error-message">{errors.otherStoreType}</div>}
            </div>
          )}
          {errors.storeType && <div className="error-message">{errors.storeType}</div>}
        </div>

        {/* Store Size Field */}
        <div className="form-group">
          <label htmlFor="storeSize" className="form-label">
            Store Size <span className="required">*</span>
          </label>
          <select
            id="storeSize"
            name="storeSize"
            className={`form-select ${errors.storeSize ? "input-error" : ""}`}
            value={formData.storeSize}
            onChange={handleChange}
          >
            <option value="" disabled>
              Select store size
            </option>
            <option value="small">Small (&lt;500 sqft)</option>
            <option value="medium">Medium (500-1500 sqft)</option>
            <option value="large">Large (1500-3000 sqft)</option>
            <option value="xlarge">Extra Large (&gt;3000 sqft)</option>
          </select>
          {errors.storeSize && <div className="error-message">{errors.storeSize}</div>}
        </div>

        {/* Business Model Field */}
        <div className="form-group">
          <label className="form-label">
            Business Model <span className="required">*</span>
          </label>
          <div className="radio-group">
            <label className={`radio-option ${formData.businessModel === "franchise" ? "selected" : ""}`}>
              <input
                type="radio"
                name="businessModel"
                value="franchise"
                checked={formData.businessModel === "franchise"}
                onChange={handleChange}
              />
              <span className="radio-label">Franchise</span>
            </label>
            <label className={`radio-option ${formData.businessModel === "independent" ? "selected" : ""}`}>
              <input
                type="radio"
                name="businessModel"
                value="independent"
                checked={formData.businessModel === "independent"}
                onChange={handleChange}
              />
              <span className="radio-label">Independent</span>
            </label>
            <label className={`radio-option ${formData.businessModel === "chain" ? "selected" : ""}`}>
              <input
                type="radio"
                name="businessModel"
                value="chain"
                checked={formData.businessModel === "chain"}
                onChange={handleChange}
              />
              <span className="radio-label">Chain</span>
            </label>
          </div>
          {errors.businessModel && <div className="error-message">{errors.businessModel}</div>}
        </div>

        {/* Preferred City Field */}
        <div className="form-group">
          <label htmlFor="preferredCity" className="form-label">
            Preferred City <span className="required">*</span>
          </label>
          <input
            type="text"
            id="preferredCity"
            name="preferredCity"
            className={`form-input ${errors.preferredCity ? "input-error" : ""}`}
            value={formData.preferredCity}
            onChange={handleChange}
            placeholder="Enter city name"
          />
          {errors.preferredCity && <div className="error-message">{errors.preferredCity}</div>}
        </div>

        {/* Agree to Terms Field */}
        <div className="form-group checkbox-group">
          <label className={`checkbox-container ${errors.agreeToTerms ? "checkbox-error" : ""}`}>
            <input
              type="checkbox"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleChange}
            />
            <span className="checkbox-label">
              I agree to the{" "}
              <a href="#" className="terms-link">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="privacy-link">
                Privacy Policy
              </a>
            </span>
          </label>
          {errors.agreeToTerms && <div className="error-message">{errors.agreeToTerms}</div>}
        </div>

        {/* Submit Button */}
        <button type="submit" className="submit-button">
          Submit Store Information
        </button>
      </form>
    </div>
  );
};

export default Form;