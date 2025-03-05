import React, { useState } from 'react'; 
import './Navbar.css';  

const Navbar = () => {   
  const [isHovered, setIsHovered] = useState(false);    

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (     
    <nav className="navbar-container">       
      <div className="navbar-wrapper">         
        <div 
          className="logo-section"           
          onMouseEnter={() => setIsHovered(true)}           
          onMouseLeave={() => setIsHovered(false)}         
        >           
          <svg 
            xmlns="http://www.w3.org/2000/svg"              
            viewBox="0 0 150 150"              
            className={`logo-icon ${isHovered ? 'logo-hover' : ''}`}           
          >             
            <defs>               
              <linearGradient id="dynamicGradient" x1="0%" y1="0%" x2="100%" y2="100%">                 
                <stop offset="0%" stopColor="#9b59b6" />                 
                <stop offset="100%" stopColor="#8e44ad" />               
              </linearGradient>                              
              <filter id="logoShadow" x="-20%" y="-20%" width="140%" height="140%">                 
                <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="rgba(0,0,0,0.3)"/>               
              </filter>             
            </defs>                          
            <rect                
              width="140"                
              height="140"                
              x="5"                
              y="5"                
              rx="25"                
              fill="url(#dynamicGradient)"               
              filter="url(#logoShadow)"             
            />                          
            <g transform="translate(35, 35) scale(0.5)">               
              <path                  
                d="M100 50 L180 130 L100 210 L20 130 Z"                  
                fill="white"                  
                opacity="0.9"                 
                className="logo-path"               
              />             
            </g>           
          </svg>           
          <span className="logo-text">StoreManager</span>         
        </div>                  
        <ul className="nav-links">           
          <li className="nav-item">             
            <a 
              href="#features" 
              className="nav-link"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('features');
              }}
            >               
              <span className="link-text">Features</span>               
              <div className="link-underline"></div>             
            </a>           
          </li>           
          <li className="nav-item">             
            <a 
              href="#about" 
              className="nav-link"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('about');
              }}
            >               
              <span className="link-text">About</span>               
              <div className="link-underline"></div>             
            </a>           
          </li>         
        </ul>                  
        <div className="auth-buttons">                      
          <button className="signup-btn">             
            <span className="btn-text">Sign Out</span>             
            <div className="btn-hover"></div>           
          </button>         
        </div>       
      </div>     
    </nav>   
  ); 
};  

export default Navbar;