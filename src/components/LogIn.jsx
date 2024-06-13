import { useEffect, useState } from 'react';
import AuthAPI from '../apis/AuthAPI.jsx';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('TestTest'); // Default to 'TestTest'
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Ensure that the Telegram Web Apps API is available
        if (window.Telegram.WebApp) {
            const initData = window.Telegram.WebApp.initDataUnsafe;
            if (initData && initData.user) {
                setUsername(initData.user.username);
            }
        } else {
            console.error('Telegram Web Apps API not found.');
        }
    }, []);

    const handleLogin = (event) => {
        event.preventDefault();
        setError(null);
        AuthAPI.login(username, password)
            .then(() => {
                alert('Login successful!');
                navigate('/main');
                // Handle extra successful login (e.g., redirect to another page)
            })
            .catch((error) => {
                console.error('Login failed:', error);
                setError('Login failed. Please check your credentials.');
            });
    };

    const navigateToSignUp = () => {
        navigate('/signup');
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <label>
                    Select Username:
                    <select value={username} onChange={(e) => setUsername(e.target.value)}>
                        <option value="TestTest">TestTest</option>
                        <option value="Johnn">Johnn</option>
                    </select>
                </label>
                <p>Welcome, @{username}! Please enter your password to continue.</p>
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Log In</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
            <button onClick={navigateToSignUp}>Sign Up</button>
        </div>
    );
};

export default Login;
