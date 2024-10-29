import { Container } from '@mui/material';
import { styled } from '@mui/system';

// Marco de pantalla de teléfono
const PhoneFrame = styled(Container)({
  width: '100%',
  maxWidth: '480px', // Aumenta el ancho típico de pantalla móvil
  height: '85vh', // Establece una altura relativa (85% de la altura de la ventana)
  aspectRatio: '9 / 16', // relación de aspecto de 16:9
  backgroundColor: '#ffffff', // fondo blanco de la pantalla
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
  borderRadius: '16px', // borde redondeado
  overflow: 'hidden',
});

const PhoneFrameComponent = ({ children }) => {
  return <PhoneFrame>{children}</PhoneFrame>;
};

export default PhoneFrameComponent;