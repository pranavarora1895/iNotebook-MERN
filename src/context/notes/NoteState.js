import { React, useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const notesInitial = [
    {
      _id: "62a2db4a01ca718fe52760ec",
      user: "62a19dea15780ba40fcade02",
      title: "first note",
      description: "my first test note",
      tag: "test",
      date: "2022-06-10T05:48:58.632Z",
      __v: 0,
    },
    {
      _id: "62a407e2b45b9783c7f8dd67",
      user: "62a19dea15780ba40fcade02",
      title: "Learn FullStack",
      description: "Learn MERN Stack: MongoDB, ExpressJS, ReactJS, NodeJS",
      tag: "coding",
      date: "2022-06-11T03:11:30.077Z",
      __v: 0,
    },
    {
      _id: "62a407e2b45b9783c7f8dd67",
      user: "62a19dea15780ba40fcade02",
      title: "Learn FullStack",
      description: "Learn MERN Stack: MongoDB, ExpressJS, ReactJS, NodeJS",
      tag: "coding",
      date: "2022-06-11T03:11:30.077Z",
      __v: 0,
    },
    {
      _id: "62a407e2b45b9783c7f8dd67",
      user: "62a19dea15780ba40fcade02",
      title: "Learn FullStack",
      description: "Learn MERN Stack: MongoDB, ExpressJS, ReactJS, NodeJS",
      tag: "coding",
      date: "2022-06-11T03:11:30.077Z",
      __v: 0,
    },
    {
      _id: "62a407e2b45b9783c7f8dd67",
      user: "62a19dea15780ba40fcade02",
      title: "Learn FullStack",
      description: "Learn MERN Stack: MongoDB, ExpressJS, ReactJS, NodeJS",
      tag: "coding",
      date: "2022-06-11T03:11:30.077Z",
      __v: 0,
    },
  ];
  const [notes, setNotes] = useState(notesInitial); // Best Practice: Create a state where there is a possibility of change
  return (
    <NoteContext.Provider value={{ notes, setNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
