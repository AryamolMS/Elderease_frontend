import React, { useState, useEffect } from 'react';
import axios from 'axios';
import VideoCard from './VideoCard'; // Component for displaying tutorials
import './HomePage.css';

const HomePage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [tutorials, setTutorials] = useState([]);
    const [filteredTutorials, setFilteredTutorials] = useState([]);

    // ✅ Fetch tutorials from backend on mount
    useEffect(() => {
        fetchTutorials();
    }, []);

    const fetchTutorials = async () => {
        try {
            const response = await axios.get('http://localhost:5000/tutorials');
            setTutorials(response.data);
        } catch (error) {
            console.error("❌ Error fetching tutorials:", error);
        }
    };

    // ✅ Filter tutorials based on search query
    const searchTutorials = (query) => {
        setSearchQuery(query);
        if (query.trim() === '') {
            setFilteredTutorials([]); // ✅ Hide tutorials when search is empty
        } else {
            setFilteredTutorials(
                tutorials.filter(tutorial =>
                    tutorial.title.toLowerCase().includes(query.toLowerCase())
                )
            );
        }
    };

    // ✅ Voice Search Functionality
    const startVoiceSearch = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert("Speech Recognition is not supported in this browser.");
            return;
        }

        try {
            const recognition = new SpeechRecognition();
            recognition.lang = 'en-US';
            recognition.start();

            recognition.onresult = (event) => {
                const query = event.results[0][0].transcript;
                setSearchQuery(query);
                searchTutorials(query);
            };

            recognition.onerror = (event) => {
                alert(`Speech Recognition Error: ${event.error}`);
            };
        } catch (error) {
            alert("An error occurred while using Speech Recognition.");
        }
    };

    return (
        <div className="home-page">
            {/* Video Background */}
            <video autoPlay loop muted className="bg-video">
                <source src="/assets/home.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Translucent Search Box */}
            <div className="search-container">
                <input 
                    type="text" 
                    className="search-input"
                    value={searchQuery}
                    onChange={(e) => searchTutorials(e.target.value)}
                    placeholder="Search tutorials..." 
                />
                <button className="voice-btn" onClick={startVoiceSearch}>🎙️</button>
            </div>

            {/* ✅ Display Tutorials Only When Search is Performed */}
            {searchQuery.trim() !== '' && (
                <div className="tutorial-cards">
                    {filteredTutorials.length === 0 ? (
                        <p className="text-red-600 text-center">No tutorials found.</p>
                    ) : (
                        filteredTutorials.map(tutorial => (
                            <VideoCard key={tutorial._id} videoId={tutorial.videoId} title={tutorial.title} />
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default HomePage;
