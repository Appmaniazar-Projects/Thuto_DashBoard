import React, { useState, useEffect } from 'react';
import { Paper, Typography, List, ListItem, ListItemText, ListItemAvatar, Avatar, Divider } from '@mui/material';
import MessageIcon from '@mui/icons-material/Message';
import { adminAPI } from '../../../services/api';

const MessagesPanel = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true);
        const response = await adminAPI.getMessages();
        setMessages(response.data);
      } catch (error) {
        console.error('Failed to fetch messages:', error);
        // Fallback to mock data
        setMessages([
          { id: 1, from: 'Mr. Thompson', student: 'Emma Thompson', time: '2 hours ago', message: 'Question about upcoming field trip' },
          { id: 2, from: 'Mrs. Garcia', student: 'Noah Garcia', time: 'Yesterday', message: 'Request for additional homework support' },
          { id: 3, from: 'Mr. & Mrs. Johnson', student: 'Liam Johnson', time: '2 days ago', message: 'Absence notification for doctor appointment' },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom component="div">
        Recent Messages
      </Typography>
      <Divider sx={{ mb: 2 }} />
      {loading ? (
        <Typography>Loading messages...</Typography>
      ) : (
        <List>
          {messages.map((message) => (
            <ListItem key={message.id} sx={{ alignItems: 'flex-start' }}>
              <ListItemAvatar>
                <Avatar sx={{ width: 32, height: 32 }}>
                  <MessageIcon fontSize="small" />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={`${message.from} (${message.student})`}
                secondary={`${message.time}: ${message.message}`}
                primaryTypographyProps={{ variant: 'body2' }}
                secondaryTypographyProps={{ variant: 'caption' }}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Paper>
  );
};

export default MessagesPanel;