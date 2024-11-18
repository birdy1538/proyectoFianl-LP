import { Box } from '@mui/material';
import { styled } from '@mui/system';

// Fondo de pantalla gris
const Background = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  backgroundColor: '#1f1f1f',
});

const BackgroundComponent = ({ children }) => {
  return <Background>{children}</Background>;
};

export default BackgroundComponent;