// src/Components/Orb/Orb.js
import React from 'react';
import styled, { keyframes } from 'styled-components';

const float = keyframes`
  0% { transform: translateY(0px) rotate(0deg);}
  50% { transform: translateY(-20px) rotate(180deg);}
  100% { transform: translateY(0px) rotate(360deg);}
`;

const Orb = () => {
  return <OrbStyled />;
};

export default Orb;

const OrbStyled = styled.div`
  position: absolute;
  top: 20%;
  left: 30%;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: radial-gradient(circle, #ffb6c1 0%, rgba(255,182,193,0.2) 70%, transparent 100%);
  box-shadow: 0 0 60px #ffb6c1, 0 0 120px #ffb6c1, 0 0 180px rgba(255,182,193,0.4);
  animation: ${float} 8s ease-in-out infinite;
  z-index: 0;
`;
