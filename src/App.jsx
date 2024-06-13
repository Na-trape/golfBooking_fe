// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import ClubsList from './Clubs';
import LogIn from './components/LogIn.jsx';
import './App.css'
import SignUp from './components/SignUp.jsx';
import React from 'react'
import { createRoot } from 'react-dom/client';
import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from "./components/MainPage.jsx";
import PrivateRoute from './components/PrivateRoute';
// import NavBar from './components/NavBar.jsx';
//
// import { useState } from 'react';





const App = () => {

    // const [isLoggedIn, setIsLoggedIn] = useState(false);
    //
    // const handleLogin = () => {
    //     // Logic for handling login goes here
    //     // When login is successful, set isLoggedIn to true
    //     setIsLoggedIn(true);
    // };

    return (
        <Router>
            {/*{isLoggedIn && <NavBar />}*/}
            <Routes>
                <Route path="/" element={<LogIn/>} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/main" element={<PrivateRoute element={MainPage} />} />
            </Routes>
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