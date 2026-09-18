

const totalTelas = 6;

let telaAtual = 1;


// ========================================
// ELEMENTOS
// ========================================

const contador = document.getElementById("contador");
const barraProgresso = document.getElementById("barraProgresso");
const mensagens = document.querySelectorAll(".mensagem");
let timersMensagens = [];


// ========================================
// MOSTRAR TELA
// ========================================

function mostrarTela(numero) {

    // Impede passar dos limites
    if (numero < 1) {
        numero = 1;
    }

    if (numero > totalTelas) {
        numero = totalTelas;
    }

    telaAtual = numero;


    // Remove a classe "ativa" de todas as telas
    document.querySelectorAll(".tela").forEach(function(tela) {
        tela.classList.remove("ativa");
    });


    // Ativa a tela atual
    const tela = document.getElementById("tela" + telaAtual);

    tela.classList.add("ativa");

    if (telaAtual === 4) {
        revelarMensagens();
    } else {
        resetarMensagens();
    }


    // Atualiza contador
    contador.textContent =
        String(telaAtual).padStart(2, "0") +
        " / " +
        String(totalTelas).padStart(2, "0");


    // Atualiza barra
    const porcentagem =
        (telaAtual / totalTelas) * 100;

    barraProgresso.style.width =
        porcentagem + "%";
}

function resetarMensagens() {
    timersMensagens.forEach(function(timer) {
        clearTimeout(timer);
    });

    timersMensagens = [];

    mensagens.forEach(function(mensagem) {
        mensagem.classList.remove("visivel");
        mensagem.setAttribute("aria-hidden", "true");
    });
}

function revelarMensagens() {
    resetarMensagens();

    mensagens.forEach(function(mensagem, indice) {
        const timer = setTimeout(function() {
            mensagem.classList.add("visivel");
            mensagem.setAttribute("aria-hidden", "false");
        }, 450 + (indice * 900));

        timersMensagens.push(timer);
    });
}


// ========================================
// PRÓXIMA TELA
// ========================================

function proximaTela() {

    if (telaAtual < totalTelas) {
        mostrarTela(telaAtual + 1);
    }

}


// ========================================
// TELA ANTERIOR
// ========================================

function telaAnterior() {

    if (telaAtual > 1) {
        mostrarTela(telaAtual - 1);
    }

}


// ========================================
// TECLADO
// ========================================

document.addEventListener("keydown", function(event) {

    // Seta direita
    if (event.key === "ArrowRight") {
        proximaTela();
    }


    // Seta esquerda
    if (event.key === "ArrowLeft") {
        telaAnterior();
    }


    // Espaço
    if (event.code === "Space") {

        event.preventDefault();

        proximaTela();
    }

});


// ========================================
// INICIALIZAÇÃO
// ========================================

mostrarTela(1);
