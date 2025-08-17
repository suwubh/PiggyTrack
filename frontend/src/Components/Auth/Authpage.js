// src/Components/Auth/AuthPage.js
import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import Login from './Login';
import Signup from './Signup';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const AuthPage = () => {
  const [showSignup, setShowSignup] = useState(false);

  return (
    <AuthWrapper>
      <Logo>PiggyTrack</Logo>
      {showSignup ? 
        <Signup switchToLogin={() => setShowSignup(false)} /> : 
        <Login switchToSignup={() => setShowSignup(true)} />
      }
    </AuthWrapper>
  );
};

const AuthWrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #fdf2f8, #f8fafc);
  animation: ${fadeIn} 0.5s ease;
`;

const Logo = styled.h1`
  text-align: center;
  font-size: 3rem;
  padding-top: 2rem;
  color: #be185d;
  font-weight: 700;
  text-shadow: 0 2px 10px rgba(190, 24, 93, 0.1);
`;

export default AuthPage;
