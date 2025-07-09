import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import bookRoutes from './src/routes/bookRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/notes', bookRoutes);

export default app;
