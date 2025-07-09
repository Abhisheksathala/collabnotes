import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import RichTextEditor from '../components/Editor';
import { io } from 'socket.io-client';
import { baseURL } from '../Url';

const socket = io(baseURL);

const EditNote = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [activeUsers, setActiveUsers] = useState(0);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await axios.get(`${baseURL}/api/notes/${id}`);
        setTitle(res.data.title);
        setContent(res.data.content);
      } catch (err) {
        console.error(err);
      }
    };

    fetchNote();

    socket.emit('join_note', { noteId: id });

    socket.on('note_update', ({ title: updatedTitle, content: updatedContent }) => {
      if (updatedTitle !== undefined) setTitle(updatedTitle);
      if (updatedContent !== undefined) setContent(updatedContent);
    });

    socket.on('active_users', (count) => {
      setActiveUsers(count);
    });

    return () => {
      socket.off('note_update');
      socket.off('active_users');
    };
  }, [id]);

  const handleSave = async () => {
    try {
      await axios.put(`${baseURL}/api/notes/${id}`, {
        title,
        content,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    socket.emit('note_update', {
      noteId: id,
      title: newTitle,
      content, // Keep existing content in the broadcast
    });
  };

  const handleContentChange = (newContent) => {
    setContent(newContent);
    socket.emit('note_update', {
      noteId: id,
      title, // Keep existing title in the broadcast
      content: newContent,
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Edit Note</h1>
        <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
          👥 {activeUsers} collaborators
        </span>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
          <RichTextEditor content={content} onContentChange={handleContentChange} />
        </div>

        <div className="flex space-x-4">
          <button
            onClick={handleSave}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Save Changes
          </button>
          <button
            onClick={() => navigate('/')}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
          >
            Back to Notes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditNote;
