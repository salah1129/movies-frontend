import React from 'react';
import "../styles/login.css";

const Login = () => {
    return ( 
        <div className="loginPage">
            <form className="loginForm">
                <h2>Login</h2>
                <div className="inputGroup">
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" name="username" />
                </div>
                <div className="inputGroup">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" />
                </div>
                <button type="submit">Login</button>
            </form>
            <button className="registerButton">
                <a href='register'>Register</a>
            </button>
        </div>
    );
}
export default Login;
