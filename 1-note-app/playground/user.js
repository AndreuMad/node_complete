const fs = require('fs');

const user = {
  name: 'Andrii',
  age: 26
};

function fileAction() {
  fs.writeFileSync('user.json', JSON.stringify(user));
  const result = fs.readFileSync('user.json');
}

module.exports = fileAction;
