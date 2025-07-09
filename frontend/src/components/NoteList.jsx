import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { baseURL } from '../Url';

const NoteList = ({ notes, setNotes }) => {
  const fetchNotes = async () => {
    try {
      const res = await axios.get(`${baseURL}/api/notes`);
      setNotes(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-4">
      {notes.map((note) => (
        <div key={note._id} className="p-4 border rounded-lg bg-white shadow-sm">
          <Link to={`/edit/${note._id}`} className="block">
            <h3 className="text-lg font-medium text-indigo-600">{note.title}</h3>
            <p className="text-sm text-gray-500">
              Last updated: {new Date(note.updatedAt).toLocaleString()}
            </p>
          </Link>
          <button className="mt-2 text-sm text-red-500 hover:text-red-700">Delete</button>
        </div>
      ))}
    </div>
  );
};

export default NoteList;
