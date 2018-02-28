const fs = require('fs');
const os = require('os');
const yargs = require('yargs');
const _ = require('lodash');

const addNote = require('./notes').addNote;
const removeNote = require('./notes').removeNote;
const getNote = require('./notes').getNote;
const fileAction = require('./playground/user');

const command = yargs.argv._[0];
const titleArgument = {
  describe: 'Title of note',
  demand: true,
  alias: 't'
};
const bodyArgument = {
  describe: 'Body of the note',
  demand: true,
  alias: 't'
};

const arguments = yargs
  .command('add', 'Adding a new note', {
    title: titleArgument,
    body: bodyArgument
  })
  .command('list', 'Listing all nodes')
  .command('read', 'Reading a note', {
    title: titleArgument
  })
  .command('remove', 'Removing a note', {
    title: titleArgument
  })
  .help()
  .argv;

if(command === 'add') {
  const note = addNote(arguments.title, arguments.body);
  if(note) {
    console.log('Note created');
  } else {
    console.log('Note already exists');
  }
} else if (command === 'remove') {
  const noteRemoved = removeNote(arguments.title);
  const message = noteRemoved ? 'Removed' : 'Not found';
  console.log(message);
} else if (command === 'read') {
  const note = getNote(arguments.title);
  const result = note ? note : 'No such note';
  console.log(result);
}

fileAction();

// fs.writeFile('file.txt', `Hello, ${os.userInfo().username}`, (error) => {
//   if(error) {
//     console.log(error);
//     return;
//   }
//
//   console.log('created');
// });

// console.log(_.uniqBy(arr, 'id'));
