import { useState } from 'react'
import LogIn from './components/LogIn.jsx';
import './App.css'
import SignUp from './components/SignUp.jsx';
import React from 'react'
import { createRoot } from 'react-dom/client';
import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from "./components/MainPage.jsx";
import PrivateRoute from './components/PrivateRoute';
import { NavBar } from "./components/NavBar";
import ProductManagement from "./components/ProductManagement.jsx";
import UserManagement from './components/UserManagement.jsx';
import Statistics from './components/Statistics.jsx';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const logout = () => {
        localStorage.removeItem('accessToken');
        setIsLoggedIn(false);
    }
    const login = () => {
        setIsLoggedIn(true);
    }

    return (
        <Router>
            <div>
                {isLoggedIn && <NavBar logout={logout}/>}
                <Routes>
                    <Route path="/" element={<LogIn login={login} />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/main" element={<PrivateRoute element={MainPage} />} />
                    <Route path="/products" element={<ProductManagement product={ProductManagement}/>} />
                    <Route path="/users" element={<PrivateRoute element={UserManagement} />} />
                    <Route path="/statistics" element={<PrivateRoute element={Statistics} />} />
                </Routes>
            </div>
        </Router>
    );
};


const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);


export default App;
