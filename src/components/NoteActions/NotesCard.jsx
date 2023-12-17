import React, { useEffect, useState } from "react";
import { MdDeleteForever, MdEditSquare } from "react-icons/md";
import { VscPinned } from "react-icons/vsc";
import { TbPinnedFilled } from "react-icons/tb";

import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import Modal from "../Modal/Modal";
import { toastNotify } from "../../Helper";

const NotesCard = ({
  id,
  title,
  tagline,
  body,
  getData,
  pinned: initialPinned,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedNote, setEditedNote] = useState({
    title,
    tagline,
    body,
  });
  const [pinned, setPinned] = useState(initialPinned);
  const [initialRender, setInitialRender] = useState(true);

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, "notes", id));
      toastNotify("Note deleted successfully!");
      getData();
    } catch (error) {
      toastNotify("Error deleting note: " + error.message, "error");
    }
  };

  const handleSaveEdit = async (newTitle, newTagline, newBody) => {
    const updatedNote = {
      title: newTitle,
      tagline: newTagline,
      body: newBody,
      pinned: pinned,
    };

    try {
      // Update the document with the updatedNote data
      await updateDoc(doc(db, "notes", id), updatedNote);
      if (!initialRender) {
        // Avoid showing the toast notification on initial render
        toastNotify("Note edited successfully!");
      }
      getData();
      setEditedNote(updatedNote);
      setIsEditing(false);
    } catch (error) {
      toastNotify("Error editing note: " + error.message, "error");
    }
  };

  const handlePinToggle = () => {
    setPinned((prevPinned) => !prevPinned);
  };

  useEffect(() => {
    if (!initialRender && pinned !== editedNote.pinned) {
      const saveEditTimeout = setTimeout(() => {
        handleSaveEdit(editedNote.title, editedNote.tagline, editedNote.body);
      }, 0);

      return () => clearTimeout(saveEditTimeout); // Clearing the timeout on component unmount or state change
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pinned, editedNote]);

  useEffect(() => {
    // After the first render, setting the initialRender flag to false
    setInitialRender(false);
  }, []);

  return (
    <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-[#FCF6F5] dark:border-[#000000]">
      <div>
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-black flex justify-between">
          <div>
            {isEditing ? (
              <input
                type="text"
                value={editedNote.title}
                onChange={(e) =>
                  setEditedNote({ ...editedNote, title: e.target.value })
                }
              />
            ) : (
              title
            )}
          </div>
          <div>
            {pinned ? (
              <TbPinnedFilled
                className="cursor-pointer"
                onClick={() => handlePinToggle()}
              />
            ) : (
              <VscPinned
                className="cursor-pointer"
                onClick={() => handlePinToggle()}
              />
            )}
          </div>
        </h5>
      </div>
      <p className="mb-3 font-normal text-lg  text-black dark:text-black">
        {isEditing ? (
          <input
            type="text"
            value={editedNote.tagline}
            onChange={(e) =>
              setEditedNote({ ...editedNote, tagline: e.target.value })
            }
          />
        ) : (
          tagline
        )}
      </p>
      <p className="mb-3 font-normal text-sm text-black dark:text-black">
        {isEditing ? (
          <textarea
            value={editedNote.body}
            onChange={(e) =>
              setEditedNote({ ...editedNote, body: e.target.value })
            }
          />
        ) : (
          body
        )}
      </p>
      <div className="flex justify-between">
        <MdDeleteForever
          className="dark:text-black h-10 w-8 cursor-pointer"
          onClick={() => handleDelete()}
        />

        {isEditing ? (
          <>
            <button onClick={handleSaveEdit}>Save</button>
          </>
        ) : (
          <MdEditSquare
            className="dark:text-black h-10 w-8 cursor-pointer"
            onClick={() => setIsEditing(true)}
          />
        )}

        <Modal
          isOpen={isEditing}
          onClose={() => setIsEditing(false)}
          title={editedNote.title}
          tagline={editedNote.tagline}
          body={editedNote.body}
          onSave={handleSaveEdit}
        />
      </div>
    </div>
  );
};

export default NotesCard;
