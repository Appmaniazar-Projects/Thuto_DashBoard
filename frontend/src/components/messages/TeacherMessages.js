import React from 'react';
import { Box, Typography, Paper, List, ListItem, ListItemText } from '@mui/material';
import Layout from '../layout/Layout';

const TeacherMessages = () => {
  // Mock data - replace with actual API calls
  const messages = [
    { id: 1, from: 'Admin', subject: 'Staff Meeting Reminder', time: '1 hour ago' },
    { id: 2, from: 'Parent Johnson', subject: 'Question about homework', time: '3 hours ago' },
  ];

  return (
    <Layout>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Messages
        </Typography>
        
        <Paper sx={{ p: 3 }}>
          <List>
            {messages.map((message) => (
              <ListItem key={message.id} divider>
                <ListItemText
                  primary={message.subject}
                  secondary={`From: ${message.from} - ${message.time}`}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Box>
    </Layout>
  );
};

export default TeacherMessages;