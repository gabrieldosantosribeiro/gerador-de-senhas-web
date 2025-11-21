const maiusculas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const minusculas = 'abcdefghijklmnopqrstuvwxyz'
const numeros = '0123456789'
const simbolos = '!@#$%&*'

let senha = ''

function atualizarForca() {
    // pegando a barra de força
    let forca = document.querySelector('.forca')

    // pegar quais checkbox estao ativas
    let selecionados = document.querySelectorAll('input[type="checkbox"]:checked').length;

    // alterar o width de acordo com a quantidade
    forca.style.width = `${selecionados * 25}%`
}

function incluirMaiusculas() {
    const incluir = document.querySelector('#maiusculas')
    if (incluir.checked) {
        return senha += maiusculas
    }
}

function incluirMinusculas() {
    const incluir = document.querySelector('#minusculas')
    if (incluir.checked) {
        return senha += minusculas
    } 
}

function incluirNumeros() {
    const incluir = document.querySelector('#numeros')
    if (incluir.checked) {
        return senha += numeros
    }
}

function incluirSimbolos() {
    const incluir = document.querySelector('#simbolos')
    if (incluir.checked) {
        return senha += simbolos
    }
}

function incluir() {
    incluirMaiusculas()
    incluirMinusculas()
    incluirNumeros()
    incluirSimbolos()
}

function gerarSenha() {
    const tamanho = document.querySelector('#tamanho').value
    incluir()
    console.log(senha)
    senha = ''
}

document.querySelectorAll('.switch').forEach(el => {
    el.addEventListener('click', () => {
        atualizarForca()
    })
})