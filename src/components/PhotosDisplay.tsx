import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import React, { useEffect, useState } from 'react';

const PhotosDisplay = ({ places }) => {
  const [photos, setPhotos] = useState([]);
  const fallbackImageUrl = 'https://via.placeholder.com/200'; // Fallback image URL

  useEffect(() => {
    const fetchedPhotos = [];
    places.forEach((place) => {
      if (place.photos && place.photos.length > 0) {
        fetchedPhotos.push(
          place.photos[0].getUrl({ maxWidth: 400, maxHeight: 400 })
        );
      }
    });
    setPhotos(fetchedPhotos);
  }, [places]);

  const handleImageError = (e) => {
    e.target.src = fallbackImageUrl;
  };

  return (
    <ImageList variant="masonry" cols={3} gap={8}>
      {photos.map((photoUrl, index) => (
        <ImageListItem key={index}>
          <img
            src={photoUrl}
            alt="Nearby Amenity"
            loading="lazy"
            onError={handleImageError}
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
};

export default PhotosDisplay;
