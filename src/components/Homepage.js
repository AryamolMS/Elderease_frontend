import React, { useState } from 'react';
import VideoCard from './VideoCard'; // Component for displaying tutorials
import './HomePage.css';


const HomePage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [tutorials, setTutorials] = useState([]);

    // Function to search tutorials based on the query (from text box or voice)
    const searchTutorials = (query) => {
        // Sample list of tutorials
        const allTutorials = [
            { id: 1, title: 'How to perform a bank transaction', videoId: 'dQw4w9WgXcQ' },
            { id: 2, title: 'How to use ElderEase for support', videoId: 'M7lc1UVf-VE' }
        ];

        // Filter tutorials based on the query
        setTutorials(allTutorials.filter(tutorial => tutorial.title.toLowerCase().includes(query.toLowerCase())));
    };

    // Function to handle voice search using the SpeechRecognition API
    const startVoiceSearch = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert("Speech Recognition is not supported in this browser. Please use Google Chrome or Microsoft Edge.");
            return;
        }

        try {
            const recognition = new SpeechRecognition();
            recognition.lang = 'en-US';
            recognition.start();

            recognition.onstart = () => {
                console.log("Voice recognition started...");
            };

            recognition.onresult = (event) => {
                const query = event.results[0][0].transcript;
                console.log("Voice Search Result: ", query);
                setSearchQuery(query);
                searchTutorials(query);
            };

            recognition.onerror = (event) => {
                console.error("Speech Recognition Error:", event.error);
                alert(`Speech Recognition Error: ${event.error}`);
            };

            recognition.onend = () => {
                console.log("Voice recognition ended.");
            };
        } catch (error) {
            console.error("Error initializing SpeechRecognition:", error);
            alert("An error occurred while using Speech Recognition. Please try again.");
        }
    };

    return (
        <div className="home-page">
            <div className="search-section">
                <input 
                    type="text" 
                    className="search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search tutorials..." 
                />
                <div className="buttons">
                    <button className="search-btn" onClick={() => searchTutorials(searchQuery)}>Search</button>
                    <button className="voice-btn" onClick={startVoiceSearch}>🎙️</button>
                </div>
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
