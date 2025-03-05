import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Footer from "./components/Footer";
import StoreDataCollection from "./components/Form.jsx"; // Import the form component
import HeatmapViewer from "./components/HeatmapViewer"; // Import the HeatmapViewer component
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          {/* Home Route */}
          <Route
            path="/"
            element={
              <>
                <Hero />
                <Features />
              </>
            }
          />

          {/* Form Route */}
          <Route path="/form" element={<StoreDataCollection />} />

          {/* Heatmap Viewer Route */}
          <Route path="/heatmap" element={<HeatmapViewer />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;