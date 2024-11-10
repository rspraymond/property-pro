import React, { useEffect, useRef } from 'react';

const loadScript = (url, callback) => {
  const existingScript = document.querySelector(`script[src="${url}"]`);
  if (!existingScript) {
    const script = document.createElement('script');
    script.src = url;
    script.async = true;
    script.onload = callback;
    document.body.appendChild(script);
  } else {
    callback();
  }
};

const MapDisplay = ({ location, onPlacesFetched }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
    const mapsUrl = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places,geometry`;

    const initializeMap = () => {
      if (location && mapRef.current) {
        const map = new google.maps.Map(mapRef.current, {
          center: location,
          zoom: 14,
        });

        new google.maps.Marker({
          map: map,
          position: location,
          title: 'Searched Location',
          icon: 'http://maps.google.com/mapfiles/ms/icons/orange-dot.png',
        });

        const createMarker = (place, icon) => {
          const marker = new google.maps.Marker({
            map: map,
            position: place.geometry?.location,
            title: place.name,
            icon: icon,
          });

          const infoWindow = new google.maps.InfoWindow({
            content: `<div><strong>${place.name}</strong><br>${place.vicinity}</div>`,
          });

          marker.addListener('click', () => {
            infoWindow.open(map, marker);
          });
        };

        const placeTypes = [
          {
            type: 'school',
            icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
          },
          {
            type: 'hospital',
            icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
          },
          {
            type: 'supermarket',
            icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
          },
          {
            type: 'park',
            icon: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
          },
          {
            type: 'food',
            icon: 'http://maps.google.com/mapfiles/ms/icons/pink-dot.png',
          },
          {
            type: 'store',
            icon: 'http://maps.google.com/mapfiles/ms/icons/brown-dot.png',
          },
          {
            type: 'transit_station',
            icon: 'http://maps.google.com/mapfiles/ms/icons/purple-dot.png',
          },
        ];

        const service = new google.maps.places.PlacesService(map);
        let allResults = [];
        let completedRequests = 0;

        const searchPlaces = (type, icon) => {
          const request = {
            location: location,
            radius: 1750, // 1.1 miles in meters
            type: type,
          };

          service.nearbySearch(request, (results, status) => {
            if (
              status === google.maps.places.PlacesServiceStatus.OK &&
              results
            ) {
              // filter out results that already exist in allResults
              const newResults = results.filter(
                (result) =>
                  !allResults.some((r) => r.place_id === result.place_id)
              );
              newResults.forEach((place) => {
                if (place.geometry && place.geometry.location) {
                  createMarker(place, icon);
                }
              });

              allResults = allResults.concat(newResults);
            }

            completedRequests += 1;
            if (completedRequests === placeTypes.length) {
              onPlacesFetched(allResults);
            }
          });
        };

        placeTypes.forEach(({ type, icon }) => searchPlaces(type, icon));

        const trafficLayer = new google.maps.TrafficLayer();
        trafficLayer.setMap(map);
      }
    };

    loadScript(mapsUrl, initializeMap);
  }, [location, onPlacesFetched]);

  return <div ref={mapRef} style={{ height: '400px', width: '100%' }} />;
};

export default MapDisplay;
