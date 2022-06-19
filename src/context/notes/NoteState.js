import { React, useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial); // Best Practice: Create a state where there is a possibility of change
  // Fetch Notes
  const getAllNotes = async () => {
    const url = `${host}/api/notes/fetchallnotes/`;
    const response = await fetch(url, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJhMTlkZWExNTc4MGJhNDBmY2FkZTAyIn0sImlhdCI6MTY1NDgzMDk4OH0.rVygaHAP2_Dh7UznTlJLbvtVDVh-0MBKgNtqxNzZ2dE",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    const json = await response.json();
    setNotes(json);
  };
  // Add a note
  const addNote = async (title, description, tag) => {
    //API Call
    const url = `${host}/api/notes/addnote/`;
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJhMTlkZWExNTc4MGJhNDBmY2FkZTAyIn0sImlhdCI6MTY1NDgzMDk4OH0.rVygaHAP2_Dh7UznTlJLbvtVDVh-0MBKgNtqxNzZ2dE",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },

      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    setNotes(notes.concat(json));
  };

  // Delete a note
  const deleteNote = async (id) => {
    // API Call
    const url = `${host}/api/notes/deletenote/${id}/`;
    const response = await fetch(url, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJhMTlkZWExNTc4MGJhNDBmY2FkZTAyIn0sImlhdCI6MTY1NDgzMDk4OH0.rVygaHAP2_Dh7UznTlJLbvtVDVh-0MBKgNtqxNzZ2dE",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };
  // Edit a note
  const editNote = async (id, title, description, tag) => {
    //API Call
    const url = `${host}/api/notes/updatenote/${id}/`;
    const response = await fetch(url, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJhMTlkZWExNTc4MGJhNDBmY2FkZTAyIn0sImlhdCI6MTY1NDgzMDk4OH0.rVygaHAP2_Dh7UznTlJLbvtVDVh-0MBKgNtqxNzZ2dE",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },

      body: JSON.stringify({ title, description, tag }),
    });

    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  };
  return (
    <NoteContext.Provider
      value={{ notes, setNotes, addNote, deleteNote, editNote, getAllNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
