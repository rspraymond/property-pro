import { Grid, Typography, Paper, Box, Button, Divider } from '@mui/material';
import React, { useState } from 'react';

import AggregateInfo from './components/AggregateInfo';
import InfoPanel from './components/InfoPanel';
import Legend from './components/Legend';
import LocationInput from './components/LocationInput';
import MapDisplay from './components/MapDisplay';
import PhotosDisplay from './components/PhotosDisplay';
import StreetViewDisplay from './components/StreetViewDisplay';
import TerrainDisplay from './components/TerrainDisplay';
import withGoogleMaps from './hoc/WithGoogleMaps';

const App: React.FC = () => {
  const [location, setLocation] = useState<google.maps.LatLngLiteral | null>(
    null
  );
  const [places, setPlaces] = useState<google.maps.places.PlaceResult[]>([]);
  const [showStreetView, setShowStreetView] = useState(true);
  const [showTerrain, setShowTerrain] = useState(true);
  const [showPhotos, setShowPhotos] = useState(true);

  const handleSearch = (address: string) => {
    setLocation(null);
    setPlaces([]);
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address }, (results, status) => {
      if (status === 'OK' && results[0]) {
        const { lat, lng } = results[0].geometry.location;
        setLocation({ lat: lat(), lng: lng() });
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Property Pro Evaluator
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <LocationInput onSearch={handleSearch} />
          </Paper>
        </Grid>
        {location && (
          <>
            <Grid item xs={12} md={8}>
              <Paper elevation={3} sx={{ padding: 2 }}>
                <Grid container spacing={2} sx={{ padding: 2 }}>
                  <Grid item xs={6}>
                    <Typography variant="h6">Map View</Typography>
                    <MapDisplay
                      location={location}
                      onPlacesFetched={setPlaces}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Legend />
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h6">Street View</Typography>
                    <Button
                      onClick={() => setShowStreetView(!showStreetView)}
                      variant="outlined"
                      size="small"
                      sx={{ marginBottom: 2 }}
                    >
                      Toggle Street View
                    </Button>
                    {showStreetView && (
                      <StreetViewDisplay location={location} />
                    )}
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h6">Terrain View</Typography>
                    <Button
                      onClick={() => setShowTerrain(!showTerrain)}
                      variant="outlined"
                      size="small"
                      sx={{ marginBottom: 2 }}
                    >
                      Toggle Terrain View
                    </Button>
                    {showTerrain && <TerrainDisplay location={location} />}
                  </Grid>
                </Grid>
                <Divider sx={{ marginY: 2 }} />
                <AggregateInfo places={places} />
                <Grid item xs={12}>
                  <Typography variant="h6">Photos</Typography>
                  <Button
                    onClick={() => setShowPhotos(!showPhotos)}
                    variant="outlined"
                    size="small"
                  >
                    Toggle Photos View
                  </Button>
                  {showPhotos && <PhotosDisplay places={places} />}
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={3} sx={{ padding: 2 }}>
                <InfoPanel places={places} location={location} />
              </Paper>
            </Grid>
          </>
        )}
      </Grid>
    </Box>
  );
};

export default withGoogleMaps(App);
