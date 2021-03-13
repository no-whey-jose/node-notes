const yargs = require('yargs');
const notes = require('./notes');
//Customize yargs version
yargs.version('1.1.0');

// add, remove, read, list

// Add command
yargs.command({
  command: 'add',
  describe: 'Add a new note',
  builder: {
    title: {
      describe: 'Note Title',
      demandOption: true,
      type: 'string',
    },
    body: {
      describe: 'Note Body',
      demandOption: true,
      type: 'string',
    }
  },
  handler(argv) {
    notes.addNote(argv.title, argv.body);
  },
});

// Remove command
yargs.command({
  command: 'remove',
  describe: 'Remove a note',
  builder: {
    title: {
      describe: 'Note Title',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    notes.removeNote(argv.title);
  },
});

// Read command
yargs.command({
  command: 'read',
  describe: 'Read out a note',
  builder: {
    title: {
      describe: 'Note Title',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    notes.readNote(argv.title);
  }
});

// List command
yargs.command({
  command: 'list',
  describe: 'Gives a lit of notes',
  handler() {
    notes.listNotes();
  }
})

yargs.parse();