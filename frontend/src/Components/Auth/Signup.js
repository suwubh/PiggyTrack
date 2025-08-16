// src/Components/Auth/Signup.js
import React, { useState } from 'react';

const Signup = ({ switchToLogin }) => {
    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            // FIX: Corrected the API URL to match backend's /api/v1/auth/signup
            const res = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/auth/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });

            const data = await res.json();

            if (!res.ok) {
                // If the response is not OK, throw an error
                throw new Error(data.message || "Signup failed. Please try again.");
            }

            // Save JWT token
            localStorage.setItem('token', data.token);

            // Redirect to dashboard (full page reload to re-initialize App component)
            window.location.reload();
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        // Your existing JSX for the signup form
        <form onSubmit={handleSubmit}>
            <h2>Sign Up</h2>
            <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
            <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
            <button type="submit">Sign Up</button>
            {error && <p className="error">{error}</p>}
            <p onClick={switchToLogin}>Already have an account? Login</p>
        </form>
    );
};

export default Signup;
