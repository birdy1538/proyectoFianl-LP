import { Box } from '@mui/material';
import { styled } from '@mui/system';

// Fondo de pantalla gris
const Background = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  backgroundColor: '#e3e3e3',
});

const BackgroundComponent = ({ children }) => {
  return <Background>{children}</Background>;
};

export default BackgroundComponent;