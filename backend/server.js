const express = require('express');
const cors = require('cors');
const app = express();
const port = 3532;
const { Server } = require('socket.io');
const http = require('http');

require('dotenv').config();

app.use(cors({
  origin: 'http://localhost:4200',
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: '*'
}));
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// Route registration
app.use('/api/peeps', require('./routes/peeps'));
app.use('/api/user_files', require('./routes/userFiles'));
app.use('/api/offers', require('./routes/offers'));
app.use('/api/bids', require('./routes/bids'));
app.use('/api/forums', require('./routes/forums'));
// app.use('/api/messages', require('./routes/messages'));
app.use('/api/token', require('./routes/token'));


// const { registerUser,
//   sendPrivateMessage,
//   disconnectUser } = require('./controllers/messageController');
//
// function setupSocket(io) {
//   io.on('connection', (socket) => {
//     console.log('Socket connected:', socket.id);
//
//     socket.on('register-user', (userId) => {
//       registerUser(socket, userId);
//     });
//
//     socket.on('send-private-message', (data) => {
//       sendPrivateMessage(io, data);
//     });
//
//     socket.on('disconnect', () => {
//       disconnectUser(socket);
//     });
//   });
// }
// setupSocket(io);

// io.on('connection', (socket) => {
//   console.log('Socket connected:', socket.id);
// });

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

