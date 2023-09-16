import React from 'react';
import './HomePage.css'; // Import your CSS file

function HomePage() {
  return (
    <div className="homepage">
      <div className="homepage-content">
        <h1>Welcome to Our Website</h1>
        <p>Here you can do many things like watch videos buythings etc</p>
        <img
          src="https://picsum.photos/536/354" // Replace with your image URL
          alt="Homepage Image"
          className="homepage-image"
        />
        <div className="video-container">
          <iframe
            title="Homepage Video"
            src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" // Replace with your video URL
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
