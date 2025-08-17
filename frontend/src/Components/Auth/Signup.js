// src/Components/Auth/Signup.js
import React, { useState } from 'react';
import styled from 'styled-components';

const Signup = ({ switchToLogin }) => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.message || "Signup failed. Please try again.");
      }

      localStorage.setItem('token', data.token);
      window.location.reload();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <SignupContainer>
      <SignupCard>
        <Logo>Create Account</Logo>
        <SignupForm onSubmit={handleSubmit}>
          <InputGroup>
            <Label>Full Name</Label>
            <Input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </InputGroup>

          <InputGroup>
            <Label>Email Address</Label>
            <Input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </InputGroup>
          
          <InputGroup>
            <Label>Password</Label>
            <Input
              type="password"
              name="password"
              placeholder="Create a password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </InputGroup>

          {error && <ErrorMessage>{error}</ErrorMessage>}
          
          <SubmitButton type="submit">Create Account</SubmitButton>
        </SignupForm>
        
        <SwitchText>
          Already have an account? 
          <SwitchLink onClick={switchToLogin}> Sign in here</SwitchLink>
        </SwitchText>
      </SignupCard>
    </SignupContainer>
  );
};

const SignupContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #fdf2f8, #f8fafc);
  padding: 2rem;
`;

const SignupCard = styled.div`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  padding: 3rem 2.5rem;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(255, 182, 193, 0.15);
  width: 100%;
  max-width: 400px;
  border: 1px solid rgba(255, 182, 193, 0.2);
`;

const Logo = styled.h1`
  text-align: center;
  font-size: 2rem;
  margin-bottom: 2rem;
  color: #be185d;
  font-weight: 600;
`;

const SignupForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  color: #374151;
  font-weight: 500;
  font-size: 0.9rem;
`;

const Input = styled.input`
  padding: 0.8rem 1rem;
  border: 1px solid #fce7f3;
  border-radius: 12px;
  font-size: 1rem;
  background: #fef7ff;
  color: #374151;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #f9a8d4;
    box-shadow: 0 0 0 3px rgba(249, 168, 212, 0.1);
    background: #ffffff;
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

const SubmitButton = styled.button`
  padding: 0.8rem 1.5rem;
  background: linear-gradient(135deg, #f9a8d4, #ec4899);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 1rem;

  &:hover {
    background: linear-gradient(135deg, #f472b6, #db2777);
    transform: translateY(-1px);
    box-shadow: 0 5px 15px rgba(236, 72, 153, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

const ErrorMessage = styled.div`
  color: #ef4444;
  text-align: center;
  font-size: 0.9rem;
  font-weight: 500;
  background: #fef2f2;
  padding: 0.8rem;
  border-radius: 8px;
  border: 1px solid #fecaca;
`;

const SwitchText = styled.p`
  text-align: center;
  margin-top: 2rem;
  color: #6b7280;
  font-size: 0.9rem;
`;

const SwitchLink = styled.span`
  color: #ec4899;
  cursor: pointer;
  font-weight: 600;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export default Signup;
