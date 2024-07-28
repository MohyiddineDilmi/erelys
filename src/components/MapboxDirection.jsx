import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { motion } from 'framer-motion';
import 'mapbox-gl/dist/mapbox-gl.css';
import 'intersection-observer'; // Import the polyfill if installed
import ErelysIcon from '../assets/erelys_logo_only.png';
import StartIcon from '../assets/start_point.png';
import './MapboxDirection.css'; // Import the custom CSS file

// Replace with your Mapbox access token
mapboxgl.accessToken = 'pk.eyJ1IjoiZGlsbWkiLCJhIjoiY2x5aHRxdngwMDZpNDJrcTBqNzBvN3d2eiJ9.9qS5FeWGyfhV8qZwZQsE6g';

const MapboxDirection = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [travelTimes, setTravelTimes] = useState([]);
  const officeCoordinates = [-73.5574182, 45.501553]; // Coordinates for 428 Rue Saint-Pierre, Montréal

  const getTravelTime = async (userCoordinates, mode) => {
    const directionsRequest = `https://api.mapbox.com/directions/v5/mapbox/${mode}/${userCoordinates[0]},${userCoordinates[1]};${officeCoordinates[0]},${officeCoordinates[1]}?geometries=geojson&access_token=${mapboxgl.accessToken}`;

    const response = await fetch(directionsRequest);
    const data = await response.json();
    const duration = data.routes[0].duration; // Duration in seconds

    return {
      mode,
      time: Math.round(duration / 60) // Convert duration to minutes
    };
  };

  useEffect(() => {
    if (map.current || !isVisible) return; // Initialize map only once and if the component is visible

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v10', // Dark map style
      center: officeCoordinates,
      zoom: 10,
      pitch: 20, // Tilt the map for a better 3D effect
      bearing: -30, // Rotate the map for a better 3D effect
      antialias: true, // Enable antialiasing for smoother lines
      attributionControl: false, // Disable the Mapbox logo and attribution control
    });

    map.current.on('load', () => {
      // Add terrain layer
      map.current.addSource('mapbox-dem', {
        type: 'raster-dem',
        url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
        tileSize: 512,
        maxzoom: 15,
      });

      map.current.setTerrain({ source: 'mapbox-dem', exaggeration: 1.5 });

      // Add a marker for the office location with a custom icon
      const officeLocationIcon = document.createElement('div');
      officeLocationIcon.style.backgroundImage = `url(${ErelysIcon})`; // Path to your custom office icon
      officeLocationIcon.style.width = '50px';
      officeLocationIcon.style.height = '50px';
      officeLocationIcon.style.backgroundSize = '100%';

      new mapboxgl.Marker(officeLocationIcon)
        .setLngLat(officeCoordinates)
        .addTo(map.current);

      // Add a popup with the office address
      new mapboxgl.Popup({ offset: 25 })
        .setLngLat(officeCoordinates)
        .setHTML('<h3>Come visit us in Old Montreal</h3><p>101, 428 Rue Saint-Pierre, Montréal, QC H2Y 2M5</p>')
        .addTo(map.current);

      // Attempt to get user's location
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const userCoordinates = [position.coords.longitude, position.coords.latitude];

          // Add a marker for the user's location with a custom icon
          const userLocationIcon = document.createElement('div');
          userLocationIcon.style.backgroundImage = `url(${StartIcon})`; // Path to your custom user icon
          userLocationIcon.style.width = '50px';
          userLocationIcon.style.height = '50px';
          userLocationIcon.style.backgroundSize = '100%';

          new mapboxgl.Marker(userLocationIcon)
            .setLngLat(userCoordinates)
            .addTo(map.current);

          // Modes of transportation
          const modes = ['driving-traffic', 'walking', 'cycling'];

          // Get travel times for each mode
          const travelTimesPromises = modes.map(mode => getTravelTime(userCoordinates, mode));
          const travelTimesResults = await Promise.all(travelTimesPromises);

          // Sort travel times by the fastest
          travelTimesResults.sort((a, b) => a.time - b.time);
          setTravelTimes(travelTimesResults);

          // Use the first route (fastest driving-traffic route) to display on the map
          const fastestRoute = travelTimesResults.find(t => t.mode === 'driving-traffic');

          const directionsRequest = `https://api.mapbox.com/directions/v5/mapbox/${fastestRoute.mode}/${userCoordinates[0]},${userCoordinates[1]};${officeCoordinates[0]},${officeCoordinates[1]}?geometries=geojson&access_token=${mapboxgl.accessToken}`;
          
          const response = await fetch(directionsRequest);
          const data = await response.json();
          const route = data.routes[0].geometry;

          // Add the route to the map
          map.current.addSource('route', {
            type: 'geojson',
            data: {
              type: 'Feature',
              properties: {},
              geometry: route,
            }
          });

          map.current.addLayer({
            id: 'route',
            type: 'line',
            source: 'route',
            layout: {
              'line-join': 'round',
              'line-cap': 'round'
            },
            paint: {
              'line-color': '#1DB954',
              'line-width': 5
            }
          });

          // Fit map to the route
          const bounds = new mapboxgl.LngLatBounds();
          route.coordinates.forEach(coord => bounds.extend(coord));
          map.current.fitBounds(bounds, { padding: 50 });
        },
        (error) => {
          // If user denies location access, just zoom in to the office location
          map.current.flyTo({
            center: officeCoordinates,
            zoom: 16,
            speed: 1.5,
            curve: 1,
            easing(t) {
              return t;
            }
          });
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    });
  }, [isVisible, officeCoordinates]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          setIsVisible(true);
          observer.disconnect(); // Stop observing once the component is visible
        }
      },
      {
        threshold: 0.5, // Trigger when 50% of the component is visible
      }
    );

    if (mapContainer.current) {
      observer.observe(mapContainer.current);
    }

    return () => observer.disconnect();
  }, []);

  const getModeLabel = (mode) => {
    switch (mode) {
      case 'driving-traffic':
        return 'Driving';
      case 'walking':
        return 'Walking';
      case 'cycling':
        return 'Cycling';
      default:
        return mode;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 1 }}
      style={{
        height: '30vh',
        maxHeight: '720px',
        width: '100%',
        maxWidth: '1080px',
        margin: '0 auto',
        borderRadius: '20px',
        overflow: 'hidden',
        position: 'relative',
        marginBottom: '4rem',
      }}
    >
      <div 
        ref={mapContainer} 
        style={{ 
          height: '100%', 
          width: '100%', 
          backgroundColor: '000', // Adjust transparency here
        }} 
      />
      {travelTimes.length > 0 && (
        <div className="travel-time">
          {travelTimes.map(({ mode, time }) => (
            <div key={mode}>
              {getModeLabel(mode)}: {time} minutes
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default MapboxDirection;
