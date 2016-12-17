const fs = require('fs');
var x;
async function() {
  x = await fs.readFileAsync('main.js', 'utf-8')
}

console.log(x)
