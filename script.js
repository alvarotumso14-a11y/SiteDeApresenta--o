

const totalTelas = 6;

let telaAtual = 1;


// ========================================
// ELEMENTOS
// ========================================

const contador = document.getElementById("contador");
const barraProgresso = document.getElementById("barraProgresso");


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
