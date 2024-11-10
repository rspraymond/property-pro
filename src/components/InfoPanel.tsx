import {
  School,
  LocalHospital,
  LocalGroceryStore,
  Park,
  Train,
  Star,
  Nature,
  Restaurant,
  Storefront,
} from '@mui/icons-material';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
} from '@mui/material';
import React from 'react';

interface InfoPanelProps {
  places: google.maps.places.PlaceResult[];
  location: google.maps.LatLngLiteral;
}

interface PlaceResultWithDistance extends google.maps.places.PlaceResult {
  distance?: number;
}

const InfoPanel: React.FC<InfoPanelProps> = ({ places, location }) => {
  const calculateDistance = (placeLocation: google.maps.LatLng) => {
    const origin = new google.maps.LatLng(location.lat, location.lng);
    return (
      google.maps.geometry.spherical.computeDistanceBetween(
        origin,
        placeLocation
      ) / 1609.34
    ); // Convert meters to miles
  };

  const getIconForType = (type: string) => {
    switch (type) {
      case 'school':
        return <School />;
      case 'hospital':
        return <LocalHospital />;
      case 'supermarket':
        return <LocalGroceryStore />;
      case 'park':
      case 'tourist_attraction':
        return <Park />;
      case 'transit_station':
        return <Train />;
      case 'store':
        return <Storefront />;
      case 'food':
        return <Restaurant />;
      default:
        return <Nature />;
    }
  };

  const getColorForType = (type: string) => {
    switch (type) {
      case 'school':
        return '#1E3A8A'; // Dark Blue
      case 'hospital':
        return '#B91C1C'; // Dark Red
      case 'supermarket':
        return '#047857'; // Dark Green
      case 'park':
      case 'tourist_attraction':
        return '#D97706'; // Dark Yellow
      case 'transit_station':
        return '#6D28D9'; // Dark Purple
      case 'store':
        return '#374151'; // Dark Grey
      case 'food':
        return '#BE185D'; // Dark Pink
      default:
        return '#374151'; // Dark Grey
    }
  };

  const prioritizeType = (types: string[] | undefined) => {
    const priorityList = [
      'school',
      'hospital',
      'supermarket',
      'store',
      'park',
      'food',
      'tourist_attraction',
      'transit_station',
    ];
    return (
      types?.find((type) => priorityList.includes(type)) || types?.[0] || ''
    );
  };

  let placesWithDistance: PlaceResultWithDistance[] = places.map((place) => ({
    ...place,
    distance: place.geometry?.location
      ? calculateDistance(place.geometry.location)
      : undefined,
  }));

  placesWithDistance = placesWithDistance.sort((a, b) => {
    const typeOrder = [
      'school',
      'hospital',
      'supermarket',
      'food',
      'park',
      'store',
      'transit_station',
    ];
    const typeA = a.types?.find((type) => typeOrder.includes(type));
    const typeB = b.types?.find((type) => typeOrder.includes(type));
    if (typeA && typeB) {
      if (typeOrder.indexOf(typeA) === typeOrder.indexOf(typeB)) {
        return (a.distance ?? 0) - (b.distance ?? 0);
      }
      return typeOrder.indexOf(typeA) - typeOrder.indexOf(typeB);
    }
    return 0;
  });

  return (
    <Box sx={{ padding: 2, marginTop: 2 }}>
      <Typography variant="h6" gutterBottom>
        Nearby Amenities
      </Typography>
      <List>
        {placesWithDistance.length > 0 ? (
          placesWithDistance.map((place) => {
            const prioritizedType = prioritizeType(place.types);
            return (
              <ListItem key={place.place_id} alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: getColorForType(prioritizedType) }}>
                    {getIconForType(prioritizedType)}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={<strong>{place.name}</strong>}
                  secondary={
                    <>
                      <Typography variant="body2" color="textSecondary">
                        {place.vicinity || 'Location not available'}
                      </Typography>
                      {place.types && (
                        <Typography variant="body2" color="textSecondary">
                          Type: {place.types.join(', ')}
                        </Typography>
                      )}
                      {place.rating && (
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          sx={{ display: 'flex', alignItems: 'center' }}
                        >
                          <Star fontSize="small" sx={{ marginRight: 0.5 }} />
                          Rating: {place.rating} / 5
                        </Typography>
                      )}
                      {place.geometry?.location && (
                        <Typography variant="body2" color="textSecondary">
                          Distance: {place.distance?.toFixed(2)} mi
                        </Typography>
                      )}
                    </>
                  }
                />
              </ListItem>
            );
          })
        ) : (
          <Typography variant="body2" color="textSecondary">
            No nearby amenities found.
          </Typography>
        )}
      </List>
    </Box>
  );
};

export default InfoPanel;
