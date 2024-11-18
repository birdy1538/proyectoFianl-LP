import React from 'react';
import { Box, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import ListAltIcon from '@mui/icons-material/ListAlt'; // List All icon
import SearchIcon from '@mui/icons-material/Search'; // Search icon
import HomeIcon from '@mui/icons-material/Home'; // Home icon

const Navbar = ({ currentPath }) => {
  const navigate = useNavigate();

  // Define the color for the selected icon
  const getColor = (path) => (currentPath === path ? '#f19f04' : 'white');

  return (
    <Box 
      sx={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        bgcolor: '#694504', // Background color
        boxShadow: '0px -4px 10px rgba(0, 0, 0, 0.5)', // Shadow on the top edge
        display: 'flex',
        justifyContent: 'space-around', // Space around icons
        alignItems: 'center', // Vertically center icons
        padding: '8px 0', // Uniform padding
        zIndex: 2000,
      }}
    >
      <IconButton 
        onClick={() => navigate('/')} // Navigates back to MainScreen
        aria-label="Home"
      >
        <HomeIcon fontSize="large" sx={{ color: getColor('/') }} /> 
      </IconButton>
      <IconButton 
        onClick={() => navigate('/favoritos')} // Placeholder for List All action
        aria-label="List All"
      >
        <ListAltIcon fontSize="large" sx={{ color: getColor('/favoritos') }} /> 
      </IconButton>
      <IconButton 
        onClick={() => navigate('/search')} // Placeholder for Search action
        aria-label="Search"
      >
        <SearchIcon fontSize="large" sx={{ color: getColor('/search') }} /> 
      </IconButton>
      <IconButton 
        onClick={() => navigate('/profile')} 
        aria-label="Profile"
      >
        <PersonIcon fontSize="large" sx={{ color: getColor('/profile') }} /> 
      </IconButton>
    </Box>
  );
};

export default Navbar;