import { useState } from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom';

export default function Login({onLogin }) {
  const navigate = useNavigate()
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent the form from submitting normally.
    setLoading(true);
    setError(null);

    try {
      // Perform basic authentication check without storing in the database
      if (username === 'test' && password === 'test') {
        // Authentication successful
        // Redirect to a different page or handle success as needed.
        onLogin()
        navigate(`/dashboard`);
        alert('You are logged in successfully');
        console.log('Login successful');
      } else {
        // Authentication failed
        setError('Invalid username or password');
        alert('Login failed. Please check your username and password.');
      }
    } catch (error) {
      // Handle other errors if necessary
      setError('An error occurred during login');
      alert('An error occurred during login. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form className="login-card" onSubmit={handleLogin}>
        <div className="login-header">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path fill="currentColor" d="M4 15h2v5h12V4H6v5H4V3a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6zm6-4V8l5 4-5 4v-3H2v-2h8z"></path>
          </svg>
          <h1 className="login-heading">Sign in</h1>
        </div>
        <div className="login-field">
          <label htmlFor="username" className="login-label">
            Username
          </label>
          <input
            className="login-input"
            name="username"
            type="text"
            placeholder="Username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required // This makes the field required
          />
        </div>
        <div className="login-field">
          <label htmlFor="password" className="login-label">
            Password
          </label>
          <input
            className="login-input"
            name="user_password"
            type="password"
            placeholder="Password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required // This makes the field required
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <div className="login-field">
          <button className="button" type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </div>
      </form>
    </div>
  );
}
