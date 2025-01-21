import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/Homepage';  // Correct import for HomePage
import Navbar from './components/Navbar';  // Correct import for Navbar
import LoginPage from './components/LoginPage';  // Correct import for LoginPage
import CreateAccountPage from './components/CreateAccountPage';
import ForgotPasswordPage from './components/ForgotPasswordPage';
const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />  {/* Login page route */}
                <Route path="/create-account" element={<CreateAccountPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />

            </Routes>
        </Router>
    );
};

export default App;
