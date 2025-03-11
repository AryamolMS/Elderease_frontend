import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import AdminNavbar from './components/Admin/AdminNavbar'; // Import Admin Navbar
import AddEvent from './components/User/AddEvent';
import HomePage from './components/HomePage';
import ContactUs from './components/ContactUs';
import Adminhome from './components/Admin/Adminhome';
import CreateAccountPage from './components/Registration/CreateAccountPage';
import ForgotPasswordPage from './components/Registration/ForgotPasswordPage';
import LoginPage from './components/Registration/LoginPage';
import EventList from './components/EventList';
import ApprovedEvents from './components/Admin/ApproveEvents';
import Webinar from './components/User/Webinar';
import AdminTutorials from './components/Admin/AdminTutorials';
import Tutorials from './components/User/Tutorials';
import HealthResources from './components/User/HealthResourses';
import Article from './components/User/Article';

const App = () => {
    const [userRole, setUserRole] = useState(localStorage.getItem("userRole")); // Get role from localStorage

    useEffect(() => {
        // Listen for changes in localStorage to update role dynamically
        const handleStorageChange = () => {
            setUserRole(localStorage.getItem("userRole"));
        };

        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    return (
        <Router>
            {userRole === "admin" ? <AdminNavbar /> : <Navbar />} {/* Show the correct navbar */}
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/create-account" element={<CreateAccountPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/add-event" element={<AddEvent />} />
                <Route path="/events" element={<EventList />} />
                <Route path="/contact-us" element={<ContactUs />} />
                <Route path="/approve-events" element={<ApprovedEvents />} />
                <Route path='/admin-dashboard' element={<Adminhome />} />
                <Route path='/user-webinar' element={<Webinar />} />
                <Route path='/admin-tutorials' element={<AdminTutorials />} />
                <Route path='/tutorials' element={<Tutorials/>}/>
                <Route path='/health' element={<HealthResources/>}/>
                <Route path='/articles' element={<Article/>}/>
            </Routes>
        </Router>
    );
};

export default App;
