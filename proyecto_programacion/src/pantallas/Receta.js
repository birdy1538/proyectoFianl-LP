import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
	Box,
	Typography,
	ToggleButton,
	ToggleButtonGroup,
} from '@mui/material';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import CountdownClock from '../components/CountdownClock';
import Tooltip from '@mui/material/Tooltip';

const Receta = () => {
	const { id } = useParams();
	const [recipe, setRecipe] = useState(null);
	const [error, setError] = useState(null);
	const [isFavorite, setIsFavorite] = useState(false);
	const [alignment, setAlignment] = useState('instrucciones'); // Default value set to 'instrucciones'
	const [isHovered, setIsHovered] = useState(false);
	const userId = localStorage.getItem('userId');

	useEffect(() => {
		const fetchRecipeById = async () => {
			try {
				let response;

				if (userId) {
					response = await axios.get(`http://localhost:4000/recipes/${id}`, {
						params: { userId },
					});
				} else {
					response = await axios.get(`http://localhost:4000/recipes/${id}`);
				}

				setRecipe(response.data);
				if (userId) {
					setIsFavorite(response.data.isFavorite);
				}
			} catch (err) {
				setError('Error fetching recipe');
				console.error(err);
			}
		};

		fetchRecipeById();
	}, [id, userId]);

	const handleFavoriteToggle = async () => {
		try {
			const response = await axios.put('http://localhost:4000/favorites', {
				userId: userId,
				recetaId: id,
			});
			setIsFavorite(!isFavorite);
			console.log(response.data.message);
		} catch (error) {
			console.error('Error al modificar la receta favorita:', error);
		}
	};

	const handleChange = (event, newAlignment) => {
		setAlignment(newAlignment);
	};

	if (error) {
		return (
			<Typography variant="h5">Hubo un error buscando esta receta</Typography>
		);
	}

	if (!recipe) {
		return <div>Loading...</div>;
	}

	const getParsedImages = (imagesString) => {
		try {
			return JSON.parse(imagesString.replace(/'/g, '"'));
		} catch (error) {
			console.error('Error parsing images:', error);
			return null;
		}
	};

	const getParsedInstructions = (instructionsString) => {
		try {
			return JSON.parse(instructionsString.replace(/'/g, '"'));
		} catch (error) {
			console.error('Error parsing instructions:', error);
			return null;
		}
	};

	const images = recipe.Images ? getParsedImages(recipe.Images) : null;
	const instructions = recipe.RecipeInstructions
		? getParsedInstructions(recipe.RecipeInstructions)
		: null;
	const ingredientes = recipe.RecipeIngredientParts
		? getParsedInstructions(recipe.RecipeIngredientParts)
		: null;

	return (
		<Box
			sx={{
				height: '85vh',
				overflowY: 'auto',
				scrollbarWidth: 'none', // For Firefox
				'&::-webkit-scrollbar': {
					display: 'none', // For Chrome, Safari, and Edge
				},
				display: 'flex',
				flexDirection: 'column',
			}}
		>
			<Box
				sx={{
					flexGrow: 1,
					overflowY: 'auto',
					scrollbarWidth: 'none', // For Firefox
					'&::-webkit-scrollbar': {
						display: 'none', // For Chrome, Safari, and Edge
					},
					paddingBottom: '100px',
				}}
			>
				<Box sx={{ position: 'relative', height: '66.67%' }}>
					<Box
						component="img"
						src={images ? images[0] : ''}
						alt={recipe.Name}
						sx={{
							width: '100%',
							height: '100%',
							objectFit: 'cover',
							marginBottom: '16px',
							borderBottomLeftRadius: '16px',
							borderBottomRightRadius: '16px',
						}}
					/>
					<Box
						sx={{
							position: 'absolute',
							bottom: 0,
							left: 0,
							right: 0,
							height: '25%',
							background: 'linear-gradient(to top, #f19f04, transparent)',
							borderBottomLeftRadius: '16px',
							borderBottomRightRadius: '16px',
						}}
					/>
					<Typography
						variant="h3"
						sx={{
							position: 'absolute',
							bottom: '10%',
							left: '50%',
							transform: 'translateX(-50%)',
							color: 'white',
							fontWeight: 'bold',
							fontFamily: 'Roboto, sans-serif',
							textAlign: 'center',
						}}
					>
						{recipe.Name}
					</Typography>
				</Box>

				<Box
					sx={{
						padding: '16px',
						backgroundColor: '#f1f1f1',
						borderRadius: '16px',
					}}
				>
					<Typography
						variant="body1"
						sx={{
							marginBottom: '16px',
							color: '#3d2802',
							fontWeight: 'normal',
							fontFamily: 'Roboto, sans-serif',
						}}
					>
						{recipe.Description}
					</Typography>

					<Box
						sx={{
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
							marginBottom: '16px',
						}}
					>
						<ToggleButtonGroup
							color="default"
							value={alignment}
							exclusive
							onChange={handleChange}
							aria-label="Recipe Sections"
							sx={{
								'& .MuiToggleButton-root': {
									fontSize: '10px',
									padding: '8px 16px',
									margin: '0 4px',
									transition: 'background-color 0.3s ease, color 0.3s ease',
									borderRadius: '8px',
									'&:hover': {
										backgroundColor: '#f19f04',
										color: '#3d2802',
									},
									'&.Mui-selected': {
										backgroundColor: '#c48304',
										color: '#3d2802',
										border: '2px solid #3d2802',
										'&:hover': {
											backgroundColor: '#d49404',
										},
									},
								},
							}}
						>
							<ToggleButton
								value="instrucciones"
								aria-pressed={alignment === 'instrucciones'}
								sx={{
									'&.Mui-selected': {
										boxShadow: 'none',
									},
								}}
							>
								Instrucciones
							</ToggleButton>
							<ToggleButton
								value="ingredientes"
								aria-pressed={alignment === 'ingredientes'}
								sx={{
									'&.Mui-selected': {
										boxShadow: 'none',
									},
								}}
							>
								Ingredientes
							</ToggleButton>
						</ToggleButtonGroup>
						<Tooltip
							title={!userId ? 'Inicia sesión para guardar' : ''}
							arrow
							open={isHovered && !userId}
							sx={{
								fontSize: '0.75rem',
								padding: '4px',
								maxWidth: '150px',
							}}
						>
							<span
								onMouseEnter={() => setIsHovered(true)}
								onMouseLeave={() => setIsHovered(false)}
							>
								<ToggleButton
									value="check"
									selected={userId && isFavorite}
									disabled={!userId}
									onChange={handleFavoriteToggle}
									sx={{ color: isFavorite ? 'black' : 'grey', height: '34px' }}
								>
									{isFavorite ? <BookmarkAddedIcon /> : <BookmarkIcon />}
								</ToggleButton>
							</span>
						</Tooltip>
					</Box>

					{/* Conditional rendering based on alignment */}
					{alignment === 'instrucciones' ? (
						<>
							{instructions && (
								<Typography
									variant="h6"
									sx={{
										marginBottom: '8px',
										color: '#3d2802',
										fontWeight: 'bold',
										fontFamily: 'Roboto, sans-serif',
									}}
								>
									Instrucciones:
								</Typography>
							)}
							{instructions &&
								instructions.map((step, index) => (
									<Typography
										key={index}
										variant="body1"
										component="p"
										sx={{
											marginBottom: '8px',
											listStyleType: 'disc',
											marginLeft: '20px',
											color: '#3d2802',
											fontWeight: 'normal',
											fontFamily: 'Roboto, sans-serif',
										}}
									>
										{'- ' + step}
									</Typography>
								))}
							{instructions && (
								<Typography
									variant="h6"
									sx={{
										marginBottom: '8px',
										color: '#3d2802',
										fontWeight: 'bold',
										fontFamily: 'Roboto, sans-serif',
									}}
								>
									Temporizador:
								</Typography>
							)}
							{instructions && recipe.minutes && (
								<CountdownClock initialMinutes={recipe.minutes} />
							)}
						</>
					) : (
						<>
							{ingredientes && (
								<Typography
									variant="h6"
									sx={{
										marginBottom: '8px',
										color: '#3d2802',
										fontWeight: 'bold',
										fontFamily: 'Roboto, sans-serif',
									}}
								>
									Ingredientes:
								</Typography>
							)}
							{ingredientes &&
								ingredientes.map((step, index) => (
									<Typography
										key={index}
										variant="body1"
										component="p"
										sx={{
											marginBottom: '8px',
											listStyleType: 'disc',
											marginLeft: '20px',
											color: '#3d2802',
											fontWeight: 'normal',
											fontFamily: 'Roboto, sans-serif',
										}}
									>
										{'- ' + step}
									</Typography>
								))}
						</>
					)}
				</Box>
			</Box>
		</Box>
	);
};

export default Receta;
