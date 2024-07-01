var input = require('fs').readFileSync('stdin', 'utf8');
var lines = input.split('\n');

const lines1 = lines[0].split(' ')
const n1 = parseFloat(lines1[0])
const n2 = parseFloat(lines1[1])
const n3 = parseFloat(lines1[2])
const n4 = parseFloat(lines1[3])
const n5 = parseFloat(lines[1])

function md (){
    return (((2*n1 + 3*n2 + 4*n3 + n4)/10))
}

var media = parseFloat(md())

function ex (){
    return ((n5 + media)/2)
}

console.log(`Media: ${media.toFixed(1)}`)
if(media >= 7.0){
    console.log(`Aluno aprovado.`)
}else if(media < 5.0){
    console.log(`Aluno reprovado.`)

}if(media >= 5.0 && media <= 6.9){
    console.log(`Aluno em exame.`)
    var notas_exame = parseFloat(n5)
    var media2 = ex()
    console.log(`Nota do exame: ${notas_exame.toFixed(1)}`)
    if(media2 >= 5.0){
        console.log(`Aluno aprovado.`)
    }else{
        console.log(`Aluno reprovado.`)
    }
    console.log(`Media final: ${media2.toFixed(1)}`)
}