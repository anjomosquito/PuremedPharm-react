import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  TextField,
  Button,
  Divider,
} from '@mui/material';
import { Send as SendIcon } from '@mui/icons-material';

// Sample data - replace with actual data from your backend
const sampleMessages = [
  {
    id: 1,
    sender: 'John Doe',
    message: 'Hello, I need information about medicine stock',
    timestamp: '10:30 AM',
    isAdmin: false,
  },
  {
    id: 2,
    sender: 'Admin',
    message: 'Hi John, how can I help you today?',
    timestamp: '10:31 AM',
    isAdmin: true,
  },
  // Add more sample messages as needed
];

export default function ChatManagement() {
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState(sampleMessages);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newMsg = {
        id: messages.length + 1,
        sender: 'Admin',
        message: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isAdmin: true,
      };
      setMessages([...messages, newMsg]);
      setNewMessage('');
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Box sx={{ p: 3, height: 'calc(100vh - 100px)', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h4" gutterBottom>
        Chat Management
      </Typography>
      
      <Paper sx={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column',
        maxHeight: 'calc(100vh - 200px)',
        mb: 2
      }}>
        <List sx={{ 
          flex: 1, 
          overflow: 'auto', 
          padding: 2,
          bgcolor: 'background.paper' 
        }}>
          {messages.map((msg) => (
            <React.Fragment key={msg.id}>
              <ListItem alignItems="flex-start" sx={{
                flexDirection: msg.isAdmin ? 'row-reverse' : 'row',
              }}>
                <ListItemAvatar>
                  <Avatar sx={{ 
                    bgcolor: msg.isAdmin ? 'primary.main' : 'secondary.main',
                  }}>
                    {msg.sender[0]}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={msg.sender}
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {msg.message}
                      </Typography>
                      <Typography
                        component="span"
                        variant="caption"
                        sx={{ display: 'block', mt: 0.5 }}
                      >
                        {msg.timestamp}
                      </Typography>
                    </React.Fragment>
                  }
                  sx={{
                    '& .MuiListItemText-primary': {
                      textAlign: msg.isAdmin ? 'right' : 'left',
                    },
                    '& .MuiListItemText-secondary': {
                      textAlign: msg.isAdmin ? 'right' : 'left',
                    },
                  }}
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          ))}
        </List>
        
        <Box sx={{ 
          p: 2, 
          bgcolor: 'background.paper',
          borderTop: 1,
          borderColor: 'divider',
          display: 'flex',
          gap: 1
        }}>
          <TextField
            fullWidth
            multiline
            maxRows={4}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            variant="outlined"
            size="small"
          />
          <Button
            variant="contained"
            endIcon={<SendIcon />}
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
          >
            Send
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
