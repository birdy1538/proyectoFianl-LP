import { Container } from '@mui/material';
import { styled } from '@mui/system';
import Navbar from '../components/Navbar';
import { useLocation } from 'react-router-dom';

// Marco de pantalla de teléfono
const PhoneFrame = styled(Container)({
	width: '100%',
	maxWidth: '480px',
	height: '85vh',
	aspectRatio: '9 / 16',
	backgroundColor: '#f1f1f1',
	boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
	borderRadius: '16px',
	overflow: 'hidden',
	position: 'relative',
});

const PhoneFrameComponent = ({ children }) => {
	const location = useLocation();

	return (
		<PhoneFrame>
			{children}
			<Navbar currentPath={location.pathname} />
		</PhoneFrame>
	);
};

export default PhoneFrameComponent;
