let activeUsers = {};

const socketHandler = (io) => {
  io.on('connection', (socket) => {
    socket.on('join_note', ({ noteId }) => {
      socket.join(noteId);
      activeUsers[noteId] = (activeUsers[noteId] || 0) + 1;
      io.to(noteId).emit('active_users', activeUsers[noteId]);
    });

    socket.on('note_update', ({ noteId, title, content }) => {
      socket.to(noteId).emit('note_update', { title, content });
    });

    socket.on('disconnecting', () => {
      const rooms = [...socket.rooms];
      rooms.forEach((room) => {
        if (room !== socket.id && activeUsers[room]) {
          activeUsers[room]--;
          if (activeUsers[room] <= 0) delete activeUsers[room];
          socket.to(room).emit('active_users', activeUsers[room]);
        }
      });
    });
  });
};

export default socketHandler;
