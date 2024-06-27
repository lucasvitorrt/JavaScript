var line1 = lines[0].split(' ')
var line2 = lines[1].split(' ')

cod_1 = line1.shift()
qtd_1 = parseInt(line1.shift())
vlr_1 = parseFloat(line1.shift())

cod_2 = line2.shift()
qtd_2 = parseInt(line2.shift())
vlr_2 = parseFloat(line2.shift())

total = ((qtd_1*vlr_1) + (qtd_2*vlr_2)).toFixed(2)

console.log(`VALOR A PAGAR: R$ ${total}`)