import React from 'react';
import { Box, Typography, Paper, List, ListItem, ListItemText } from '@mui/material';
import Layout from '../layout/Layout';

const ParentCalendar = () => {
  // Mock data - replace with actual API calls
  const events = [
    { id: 1, title: 'Parent-Teacher Conference', date: '2024-03-22', time: '16:00' },
    { id: 2, title: 'School Sports Day', date: '2024-03-25', time: '09:00' },
    { id: 3, title: 'Science Fair', date: '2024-04-10', time: '13:00' },
  ];

  return (
    <Layout>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          School Events
        </Typography>
        
        <Paper sx={{ p: 3 }}>
          <List>
            {events.map((event) => (
              <ListItem key={event.id} divider>
                <ListItemText
                  primary={event.title}
                  secondary={`${event.date} at ${event.time}`}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Box>
    </Layout>
  );
};

export default ParentCalendar;