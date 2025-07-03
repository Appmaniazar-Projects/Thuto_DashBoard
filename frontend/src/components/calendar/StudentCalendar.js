import React from 'react';
import { Box, Typography, Paper, List, ListItem, ListItemText } from '@mui/material';
import Layout from '../layout/Layout';

const StudentCalendar = () => {
  // Mock data - replace with actual API calls
  const events = [
    { id: 1, title: 'Math Test', date: '2024-03-21', time: '10:00' },
    { id: 2, title: 'Science Project Due', date: '2024-03-24', time: '15:00' },
    { id: 3, title: 'School Sports Day', date: '2024-03-25', time: '09:00' },
  ];

  return (
    <Layout>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          My Schedule
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

export default StudentCalendar;