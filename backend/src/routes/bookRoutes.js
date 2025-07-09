import express from 'express';
import { createNote, getNote, updateNote, getAllNotes } from '../controllers/bookContoller.js';

const bookRouter = express.Router();

bookRouter.post('/cratenotes', createNote);
bookRouter.get('/', getAllNotes);
bookRouter.get('/:id', getNote);
bookRouter.put('/:id', updateNote);

export default bookRouter;
