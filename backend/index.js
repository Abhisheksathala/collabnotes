import http from 'http';
import { Server } from 'socket.io';
import app from './app.js';
import connectDb from './src/database/Indexdb.js';
import socketHandler from './socket.js';

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT'],
  },
});

connectDb()
  .then(() => {
    socketHandler(io);

    server.listen(process.env.PORT || 5000, () => {
      console.log(`Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
