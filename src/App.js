import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar'; // Assuming you have a Navbar component
import CreateAccountPage from './components/CreateAccountPage';
import ForgotPasswordPage from './components/ForgotPasswordPage';
import AddEvent from './components/AddEvent';
import EventList from './components/EventList';
import HomePage from './components/HomePage'; // Assuming you have a HomePage component
import LoginPage from './components/LoginPage'; // Assuming you have a LoginPage component
import ContactUs from './components/ContactUs';
import ApproveEvents from './components/ApproveEvents';
import Adminhome from './components/Admin/Adminhome';

const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/create-account" element={<CreateAccountPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/add-event" element={<AddEvent />} />  {/* Add Event page route */}
                <Route path="/events" element={<EventList />} />  {/* Event List page route */}
                <Route path="/contact-us" element={<ContactUs  />} /> 
                <Route path="/approve-events" element={<ApproveEvents />} />
                <Route path='/admin-dashboard' element={<Adminhome/>}/>
            </Routes>
        </Router>
    );
};

export default App;
