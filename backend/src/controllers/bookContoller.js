import Note from '../models/bookModel.js';

export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content)
      return res.status(400).json({ error: 'Title and content are required' });
    if (title.length < 3)
      return res.status(400).json({ error: 'Title must be at least 3 characters' });
    if (content.length < 3)
      return res.status(400).json({ error: 'Content must be at least 3 characters' });

    const note = await Note.create({ title, content });
    res.status(201).json({ id: note._id, message: 'Note created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getNote = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await Note.findById(id);
    if (!note) return res.status(404).json({ message: 'Note not found' });
    res.status(200).json(note);
  } catch (err) {
    res.status(404).json({ error: 'Note not found' });
  }
};

export const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find().sort({ updatedAt: -1 });
    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const updated = await Note.findByIdAndUpdate(id, { title, content }, { new: true });
    if (!updated) return res.status(404).json({ message: 'Note not found' });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
