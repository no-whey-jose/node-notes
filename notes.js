const fs = require('fs');
const chalk = require('chalk');

const readNote = (title) => {
  const notes = loadNotes();

  const readNote = notes.find((note) => note.title === title);
  console.log(readNote)
  if (readNote) {
    console.log(`${chalk.yellow.inverse(readNote.title)}:`, chalk.yellow(readNote.body));
  } else {
    console.log(chalk.red.inverse('No such note with title', title));
  }
};

const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicatNote = notes.find(note => note.title === title);

  if(!duplicatNote){
    notes.push({
      title: title,
      body: body,
    });
  
    saveNotes(notes);
    console.log(chalk.green.inverse('New Note Added'));
  } else {
    console.log(chalk.red.inverse('Note title already exists'));
  }

}

const removeNote = (title) => {
  const notes = loadNotes();

  const notesToSave = notes.filter(note => note.title !== title);
  if (notesToSave.length < notes.length) {
    saveNotes(notesToSave);
    console.log(chalk.green.inverse('Removed note titled', title));
  } else {
    console.log(chalk.red.inverse(`No note with title ${title} was found.`));
  }
}

const listNotes = () => {
  const notes = loadNotes();

  notes.map(note => console.log(chalk.yellow.inverse(note.title)));
}

const loadNotes = () => {
  try {
    const data =  fs.readFileSync('notes.json').toString();
    return JSON.parse(data);
  } catch (e) {
    return [];
  }
}

const saveNotes = (notes) => {
  fs.writeFileSync('notes.json', JSON.stringify(notes));
}

module.exports = {
  readNote,
  listNotes,
  addNote,
  removeNote,
}