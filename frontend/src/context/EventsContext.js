import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const EventsContext = createContext();

export const EventsProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchEvents = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/events');
      setEvents(response.data);
    } catch (err) {
      setError('Failed to fetch events');
      console.error('Events fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const addEvent = async (eventData) => {
    try {
      const response = await api.post('/events', eventData);
      setEvents(prev => [...prev, response.data]);
      return response.data;
    } catch (err) {
      setError('Failed to add event');
      throw err;
    }
  };

  const updateEvent = async (eventId, eventData) => {
    try {
      const response = await api.put(`/events/${eventId}`, eventData);
      setEvents(prev => prev.map(event => 
        event.id === eventId ? response.data : event
      ));
      return response.data;
    } catch (err) {
      setError('Failed to update event');
      throw err;
    }
  };

  const deleteEvent = async (eventId) => {
    try {
      await api.delete(`/events/${eventId}`);
      setEvents(prev => prev.filter(event => event.id !== eventId));
    } catch (err) {
      setError('Failed to delete event');
      throw err;
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <EventsContext.Provider value={{
      events,
      loading,
      error,
      fetchEvents,
      addEvent,
      updateEvent,
      deleteEvent
    }}>
      {children}
    </EventsContext.Provider>
  );
};

export const useEvents = () => {
  const context = useContext(EventsContext);
  if (!context) {
    throw new Error('useEvents must be used within an EventsProvider');
  }
  return context;
};