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
      <HeaderSection>
        <Logo>PiggyTrack</Logo>
        <Subtitle>Your personal finance tracker</Subtitle>
      </HeaderSection>
      
      <FormSection>
        {showSignup ? 
          <Signup switchToLogin={() => setShowSignup(false)} /> : 
          <Login switchToSignup={() => setShowSignup(true)} />
        }
      </FormSection>
    </AuthWrapper>
  );
};

const AuthWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #fdf2f8, #f8fafc);
  animation: ${fadeIn} 0.5s ease;
  padding: 1rem;
  gap: 1rem;
`;

const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: 1rem;
`;

const Logo = styled.h1`
  font-size: clamp(2.5rem, 4vw, 3.5rem);
  color: #be185d;
  font-weight: 700;
  text-shadow: 0 2px 10px rgba(190, 24, 93, 0.1);
  margin-bottom: 0.5rem;
  margin-top: 0;
`;

const Subtitle = styled.p`
  font-size: clamp(1rem, 2vw, 1.3rem);
  color: #ffa6c9;
  margin: 0;
  font-weight: 500;
  font-family: 'Dancing Script', 'Brush Script MT', cursive, 'Segoe UI', sans-serif;
  letter-spacing: 1.2px;
  opacity: 0.9;
  font-style: italic;
  text-shadow: 0 1px 3px rgba(255, 166, 201, 0.3);
`;

const FormSection = styled.div`
  width: 100%;
  max-width: 400px;
  display: flex;
  justify-content: center;
`;

export default AuthPage;
