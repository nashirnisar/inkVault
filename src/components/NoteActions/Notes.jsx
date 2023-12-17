import React, { useState } from "react";
import { inputHelper, toastNotify } from "../../Helper";
import firebase from "firebase/compat/app";
import { db } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import paperbgd from "../../assets/paper-background.jpg";

const Notes = () => {
  const [userInput, setUserInput] = useState({
    title: "",
    tagline: "",
    body: "",
    pinned: false,
  });
  const navigate = useNavigate();

  const handleUserInput = (e) => {
    const tempData = inputHelper(e, userInput);
    setUserInput(tempData);
  };

  const addNote = async (e) => {
    e.preventDefault();

    try {
      const docRef = await db.collection("notes").add({
        title: userInput.title,
        tagline: userInput.tagline,
        body: userInput.body,
        pinned: userInput.pinned,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });

      const id = docRef.id;

      // Clearing input fields after adding the note
      setUserInput({
        title: "",
        tagline: "",
        body: "",
        pinned: false,
      });

      toastNotify("Note Added Successfully!", "success");
      // getData();
      navigate("/");
    } catch (error) {
      toastNotify("Error adding note: " + error.message, "error");
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${paperbgd})`,
      }}
    >
      <Header />
      <div className="pb-4">
        <form className="max-w-md mx-auto mt-8 bg-white p-8 rounded shadow-md">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={userInput.title}
            onChange={handleUserInput}
            className="w-full border rounded p-2 mb-4"
            required
          />
          <input
            type="text"
            name="tagline"
            placeholder="Tagline"
            value={userInput.tagline}
            onChange={handleUserInput}
            className="w-full border rounded p-2 mb-4"
            required
          />
          <textarea
            name="body"
            placeholder="Body"
            value={userInput.body}
            onChange={handleUserInput}
            className="w-full border rounded p-2 mb-4"
            rows="4"
            required
          />

          <button
            type="submit"
            onClick={addNote}
            className="w-full bg-[#990011] text-white p-2 rounded-lg hover:bg-red-500"
          >
            Add Note
          </button>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default Notes;
