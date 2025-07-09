import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import NoteList from '../components/NoteList';
import { baseURL } from '../Url';

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [activeUsers, setActiveUsers] = useState(0);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get(`${baseURL}/api/notes`);
        console.log(res);
        setNotes(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchNotes();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">CollabNotes</h1>
        <div className="flex items-center space-x-4">
          <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
            👥 {activeUsers} active
          </span>
          <Link
            to="/create"
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            + New Note
          </Link>
        </div>
      </div>

      <NoteList notes={notes} setNotes={setNotes} />
    </div>
  );
};

export default Home;
