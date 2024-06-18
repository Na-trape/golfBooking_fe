import { useEffect, useState } from 'react';
import AuthAPI from '../apis/AuthAPI.jsx';
import { useNavigate } from 'react-router-dom';

const Login = ({ login }) => {
    const [username, setUsername] = useState('TestTest'); // Default to 'TestTest'
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
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
                login();
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
                        <option value="admin@fontys.nl">admin@fontys.nl</option>
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
                <div style={{ display: 'flex', marginTop: '20px', justifyContent: "center" }}>
                    <button type="submit" style={{marginRight: '10px'}}>Log In</button>
                    <button onClick={navigateToSignUp}>Sign Up</button>
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
        </div>
    );
};

export default Login;
