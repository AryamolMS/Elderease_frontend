import React, { useState } from 'react';
import VideoCard from './VideoCard'; // Component for displaying tutorials
import './HomePage.css';

const HomePage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [tutorials, setTutorials] = useState([]);

    const searchTutorials = (query) => {
        const allTutorials = [
            { id: 1, title: 'How to perform a bank transaction', videoId: 'dQw4w9WgXcQ' },
            { id: 2, title: 'How to use ElderEase for support', videoId: 'M7lc1UVf-VE' }
        ];
        setTutorials(allTutorials.filter(tutorial => tutorial.title.toLowerCase().includes(query.toLowerCase())));
    };

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
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search tutorials..." 
                />
                <button className="search-btn" onClick={() => searchTutorials(searchQuery)}>Search</button>
                <button className="voice-btn" onClick={startVoiceSearch}>🎙️</button>
            </div>

            <div className="tutorial-cards">
                {tutorials.map(tutorial => (
                    <VideoCard key={tutorial.id} videoId={tutorial.videoId} title={tutorial.title} />
                ))}
            </div>
        </div>
    );
};

export default HomePage;
