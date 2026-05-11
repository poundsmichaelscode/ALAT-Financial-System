import http from 'http';
import { Server } from 'socket.io';
import app from './app.js';
import { connectDB } from './config/db.js';
import { env } from './config/env.js';

const allowedOrigins = [
  env.clientUrl,
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:5175',
  'http://localhost:5176',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:5174',
  'http://127.0.0.1:5175',
  'http://127.0.0.1:5176'
].filter(Boolean);

const server = http.createServer(app);
export const io = new Server(server, { cors: { origin: allowedOrigins, credentials: true } });
io.on('connection', socket => {
  socket.on('join-business', businessId => socket.join(`business:${businessId}`));
});

connectDB()
  .then(() => server.listen(env.port, () => console.log(`API running on port ${env.port}`)))
  .catch(err => { console.error(err); process.exit(1); });
