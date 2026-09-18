

const totalTelas = 9;

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

    if (telaAtual === 6) {
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

// ========================================
// DEMO INTERATIVA
// ========================================

const demoDados = {
    resumo: {
        saudacao: "Visão geral",
        titulo: "Olá, vamos acompanhar?",
        conteudo: `<div class="demo-indicadores"><div><small>Glicemia média</small><strong>112 <em>mg/dL</em></strong></div><div><small>Registros</small><strong>18 <em>esta semana</em></strong></div><div><small>Última medição</small><strong>Hoje <em>08:30</em></strong></div></div><div class="demo-grafico" aria-label="Gráfico ilustrativo da evolução da glicemia"><span class="grafico-linha linha-um"></span><span class="grafico-linha linha-dois"></span><span class="grafico-linha linha-tres"></span><span class="grafico-ponto ponto-um"></span><span class="grafico-ponto ponto-dois"></span><span class="grafico-ponto ponto-tres"></span></div>`
    },
    registro: {
        saudacao: "Novo registro",
        titulo: "O que você quer registrar?",
        conteudo: `<div class="demo-formulario"><label>Glicemia <input value="108" aria-label="Glicemia"></label><label>Horário <input value="08:30" aria-label="Horário"></label><button type="button" class="demo-salvar">Salvar medição</button></div>`
    },
    historico: {
        saudacao: "Histórico",
        titulo: "Seus últimos registros",
        conteudo: `<div class="demo-historico"><div><strong>108 mg/dL</strong><span>Hoje, 08:30</span></div><div><strong>116 mg/dL</strong><span>Ontem, 19:45</span></div><div><strong>102 mg/dL</strong><span>Ontem, 07:20</span></div></div>`
    }
};

document.querySelectorAll(".demo-menu-item").forEach(function(botao) {
    botao.addEventListener("click", function() {
        const dados = demoDados[botao.dataset.demo];
        document.querySelectorAll(".demo-menu-item").forEach(function(item) {
            item.classList.remove("ativo");
        });
        botao.classList.add("ativo");
        document.getElementById("demoSaudacao").textContent = dados.saudacao;
        document.getElementById("demoTitulo").textContent = dados.titulo;
        document.getElementById("demoConteudo").innerHTML = dados.conteudo;
    });
});

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
