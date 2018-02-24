const fs = require('fs');
const os = require('os');
const _ = require('lodash');

const arr = [{ id: 1 }, { id: 2 }, { id: 1 }]

// fs.writeFile('file.txt', `Hello, ${os.userInfo().username}`, (error) => {
//   if(error) {
//     console.log(error);
//     return;
//   }
//
//   console.log('created');
// });

console.log(_.uniqBy(arr, 'id'));
