import React from 'react';
import { Box, Typography, Paper, List, ListItem, ListItemText } from '@mui/material';
import Layout from '../layout/Layout';

const TeacherCalendar = () => {
  // Mock data - replace with actual API calls
  const events = [
    { id: 1, title: 'Grade 8 Math Class', date: '2024-03-20', time: '09:00' },
    { id: 2, title: 'Parent-Teacher Conference', date: '2024-03-22', time: '14:00' },
    { id: 3, title: 'Staff Meeting', date: '2024-03-25', time: '15:30' },
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

export default TeacherCalendar;