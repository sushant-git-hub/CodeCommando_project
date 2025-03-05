import React from "react";
import { useLocation } from "react-router-dom"; // Import useLocation to access state

const HeatmapViewer = () => {
  const location = useLocation();
  const { heatmapUrl } = location.state || { heatmapUrl: "" }; // Get the heatmap URL from state

  return (
    <div className="heatmap-container">
      <h1>Heatmap Viewer</h1>
      {heatmapUrl ? (
        <iframe
          src={heatmapUrl}
          title="Heatmap"
          width="100%"
          height="600px"
          style={{ border: "none" }}
        />
      ) : (
        <p>No heatmap URL provided.</p>
      )}
    </div>
  );
};

export default HeatmapViewer;