import {
  LocalHospital,
  LocalGroceryStore,
  Park,
  School,
  Train,
  ThumbUp,
  ThumbDown,
  SentimentNeutral,
} from '@mui/icons-material';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Avatar,
  Badge,
} from '@mui/material';
import React from 'react';

interface AggregateInfoProps {
  places: google.maps.places.PlaceResult[];
}

const AggregateInfo: React.FC<AggregateInfoProps> = ({ places }) => {
  const amenityCounts = places.reduce(
    (acc, place) => {
      place.types?.forEach((type) => {
        acc[type] = (acc[type] || 0) + 1;
      });
      return acc;
    },
    {} as Record<string, number>
  );

  const ratedPlaces = places.filter((place) => place.rating !== undefined);
  const averageRating =
    ratedPlaces.reduce((acc, place) => acc + (place.rating || 0), 0) /
      ratedPlaces.length || 0;

  const icons: Record<string, JSX.Element> = {
    hospital: <LocalHospital />,
    supermarket: <LocalGroceryStore />,
    park: <Park />,
    school: <School />,
    transit_station: <Train />,
  };

  const getRatingQuality = (rating: number) => {
    if (rating > 4.5)
      return {
        text: 'Excellent',
        color: 'success' as const,
        icon: <ThumbUp />,
      };
    if (rating >= 3)
      return {
        text: 'Average',
        color: 'warning' as const,
        icon: <SentimentNeutral />,
      };
    return { text: 'Terrible', color: 'error' as const, icon: <ThumbDown /> };
  };

  const ratingQuality = getRatingQuality(averageRating);

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h6" gutterBottom>
        Amenities Summary
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card
            sx={{
              textAlign: 'center',
              padding: 2,
              height: '100%',
              borderColor: ratingQuality.color,
              borderWidth: 2,
              borderStyle: 'solid',
            }}
          >
            <CardContent>
              <Typography variant="subtitle1">
                Average Location Rating
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {averageRating.toFixed(1)}
                <Badge
                  color={ratingQuality.color}
                  badgeContent={ratingQuality.icon}
                  sx={{ marginLeft: 1 }}
                />
              </Typography>
              <Typography variant="body2" color={ratingQuality.color}>
                {ratingQuality.text}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        {Object.entries(amenityCounts).map(([type, count]) => {
          const quality = count > 10 ? 'High' : count > 5 ? 'Moderate' : 'Low';
          const qualityColor =
            quality === 'High'
              ? 'success'
              : quality === 'Moderate'
                ? 'warning'
                : 'error';
          return (
            <Grid item xs={12} md={4} key={type}>
              <Card sx={{ display: 'flex', alignItems: 'center', padding: 2 }}>
                <Avatar sx={{ bgcolor: 'primary.main', marginRight: 2 }}>
                  {icons[type] || <LocalGroceryStore />}
                </Avatar>
                <CardContent sx={{ flex: 1 }}>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      textTransform: 'capitalize',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {type.replace(/_/g, ' ')}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="h4">{count}</Typography>
                    <Badge
                      color={qualityColor as 'success' | 'warning' | 'error'}
                      badgeContent={quality.charAt(0)}
                      sx={{ marginLeft: 1 }}
                    />
                  </Box>
                  <Typography variant="body2" color={qualityColor}>
                    {quality}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default AggregateInfo;
