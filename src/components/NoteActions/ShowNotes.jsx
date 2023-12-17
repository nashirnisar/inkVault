import React, { useEffect, useState } from "react";
import { db } from "../../firebaseConfig";
import NotesCard from "./NotesCard";
import { MainLoader, toastNotify } from "../../Helper";

import { useNavigate } from "react-router-dom";
import { FaCirclePlus } from "react-icons/fa6";

const ShowNotes = () => {
  const [notes, setNotes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const notesPerPage = 6;
  const lastIndex = currentPage * notesPerPage;
  const firstIndex = lastIndex - notesPerPage;

  const npage = Math.ceil(notes.length / notesPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);
  const navigate = useNavigate();

  const getData = async () => {
    try {
      const snapshot = await db
        .collection("notes")
        .orderBy("timestamp", "desc")
        .get();

      const notesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        data: {
          title: doc.data().title,
          tagline: doc.data().tagline,
          body: doc.data().body,
          pinned: doc.data().pinned || false,
        },
      }));

      setNotes(notesData);
      setLoading(false);
    } catch (error) {
      toastNotify("Error fetching notes: " + error.message, "error");
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const sortedNotes = [...notes].sort((a, b) => (b.data.pinned ? 1 : -1));
  const sortedRecords = sortedNotes.slice(firstIndex, lastIndex);

  const prevPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const changeCPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const nextPage = () => {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {loading ? (
        <div>
          <MainLoader />
        </div>
      ) : (
        <div className="flex-grow">
          {sortedRecords.length === 0 ? (
            navigate("/addNote")
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {sortedRecords.map(
                ({ id, data: { title, tagline, body, pinned } }) => (
                  <NotesCard
                    key={id}
                    id={id}
                    title={title}
                    tagline={tagline}
                    body={body}
                    pinned={pinned}
                    getData={getData}
                  />
                )
              )}
            </div>
          )}
          <nav className="mt-4 pb-4 flex justify-center items-center">
            <button
              className="cursor-pointer px-4 py-2 bg-[#990011] text-white rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-800"
              onClick={prevPage}
            >
              Prev
            </button>
            {numbers.map((n, i) => (
              <button
                key={i}
                className={`mx-2 ${
                  currentPage === n
                    ? "bg-light-blue-300 text-white font-bold"
                    : "text-blue-500"
                } px-2 py-1 cursor-pointer`}
                onClick={() => changeCPage(n)}
              >
                {n}
              </button>
            ))}
            <button
              className="cursor-pointer px-4 py-2 bg-[#990011] text-white rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-800"
              onClick={nextPage}
            >
              Next
            </button>
            {sortedRecords.length > 0 && (
              <button
                className="cursor-pointer px-2 py-1 rounded-full fixed bottom-14 right-14"
                onClick={() => {
                  navigate("/addNote");
                }}
              >
                <FaCirclePlus className="text-[#990011] text-lg h-8 w-8 sm:h-6 sm:w-6" />
              </button>
            )}
          </nav>
        </div>
      )}
    </div>
  );
};

export default ShowNotes;
