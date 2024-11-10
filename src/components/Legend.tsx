import { Box, Typography } from '@mui/material';
import React from 'react';

const Legend: React.FC = () => {
  return (
    <Box sx={{ padding: 2, marginTop: 2 }}>
      <Typography variant="h6">Legend</Typography>
      <ul>
        <li>
          <img
            src="http://maps.google.com/mapfiles/ms/icons/orange-dot.png"
            alt="School"
          />{' '}
          Property Location
        </li>
        <li>
          <img
            src="http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
            alt="School"
          />{' '}
          School
        </li>
        <li>
          <img
            src="http://maps.google.com/mapfiles/ms/icons/red-dot.png"
            alt="Hospital"
          />{' '}
          Hospital
        </li>
        <li>
          <img
            src="http://maps.google.com/mapfiles/ms/icons/green-dot.png"
            alt="Supermarket"
          />{' '}
          Supermarket
        </li>
        <li>
          <img
            src="http://maps.google.com/mapfiles/ms/icons/pink-dot.png"
            alt="Food"
          />{' '}
          Food
        </li>
        {/*<li><img src="http://maps.google.com/mapfiles/ms/icons/grey-dot.png" alt="Store" />  Store</li>*/}
        <li>
          <img
            src="http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
            alt="Park"
          />{' '}
          Park
        </li>
        <li>
          <img
            src="http://maps.google.com/mapfiles/ms/icons/purple-dot.png"
            alt="Transit Station"
          />{' '}
          Transit Station
        </li>
      </ul>
    </Box>
  );
};

export default Legend;
