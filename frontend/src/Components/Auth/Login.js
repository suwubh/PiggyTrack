// src/Components/Auth/Login.js
import React, { useState } from 'react';

const Login = ({ switchToSignup }) => {
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            // FIX: Corrected the API URL to match backend's /api/v1/auth/login
            const res = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });

            const data = await res.json();

            if (!res.ok) {
                // If the response is not OK (e.g., 400, 404, 500), throw an error with the message
                throw new Error(data.message || "Login failed. Please try again.");
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
        // Your existing JSX for the login form
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
            <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
            <button type="submit">Login</button>
            {error && <p className="error">{error}</p>}
            <p onClick={switchToSignup}>Don't have an account? Sign Up</p>
        </form>
    );
};

export default Login;
