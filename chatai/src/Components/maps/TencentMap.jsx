// DeliveryPointsMap.jsx

import React, { useEffect, useRef } from 'react';
import { supplyChainWithoutAuth } from '../../apiCalls/supplyChain';


function TencentMap({supplyChain}) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    const existingScript = document.getElementById('tencent-map-script');

    if (!existingScript) {
      const script = document.createElement('script');
      script.src = 'https://map.qq.com/api/gljs?v=1.exp&key=UBTBZ-VDPKQ-O6S5W-BKBJ5-ZDU3E-ZRFO3';
      script.id = 'tencent-map-script';
      script.async = true;
      script.onload = () => {
        initMap();
      };
      script.onerror = () => {
        console.error('Failed to load Tencent Maps script.');
      };
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    } else {
      initMap();
    }
  }, []);

  const initMap = async () => {
    if (!window.TMap) {
      console.error('Tencent Maps API is not available.');
      return;
    }

    try {

      mapInstanceRef.current = new window.TMap.Map(mapRef.current, {
        center: new window.TMap.LatLng(22.5431, 114.0579), // Shenzhen
        zoom: 12,
      });

      supplyChain.forEach((point) => {
        const { name, latitude, longitude, slogan, logo } = point;
      
        // Check if latitude and longitude are valid numbers
        if (latitude !== null || longitude !== null) {
          return; // Skip this iteration if coordinates are invalid
        }
      
        // Create a marker
        const marker = new window.TMap.Marker({
          map: mapInstanceRef.current,
          position: new window.TMap.LatLng(latitude, longitude),
          icon: {
            url: 'https://mapapi.qq.com/web/lbs/javascriptV2/demo_img/markerDefault.png',
            size: new window.TMap.Size(25, 35),
            anchor: new window.TMap.Size(16, 32),
          },
        });
      
        // Create an info window
        const infoWindow = new window.TMap.InfoWindow({
          map: mapInstanceRef.current,
          position: new window.TMap.LatLng(latitude, longitude),
          content: `
            <div class="info-window">
              <h3>${name}</h3>
              <p><strong>Slogan:</strong> ${slogan || 'N/A'}</p>
              <img src="${logo || 'https://via.placeholder.com/150'}" alt="${name}" style="width:100%; height:auto;" />
            </div>
          `,
          offset: new window.TMap.Pixel(0, -32),
          autoClose: true, // Automatically close when another info window opens
        });
      
        // Marker click event to show the info window
        marker.on('click', () => {
          infoWindow.open();
        });
      });
      
    } catch (err) {
      console.error('Error loading map data:', err);
    }
  };

  return <div ref={mapRef} style={{ width: '100%', height: '100vh' }} />;
}

export default TencentMap;
