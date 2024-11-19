import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Card = ({ title, content, size, image, id }) => {
	const navigate = useNavigate();

	const getCardStyle = () => {
		switch (size) {
			case 'large':
				return { width: '100%' };
			case 'medium':
				return { width: '100%' };
			default:
				return { width: '100%' };
		}
	};

	const handleClick = () => {
		navigate(`/receta/${id}`);
	};

	return (
		<div
			elevation={0}
			style={{
				...getCardStyle(),
				margin: '16px auto',
				borderRadius: 'none !important',
				overflow: 'hidden',
				display: 'flex',
				alignItems: 'center',
				padding: '16px',
				cursor: 'pointer',
				backgroundColor: '#f1f1f1',
				borderTop: '1px solid #dddddd',
				borderBottom: '1px solid #dddddd',
			}}
			onClick={handleClick}
		>
			{/* Circular Image Section */}
			<Box
				style={{
					width: '100px', // Fixed width for the circle
					height: '100px', // Fixed height for the circle
					borderRadius: '50%',
					overflow: 'hidden',
					marginRight: '16px', // Space between image and text
				}}
			>
				<Box
					component="img"
					src={image}
					alt={`${title} image`}
					style={{
						width: '100%',
						height: '100%',
						objectFit: 'cover',
					}}
				/>
			</Box>

			{/* Text Content Section */}
			<Box
				style={{
					flex: 1,
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
				}}
			>
				<Typography
					variant="h5"
					component="h2"
					style={{
						color: '#c48304',
						fontFamily: 'Roboto, sans-serif',
						fontWeight: 700,
						marginBottom: '8px',
						fontSize: '18px',
					}}
				>
					{title}
				</Typography>
				<Typography
					variant="body1"
					style={{
						color: '#555',
						fontFamily: 'Roboto, sans-serif',
						fontWeight: 400,
						fontSize: '12px',
					}}
				>
					{content}
				</Typography>
			</Box>
		</div>
	);
};

export default Card;
