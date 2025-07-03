import React, { useState } from 'react';
import { 
  Box, Typography, Paper, List, ListItem, ListItemText, 
  Button, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import Layout from '../layout/Layout';

const AdminMessages = () => {
  const [open, setOpen] = useState(false);
  const [messageData, setMessageData] = useState({
    recipient: '',
    subject: '',
    message: ''
  });

  // Mock data - replace with actual API calls
  const messages = [
    { id: 1, from: 'Teacher Johnson', subject: 'Attendance Report', time: '2 hours ago' },
    { id: 2, from: 'Parent Smith', subject: 'Field Trip Permission', time: '1 day ago' },
  ];

  const handleSendMessage = () => {
    // Implement message sending logic
    console.log('Sending message:', messageData);
    setOpen(false);
    setMessageData({ recipient: '', subject: '', message: '' });
  };

  return (
    <Layout>
      <Box sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4">Messages</Typography>
          <Button variant="contained" onClick={() => setOpen(true)}>
            Send Message
          </Button>
        </Box>

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

        <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Send Message</DialogTitle>
          <DialogContent>
            <FormControl fullWidth sx={{ mt: 2, mb: 2 }}>
              <InputLabel>Recipient Type</InputLabel>
              <Select
                value={messageData.recipient}
                onChange={(e) => setMessageData({ ...messageData, recipient: e.target.value })}
              >
                <MenuItem value="all_teachers">All Teachers</MenuItem>
                <MenuItem value="all_parents">All Parents</MenuItem>
                <MenuItem value="all_students">All Students</MenuItem>
                <MenuItem value="specific">Specific User</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Subject"
              value={messageData.subject}
              onChange={(e) => setMessageData({ ...messageData, subject: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Message"
              value={messageData.message}
              onChange={(e) => setMessageData({ ...messageData, message: e.target.value })}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={handleSendMessage} variant="contained">Send</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Layout>
  );
};

export default AdminMessages;