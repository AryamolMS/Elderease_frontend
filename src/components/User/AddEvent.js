import React, { useState } from 'react';
import axios from 'axios';

const AddEvent = () => {
  const [event, setEvent] = useState({
    title: '',
    description: '',
    date: '',
    link: ''
  });

  const handleChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedEvent = { 
        ...event, 
        date: new Date(event.date).toISOString()
    };

    const token = localStorage.getItem('token');

    console.log("🟢 Stored Token Before Request:", token); // ✅ Debugging step

    if (!token) {
        alert('You need to log in first!');
        return;
    }

    try {
        const response = await axios.post('http://localhost:5000/events', formattedEvent, {
            headers: { 
                Authorization: `Bearer ${token}`,  // ✅ Ensure token is included
                'Content-Type': 'application/json' 
            }
        });

        console.log("✅ Server Response:", response.data);

        alert('Event added successfully!');
        setEvent({ title: '', description: '', date: '', link: '' });

    } catch (error) {
        console.error('❌ Error adding event:', error.response?.data || error.message);
        alert(error.response?.data?.message || 'Failed to add event. Please try again.');
    }
};


  return (
    <div className="bg-gray-50 min-h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-8 w-full max-w-lg"
      >
        <h1 className="text-3xl font-bold text-gray-700 mb-6 text-center">
          Add New Event
        </h1>
        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-2">
            Event Title
          </label>
          <input
            name="title"
            value={event.title}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Enter event title"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={event.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Enter event description"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-2">
            Date & Time
          </label>
          <input
            type="datetime-local"
            name="date"
            value={event.date}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-2">
            Event Link
          </label>
          <input
            name="link"
            value={event.link}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Enter event link (e.g., Zoom link)"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white w-full py-2 rounded-md hover:bg-blue-600"
        >
          Add Event
        </button>
      </form>
    </div>
  );
};

export default AddEvent;
