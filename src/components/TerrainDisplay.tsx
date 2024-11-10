import React, { useEffect, useRef } from 'react';

const TerrainDisplay = ({ location }) => {
  const terrainMapRef = useRef(null);

  useEffect(() => {
    if (location && terrainMapRef.current) {
      const map = new google.maps.Map(terrainMapRef.current, {
        center: location,
        zoom: 15,
        mapTypeId: 'satellite',
      });

      // Add a marker for the location
      new google.maps.Marker({
        map: map,
        position: location,
        title: 'Location Marker',
      });
    }
  }, [location]);

  return <div ref={terrainMapRef} style={{ height: '400px', width: '100%' }} />;
};

export default TerrainDisplay;
