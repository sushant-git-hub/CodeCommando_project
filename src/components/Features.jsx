import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./Features.css";

const Features = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  return (
    <section id="features" className="features">
      <h2>Features</h2>
      <div className="feature-cards">
        <div className="card" id="c1">
          <div className="card-icon">🔥</div>
          <h3>Heatmap Visualization</h3>
          <p>Visualize customer movement and product interaction with detailed heatmaps.</p>
        </div>
        <div className="card" id="c1">
          <div className="card-icon">📊</div>
          <h3>Product Placement Analysis</h3>
          <p>Get insights on the best locations for your products to maximize sales.</p>
        </div>
        <div className="card" id="c1">
          <div className="card-icon">⏱️</div>
          <h3>Real-Time Data</h3>
          <p>Access real-time data to make quick and informed decisions.</p>
        </div>
      </div>
      <button onClick={() => navigate("/form")}>Explore Our Technology</button>
    </section>
  );
};

export default Features;