import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
  const navigate = useNavigate();

  const analyse = () => {
    navigate('/form');
  };

  return (
    <section id="about" className="about-section">
      <div className="about-background">
        <div className="about-content">
          <div className="about-header">
            <h2 className="about-title">Revolutionizing Store Management</h2>
            <div className="about-subtitle">
              Empowering Retail Insights with Cutting-Edge Technology
            </div>
          </div>
          
          <div className="about-details">
            <div className="about-grid">
              <div className="about-card">
                <div className="card-icon">🔍</div>
                <h3>Advanced Analytics</h3>
                <p>Dive deep into store performance with our sophisticated data analysis tools.</p>
              </div>
              
              <div className="about-card">
                <div className="card-icon">📊</div>
                <h3>Heatmap Visualization</h3>
                <p>Transform raw data into actionable insights with intuitive visual representations.</p>
              </div>
              
              <div className="about-card">
                <div className="card-icon">💡</div>
                <h3>Smart Recommendations</h3>
                <p>Receive AI-powered suggestions to optimize your store's layout and performance.</p>
              </div>
            </div>
            
            <div className="about-description">
              <p>
                StoreManager is not just a tool – it's your strategic partner in retail excellence. 
                We combine advanced machine learning algorithms with intuitive design to provide 
                unprecedented insights into your store's potential.
              </p>
            </div>
          </div>
          
          <div className="about-cta">
            <button className="explore-btn" onClick={analyse}>Explore Our Technology</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;