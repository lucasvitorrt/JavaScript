var input = require('fs').readFileSync('stdin', 'utf8');
var lines = input.split('\n');

//salario

numero_func = parseInt(lines.shift())
horas_trabalhadas = parseInt(lines.shift())
valor_hora = parseFloat(lines.shift())

salario = (horas_trabalhadas*valor_hora).toFixed(2)

console.log(`NUMBER = ${numero_func}\nSALARY = U$ ${salario}`)

//salario com bonus

nome_func = lines.shift()
salario = parseFloat(lines.shift())
vendas = parseFloat(lines.shift())

salario = (salario + (vendas*0.15)).toFixed(2)

console.log(`TOTAL = R$ ${salario}`)
