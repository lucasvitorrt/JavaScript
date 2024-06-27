var input = require('fs').readFileSync('stdin', 'utf8');
var lines = input.split('\n');

//media 1

A = parseFloat(lines.shift())
B = parseFloat(lines.shift())
MEDIA = (((3.5*A) +  (7.5*B))/11).toFixed(5)

console.log(`MEDIA = ${MEDIA}`)

//media 2

A = parseFloat(lines.shift())
B = parseFloat(lines.shift())
C = parseFloat(lines.shift())
MEDIA = (((2*A) +  (3*B) + (5*C))/10).toFixed(1)

console.log(`MEDIA = ${MEDIA}`)



