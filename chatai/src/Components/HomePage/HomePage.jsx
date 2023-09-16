import React, { useState } from 'react';
import './HomePage.css'; 
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const [loading, setLoading]= useState(false)
  const navigate = useNavigate()
  const handleLogout = () =>{
  setLoading(true)
  localStorage.setItem('is_active', false)
  setTimeout(() => {
   navigate('/auth/signup')
   setLoading(false)
  }, 2000)
 }
  return (
    <div className="homepage">
      <div className="homepage-content">
        <button  className="button-login"  onClick={handleLogout}>logout</button>
        {loading && <h5>loading...</h5>}
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
