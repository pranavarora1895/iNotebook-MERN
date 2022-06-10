const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");
const Notes = require("../models/Notes");
// ROUTE 1: Get all the notes: GET "/api/notes/fetchallnotes". Login required.
router.get("/fetchallnotes", fetchUser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error!!");
  }
});
// ROUTE 2: Add a new note: POST "/api/notes/addnote". Login required.
router.post(
  "/addnote",
  fetchUser,
  [
    body("title", "Title should be atleast 3 characters long.").isLength({
      min: 3,
    }),
    body(
      "description",
      "Description should atleast 5 characters long."
    ).isLength({
      min: 5,
    }),
  ], // Express Validator package used
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      // If there are errors, return Bad Request and errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error!!");
    }
  }
);

// ROUTE 3: Update an existing note: PUT "/api/notes/updatenote". Login required.
router.put("/updatenote/:id", fetchUser, async (req, res) => {
  const { title, description, tag } = req.body;
  try {
    // Create a new note object
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }
    // Find a new note to be updated and update it
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed!!");
    }

    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json(note);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error!!");
  }
});

// ROUTE 4: Delete an existing note: DELETE "/api/notes/deletenote". Login required.
router.delete("/deletenote/:id", fetchUser, async (req, res) => {
  try {
    // Find a new note to be deleted and delete it
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }
    // Allow delete only if params.id === user.id from the fetchUser
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed!!");
    }

    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({ note, success: "Note Deleted Successfully!!" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error!!");
  }
});

module.exports = router;
