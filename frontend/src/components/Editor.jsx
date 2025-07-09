import React, { useState, useEffect } from 'react';
import { Editor, EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import 'draft-js/dist/Draft.css';

const RichTextEditor = ({ content, onContentChange }) => {
  const [editorState, setEditorState] = useState(() => {
    return content
      ? EditorState.createWithContent(convertFromRaw(JSON.parse(content)))
      : EditorState.createEmpty();
  });

  useEffect(() => {
    if (content) {
      setEditorState(EditorState.createWithContent(convertFromRaw(JSON.parse(content))));
    }
  }, [content]);

  const handleChange = (newState) => {
    setEditorState(newState);
    const content = JSON.stringify(convertToRaw(newState.getCurrentContent()));
    onContentChange(content);
  };

  return (
    <div className="border rounded-lg p-4 min-h-[300px] bg-white">
      <Editor
        editorState={editorState}
        onChange={handleChange}
        placeholder="Start writing your note..."
      />
    </div>
  );
};

export default RichTextEditor;
