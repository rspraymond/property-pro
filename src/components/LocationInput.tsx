import { TextField, Button, Box } from '@mui/material';
import React, { useState, useEffect, useRef } from 'react';

const LocationInput = ({ onSearch }) => {
  const [location, setLocation] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (window.google) {
        clearInterval(interval);
        const autocomplete = new window.google.maps.places.Autocomplete(
          inputRef.current,
          {
            types: ['address'],
            componentRestrictions: { country: 'us' },
          }
        );

        autocomplete.addListener('place_changed', () => {
          const place = autocomplete.getPlace();
          if (place.formatted_address) {
            setLocation(place.formatted_address);
          }
        });
      }
    }, 100);
  }, [inputRef]);

  const handleSearch = () => {
    if (location.trim()) {
      onSearch(location);
    }
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <TextField
        label="Enter Property Location"
        variant="outlined"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        fullWidth
        inputRef={inputRef}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSearch}
        sx={{ height: '56px' }}
      >
        Search
      </Button>
    </Box>
  );
};

export default LocationInput;
