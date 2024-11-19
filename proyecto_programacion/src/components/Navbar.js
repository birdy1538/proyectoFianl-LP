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
	const getColor = (path) => (currentPath === path ? '#f19f04' : '#9a6500');
	const getBorder = (path) =>
		currentPath === path ? '3px solid #f19f04' : 'none';
	const getPadding = (path) => (currentPath === path ? '5px' : '');
	return (
		<Box
			sx={{
				position: 'absolute',
				bottom: 0,
				left: 0,
				right: 0,
				bgcolor: '#f1f1f1', // Background color
				//boxShadow: '0px -4px 10px rgba(0, 0, 0, 0.5)', // Shadow on the top edge
				display: 'flex',
				justifyContent: 'space-around', // Space around icons
				alignItems: 'center', // Vertically center icons
				padding: '0px 0px 8px 0px', // Uniform padding
				zIndex: 2000,
			}}
		>
			<div
				onClick={() => navigate('/')} // Navigates back to MainScreen
				aria-label="Home"
				style={{ borderTop: getBorder('/'), padding: getPadding('/') }}
			>
				<HomeIcon fontSize="large" sx={{ color: getColor('/') }} />
			</div>
			<div
				onClick={() => navigate('/favoritos')} // Placeholder for List All action
				aria-label="List All"
				style={{
					borderTop: getBorder('/favoritos'),
					padding: getPadding('/favoritos'),
				}}
			>
				<ListAltIcon fontSize="large" sx={{ color: getColor('/favoritos') }} />
			</div>
			<div
				onClick={() => navigate('/search')} // Placeholder for Search action
				aria-label="Search"
				style={{
					borderTop: getBorder('/search'),
					padding: getPadding('/search'),
				}}
			>
				<SearchIcon fontSize="large" sx={{ color: getColor('/search') }} />
			</div>
			<div
				onClick={() => navigate('/profile')}
				aria-label="Profile"
				style={{
					borderTop: getBorder('/profile'),
					padding: getPadding('/profile'),
				}}
			>
				<PersonIcon fontSize="large" sx={{ color: getColor('/profile') }} />
			</div>
		</Box>
	);
};

export default Navbar;
