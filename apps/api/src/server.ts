import http from 'http';
import { Server } from 'socket.io';
import app from './app.js';
import { connectDB } from './config/db.js';
import { env } from './config/env.js';

const server = http.createServer(app);
export const io = new Server(server, { cors: { origin: env.clientUrl, credentials: true } });
io.on('connection', socket => {
  socket.on('join-business', businessId => socket.join(`business:${businessId}`));
});

connectDB().then(() => server.listen(env.port, () => console.log(`API running on port ${env.port}`))).catch(err => { console.error(err); process.exit(1); });
