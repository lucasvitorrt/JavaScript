var input = require('fs').readFileSync('stdin', 'utf8');
var lines = input.split('\n');

A = parseFloat(lines.shift())
B = parseFloat(lines.shift())
PROD = A * B

console.log(`PROD = ${PROD}`)





