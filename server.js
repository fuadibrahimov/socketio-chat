const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

// Initialize Express and HTTP server
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files from the "public" directory
app.use(express.static('public'));

// Handle socket connections
io.on('connection', (socket) => {
  console.log('A user connected');

  // Listen for chat messages
  socket.on('chat message', (msg) => {
    console.log(`Message: ${msg}`);
    io.emit('chat message', msg); // Broadcast message to all clients
  });

  // Handle disconnections
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Start the server
server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
    