import React, { useState, useEffect } from 'react';
import { Paper, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';
import { adminAPI } from '../../../services/api';

const CalendarPanel = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await adminAPI.getCalendarEvents();
        setEvents(response.data);
      } catch (error) {
        console.error('Failed to fetch calendar events:', error);
        // Fallback to mock data
        setEvents([
          { id: 1, title: 'Career Day', date: 'Tomorrow' },
          { id: 2, title: 'Field Trip to Science Museum', date: 'Mar 22' },
          { id: 3, title: 'Sports Day', date: 'Mar 25' },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <Paper sx={{ p: 2, height: 380, overflow: 'auto' }}>
      <Typography variant="h6" gutterBottom component="div">
        Upcoming Events
      </Typography>
      <Divider sx={{ mb: 2 }} />
      {loading ? (
        <Typography>Loading events...</Typography>
      ) : (
        <List>
          {events.map((event, index) => (
            <ListItem key={event.id || index} divider>
              <ListItemText 
                primary={event.title}
                secondary={`Date: ${event.date}`} 
              />
            </ListItem>
          ))}
        </List>
      )}
    </Paper>
  );
};

export default CalendarPanel;