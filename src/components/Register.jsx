import React, { useState } from 'react';
import axios from 'axios'; 
import "../styles/register.css";

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [registrationMessage, setRegistrationMessage] = useState('');
    const [formErrors, setFormErrors] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        const errors = {};
        if (!formData.username.trim()) {
            errors.username = 'Username is required';
        }
        if (!formData.password.trim()) {
            errors.password = 'Password is required';
        }
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const response = await axios.post('http://localhost:8080/users', formData);
                console.log(response.data); 
                setRegistrationMessage('Registration successful!');
            } catch (error) {
                console.error('Registration failed:', error);
                setRegistrationMessage('Registration failed. Please try again.');
            }
        }
    };

    return ( 
        <div className="registerPage">
            <form className="registerForm" onSubmit={handleSubmit}>
                <h2>Register</h2>
                <div className="inputGroup">
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} />
                    {formErrors.username && <span className="error">{formErrors.username}</span>}
                </div>
                <div className="inputGroup">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
                    {formErrors.password && <span className="error">{formErrors.password}</span>}
                </div>
                <button type="submit">Register</button>
                {registrationMessage && <p>{registrationMessage}</p>} 
            </form>
        </div>
    );
}

export default Register;
