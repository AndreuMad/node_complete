const fs = require('fs');

const fetchNotes = () => {
  try {
    return JSON.parse(fs.readFileSync('notes.json'));
  } catch (error) {
    return [];
  }
};

const saveNotes = (notes) => {
  fs.writeFileSync('notes.json', JSON.stringify(notes));
};

const removeNote = (title) => {
  const notes = fetchNotes();
  const filteredNotes = notes.filter(note => note.title !== title);
  saveNotes(filteredNotes);

  return notes.length !== filteredNotes.length;
};

const getNote = (title) => {
  const notes = fetchNotes();
  const filteredNotes = notes.filter(note => note.title === title);

  return filteredNotes[0];
};

const addNote = (title, body) => {
  const notes = fetchNotes();
  const note = {
    title,
    body
  };

  if ((notes.filter(item => item.title === title)).length === 0) {
    notes.push(note);
    saveNotes(notes);
    return note;
  }
};

module.exports = {
  addNote,
  removeNote,
  getNote
};
