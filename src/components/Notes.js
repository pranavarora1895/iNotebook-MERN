import { React, useContext } from "react";
import NoteContext from "../context/notes/NoteContext";
import NoteItem from "./NoteItem";

const Notes = () => {
  const context = useContext(NoteContext);
  const { notes, setNotes } = context;
  return (
    <>
      <h2>Your Notes!!</h2>
      <div className="row my-3">
        {notes.map((note) => {
          return <NoteItem note={note} />;
        })}
      </div>
    </>
  );
};

export default Notes;
