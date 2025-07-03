import React from 'react';
import { Box, Typography, Paper, List, ListItem, ListItemText } from '@mui/material';
import Layout from '../layout/Layout';

const ParentMessages = () => {
  // Mock data - replace with actual API calls
  const messages = [
    { id: 1, from: 'Teacher Smith', subject: 'Progress Update', time: '2 hours ago' },
    { id: 2, from: 'School Admin', subject: 'Event Announcement', time: '1 day ago' },
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

export default ParentMessages;