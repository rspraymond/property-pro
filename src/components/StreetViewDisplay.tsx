import React, { useEffect, useRef } from 'react';

const StreetViewDisplay = ({ location }) => {
  const streetViewRef = useRef(null);

  useEffect(() => {
    if (location && streetViewRef.current) {
      new google.maps.StreetViewPanorama(streetViewRef.current, {
        position: location,
        pov: { heading: 165, pitch: 0 },
        zoom: 1,
      });
    }
  }, [location]);

  return <div ref={streetViewRef} style={{ height: '400px', width: '100%' }} />;
};

export default StreetViewDisplay;
