// src/Components/Auth/Signup.js
import React, { useState } from 'react';

const Signup = ({ switchToLogin }) => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      localStorage.setItem('token', data.token);
      window.location.reload(); // Or redirect to dashboard
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      {error && <p style={{color: 'red'}}>{error}</p>}
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
      <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
      <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
      <button type="submit">Sign Up</button>
      <p onClick={switchToLogin} style={{cursor:'pointer'}}>Already have an account? Login</p>
    </form>
  );
};

export default Signup;
