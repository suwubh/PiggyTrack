// src/Components/Auth/AuthPage.js
import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import Login from './Login';
import Signup from './Signup';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-10px);}
  to { opacity: 1; transform: translateY(0);}
`;

const glow = keyframes`
  0% { text-shadow: 0 0 10px #ffb6c1, 0 0 20px #ffb6c1, 0 0 30px rgba(255,182,193,0.4);}
  50% { text-shadow: 0 0 20px #ffb6c1, 0 0 40px #ffb6c1, 0 0 60px rgba(255,182,193,0.6);}
  100% { text-shadow: 0 0 10px #ffb6c1, 0 0 20px #ffb6c1, 0 0 30px rgba(255,182,193,0.4);}
`;

const AuthPage = () => {
  const [showSignup, setShowSignup] = useState(false);

  return (
    <AuthWrapper>
      <CardWrapper>
        <Logo>PiggyTrack</Logo>
        {showSignup ? 
          <Signup switchToLogin={() => setShowSignup(false)} /> : 
          <Login switchToSignup={() => setShowSignup(true)} />}
      </CardWrapper>
    </AuthWrapper>
  );
};

export default AuthPage;

// --- Styled Components ---
const AuthWrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #2c2c54, #1e1e2f); /* Dark gradient */
  position: relative;

  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5); /* Dark overlay */
    top: 0;
    left: 0;
    z-index: 1;
  }
`;

const CardWrapper = styled.div`
  position: relative;
  z-index: 2; /* sits above overlay */
  background: rgba(252, 246, 249, 0.15); /* Glass effect */
  backdrop-filter: blur(8px);
  padding: 3rem 2.5rem;
  border-radius: 20px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4);
  width: 360px;
  animation: ${fadeIn} 0.5s ease;

  form {
    display: flex;
    flex-direction: column;

    h2 {
      text-align: center;
      margin-bottom: 2rem;
      color: #ffb6c1; /* Light Pink */
      font-size: 1.8rem;
    }

    input {
      padding: 0.65rem 0.85rem;
      margin-top: 0.8rem;
      border-radius: 8px;
      border: 1px solid #ccc;
      font-size: 1rem;
      transition: 0.2s;
    }

    input:focus {
      border-color: #ffb6c1;
      outline: none;
      box-shadow: 0 0 5px rgba(255,182,193,0.4);
    }

    button {
      margin-top: 1.5rem;
      padding: 0.75rem;
      border: none;
      border-radius: 10px;
      background: #ffb6c1;
      color: white;
      font-weight: bold;
      cursor: pointer;
      transition: 0.3s;
    }

    button:hover {
      background: #ffa1b8; /* slightly darker pink on hover */
    }

    p {
      margin-top: 1rem;
      text-align: center;
      color: #ffb6c1;
      cursor: pointer;
      font-weight: 500;
      &:hover {
        text-decoration: underline;
      }
    }

    .error {
      margin-top: 0.5rem;
      text-align: center;
      color: #ef4444;
      font-weight: 500;
    }
  }
`;

const Logo = styled.h1`
  text-align: center;
  font-size: 2rem;
  margin-bottom: 2rem;
  color: #ffb6c1; /* Light Pink */
  font-weight: bold;
  animation: ${glow} 2s infinite alternate;
`;
