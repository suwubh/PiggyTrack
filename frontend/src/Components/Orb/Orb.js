import React from 'react';
import styled, { keyframes } from 'styled-components';

const float = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(180deg); }
  100% { transform: translateY(0px) rotate(360deg); }
`;

const OrbStyled = styled.div`
  position: absolute;
  top: 15%;
  left: 25%;
  width: 180px; 
  height: 180px;
  border-radius: 50%;
  background: radial-gradient(circle, #ffb6c1 0%, rgba(255,182,193,0.35) 70%, transparent 100%); /* Made glow more solid */
  box-shadow: 0 0 80px #ffb6c1, 0 0 160px #ffb6c1, 0 0 240px rgba(255,182,193,0.6);
  animation: ${float} 10s ease-in-out infinite;
  z-index: 0;
`;

const Orb = () => {
  return <OrbStyled />;
};

export default Orb;
