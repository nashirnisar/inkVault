import React, { useState } from "react";

export default function Modal({
  isOpen,
  onClose,
  title: initialTitle,
  tagline: initialTagline,
  body: initialBody,
  onSave,
}) {
  const [title, setTitle] = useState(initialTitle);
  const [tagline, setTagline] = useState(initialTagline);
  const [body, setBody] = useState(initialBody);

  const handleSave = () => {
    onSave(title, tagline, body);
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center">
        <div
          onClick={onClose}
          className="overlay absolute inset-0 bg-gray-800 opacity-50 pointer-events-auto"
        ></div>
        <div className="modal-content bg-white p-4 rounded-lg shadow-md max-w-md w-full relative z-10">
          <h2 className="text-2xl font-bold mb-4">Edit Note</h2>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded p-2 mb-4"
          />
          <label>Tagline:</label>
          <input
            type="text"
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
            className="w-full border rounded p-2 mb-4"
          />
          <label>Body:</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-full border rounded p-2 mb-4"
            rows="4"
          />
          <div className="flex justify-between">
            <button
              className="save-modal bg-[#990011] text-white p-2 rounded-lg hover:bg-red-500"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              className="close-modal bg-[#990011] text-white p-2 rounded-lg hover:bg-red-500"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
