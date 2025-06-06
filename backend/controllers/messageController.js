const userSocketMap = {}; // Optional: share or inject this in real apps

function registerUser(socket, userId) {
  userSocketMap[userId] = socket.id;
  console.log(`User ${userId} registered with socket ${socket.id}`);
}

function sendPrivateMessage(io, { toUserId, message, from }) {
  const receiverSocketId = userSocketMap[toUserId];
  if (receiverSocketId) {
    io.to(receiverSocketId).emit('receive-private-message', { message, from });
  } else {
    console.log(`User ${toUserId} is not online`);
  }
}

function disconnectUser(socket) {
  const userId = Object.keys(userSocketMap).find(uid => userSocketMap[uid] === socket.id);
  if (userId) {
    delete userSocketMap[userId];
    console.log(`User ${userId} disconnected`);
  }
}

module.exports = {
  registerUser,
  sendPrivateMessage,
  disconnectUser,
  userSocketMap // export if needed globally
};
