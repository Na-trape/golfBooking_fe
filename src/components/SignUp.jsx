import { useEffect, useState } from 'react';
import AuthAPI from '../apis/AuthAPI.jsx';
import { countries } from '../service/Countries';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [username, setUsername] = useState('Johnn');
    const [license, setLicense] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [countryId, setCountryId] = useState(countries[0].id);
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

    const handleSignUp = (event) => {
        event.preventDefault();
        setError(null);

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        AuthAPI.createPlayer(license, username, password, countryId)
            .then(() => {
                alert('Sign up successful!');
                navigate('/');
            })
            .catch((error) => {
                console.error('Sign up failed:', error);
                setError('Sign up failed. Please check your details and try again.');
            });
    };

    return (
        <div>
            <h1>Sign Up</h1>
            {username ? (
                <form onSubmit={handleSignUp}>
                    <p>Your username is @{username}</p>
                    <input
                        type="text"
                        placeholder="License"
                        value={license}
                        onChange={(e) => setLicense(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <label>
                        Country:
                        <select
                            value={countryId}
                            onChange={(e) => setCountryId(Number(e.target.value))}
                            required
                        >
                            {countries.map(country => (
                                <option key={country.id} value={country.id}>
                                    {country.name}
                                </option>
                            ))}
                        </select>
                    </label>
                    <button type="submit">Sign Up</button>
                    {error && <p style={{color: 'red'}}>{error}</p>}
                </form>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default SignUp;
