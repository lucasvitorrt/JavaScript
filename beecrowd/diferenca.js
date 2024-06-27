var input = require('fs').readFileSync('stdin', 'utf8');
var lines = input.split('\n');

A = parseInt(lines.shift())
B = parseInt(lines.shift())
C = parseInt(lines.shift())
D = parseInt(lines.shift())

DIFERENCA = (A * B - C * D)

console.log(`DIFERENCA = ${DIFERENCA}`)





