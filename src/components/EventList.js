import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch events from the backend
  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/events');
      console.log("🟢 Received Events:", response.data); // ✅ Debugging

      if (Array.isArray(response.data)) {
        setEvents(response.data); // ✅ Set the correct response
      } else if (response.data.events) {
        setEvents(response.data.events); // ✅ Handle { events: [...] } structure
      } else {
        throw new Error("Invalid response format");
      }

      setLoading(false);
    } catch (error) {
      console.error("❌ Error fetching events:", error);
      setError("Failed to load events. Please try again later.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // ✅ Accept Event Function
  const handleAccept = async (eventId) => {
    try {
      await axios.put(`http://localhost:5000/events/accept/${eventId}`);
      alert("Event accepted successfully!");
      fetchEvents(); // Refresh the event list
    } catch (error) {
      console.error("❌ Error accepting event:", error);
      alert("Failed to accept event. Please try again.");
    }
  };

  // ❌ Reject Event Function
  const handleReject = async (eventId) => {
    try {
      await axios.delete(`http://localhost:5000/events/reject/${eventId}`);
      alert("Event rejected successfully!");
      fetchEvents(); // Refresh the event list
    } catch (error) {
      console.error("❌ Error rejecting event:", error);
      alert("Failed to reject event. Please try again.");
    }
  };

  if (loading) return <p className="text-center text-gray-600">Loading events...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
        Manage Events
      </h1>
      {events.length === 0 ? (
        <p className="text-center text-gray-600">No events available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="py-3 px-6 text-left">Title</th>
                <th className="py-3 px-6 text-left">Description</th>
                <th className="py-3 px-6 text-left">Date</th>
                <th className="py-3 px-6 text-left">Added By</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event._id} className="border-b hover:bg-gray-100">
                  <td className="py-4 px-6">{event.title || "No Title"}</td>
                  <td className="py-4 px-6">{event.description || "No Description"}</td>
                  <td className="py-4 px-6">{event.date ? new Date(event.date).toLocaleString() : "No Date"}</td>
                  <td className="py-4 px-6">
                    {event.createdBy?.username || "Unknown User"} ({event.createdBy?.email || "No Email"})
                  </td>
                  <td className="py-4 px-6 flex justify-center space-x-2">
                    <button
                      className="bg-green-500 text-white px-3 py-2 rounded-md hover:bg-green-600"
                      onClick={() => handleAccept(event._id)}
                    >
                      Accept
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
                      onClick={() => handleReject(event._id)}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default EventList;
