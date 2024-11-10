import React, { useState, useEffect } from 'react';

const WithGoogleMaps = (WrappedComponent) => {
  const WithGoogleMapsComponent = (props) => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
      const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
      const mapsUrl = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places,geometry`;

      const loadScript = (url: string): Promise<void> => {
        return new Promise<void>((resolve, reject) => {
          const existingScript = document.querySelector(`script[src="${url}"]`);
          if (!existingScript) {
            const script = document.createElement('script');
            script.src = url;
            script.async = true;
            script.onload = () => resolve();
            script.onerror = () => reject(new Error('Script load error'));
            document.body.appendChild(script);
          } else {
            resolve();
          }
        });
      };

      loadScript(mapsUrl)
        .then(() => setIsLoaded(true))
        .catch((error) =>
          // eslint-disable-next-line no-console
          console.error('Error loading Google Maps script:', error)
        );
    }, []);

    if (!isLoaded) {
      return <div>Loading...</div>;
    }

    return <WrappedComponent {...props} />;
  };

  return WithGoogleMapsComponent;
};

export default WithGoogleMaps;
