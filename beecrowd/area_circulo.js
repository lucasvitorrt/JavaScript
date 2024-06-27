var input = require('fs').readFileSync('stdin', 'utf8');
var lines = input.split('\n');

var  n = 3.14159
raio = parseFloat(lines.shift())
area = (n * (raio**2)).toFixed(4)

console.log(`A=${area}`)
