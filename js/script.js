const maiusculas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const minusculas = 'abcdefghijklmnopqrstuvwxyz'
const numeros = '0123456789'
const simbolos = '!@#$%&*'

let chars = ''

// // ------------------ FORÇA DA SENHA ------------------
// valida o tamanho da senha (4 < x < 20)
function validarTamanho() {
    const input = document.querySelector('#tamanho')

    const valor = Number(input.value)
    
    if (isNaN(valor) || valor < 4 || valor > 20) {
        input.classList.add('erro')
        return false
    } else {
        input.classList.remove('erro')
    }

    return valor
}

// pegar todos os iunputs checks e ver quais estão selecionados
function verificarChecks() {
    // pegando todos os inputs do tipo checkbox
    const chekcs = document.querySelectorAll('.opcao input[type="checkbox"]')

    // criando a variável quantidade (vai ser quantos estão ativados)
    let quantidade = 0

    // para cada input tipo check verificar se está ativado
    chekcs.forEach(c => {
        if (c.checked) {
            quantidade++
        }
    })

    if (quantidade == 0) {
        return false
    }

    // aqui a quantidade ja é quantos estão ativados
    return quantidade
}

// calcular força
function calcularForca(checks, tam) {
    // calculando a força
    const forcaChecks = (checks * 17)
    const forcaTam = ((tam - 4) * 2)

    const forca = forcaChecks + forcaTam

    return forca
}

// atualiza a barra de força
function atualizarForca() {
    // pegar a barra de força
    const forca = document.querySelector('.forca')

    // pegar quantos checks estão ativos
    const checks = verificarChecks() == false ? 0 : verificarChecks()

    // pegar o tamanho da senha
    const tam = validarTamanho() == false ? 4 : validarTamanho()

    // pegando o valor da força
    const valorForca = calcularForca(checks, tam)

    // atualizando o tamanho da força
    forca.style.width = valorForca + '%'

    // atualizando a cor da barra de força
    atualizarCor(valorForca)

    console.log(forca.style.width)
}

// ajustar cor da barra de força
function atualizarCor(width) {
    // pegar a barra de força
    const forca = document.querySelector('.forca')

    if (width < 40) {
        forca.style.background = 'var(--vermelho)'
    } else if ( width < 80 ) {
        forca.style.background = 'var(--amarelo)'
    } else {
        forca.style.background = 'var(--verde)'
    }
}

// função para iniciar a barra de força
function iniciarForca() {
    const forca = document.querySelector('.forca')
    forca.style.width = '0%'
}
iniciarForca()


// ------------------ SENHA ------------------
// função para incluir maiusculas na senha
function incluirMaiusculas() {
    const incluir = document.querySelector('#maiusculas')
    if (incluir.checked) {
        return chars += maiusculas
    }
}

// função para incluir minusculas na senha
function incluirMinusculas() {
    const incluir = document.querySelector('#minusculas')
    if (incluir.checked) {
        return chars += minusculas
    } 
}

// função para incluir numeros na senha
function incluirNumeros() {
    const incluir = document.querySelector('#numeros')
    if (incluir.checked) {
        return chars += numeros
    }
}

// função para incluir simbolos na senha
function incluirSimbolos() {
    const incluir = document.querySelector('#simbolos')
    if (incluir.checked) {
        return chars += simbolos
    }
}

// função para incluir todas as caracteristicas da senha
function incluir() {
    incluirMaiusculas()
    incluirMinusculas()
    incluirNumeros()
    incluirSimbolos()
}


// REFAZER: mesmo com o tamanho da senha inválido gera a senha do tamanho que está no input
// função que gera a senha
function gerarSenha() {
    const tamanho = document.querySelector('#tamanho').value

    if (validarTamanho(tamanho) && verificarChecks() != false) {
        incluir()
        const senha = chance.string({
            length: tamanho,
            pool: chars
        })

        chars = ''
        console.log(senha)
        mostrarSenha(senha)
        return senha
    } else {
        abrirPopup()
    }
}

function mostrarSenha(senhaGerada) {
    campoSenha = document.querySelector('#senha-criada')
    campoSenha.classList.add('habilitada')
    senha = document.querySelector('.senha')
    senha.textContent = senhaGerada
}

function copiarSenha() {
    senha = document.querySelector('.senha')
    icone = document.querySelector('.icone')

    navigator.clipboard.writeText(senha.textContent)
        .then(() => {
            icone.name = 'checkmark-outline'

            setTimeout(() => {
                icone.name = 'copy-outline'
            }, 1000)
        })
    
}

function abrirPopup() {
    const tamanho = document.querySelector('#tamanho').value
    if (!validarTamanho(tamanho)) {
        document.querySelector('.popup-content p').textContent = 'O tamanho da senha deve ser maior que 4 e menor que 20.'
        document.querySelector('#popup').style.display = 'flex'
    } else {
        document.querySelector('.popup-content p').textContent = 'Pelo menos uma opção de senha deve estar acionada.'
        document.querySelector('#popup').style.display = 'flex'
    }
}

function fecharPopup() {
    document.querySelector('#popup').style.display = 'none'
}

// document.querySelectorAll('.switch').forEach(el => {
//     el.addEventListener('click', () => {
//         atualizarForca()
//     })
// })