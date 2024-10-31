import { Container } from '@mui/material';
import { styled } from '@mui/system';

// Marco de pantalla de teléfono
const PhoneFrame = styled(Container)({
  width: '100%',
  maxWidth: '480px',
  height: '85vh',
  aspectRatio: '9 / 16',
  backgroundColor: '#ffffff',
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
  borderRadius: '16px',
  overflow: 'hidden',
});

const PhoneFrameComponent = ({ children }) => {
  return <PhoneFrame>{children}</PhoneFrame>;
};

export default PhoneFrameComponent;