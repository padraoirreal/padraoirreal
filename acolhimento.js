const mensagens = [
    "Você não precisa se comparar com tudo o que vê nas telas.",
    "Sua identidade é muito maior do que uma imagem.",
    "Fazer uma pausa nas redes sociais também é uma escolha válida.",
    "Você merece respeito, inclusive de si mesmo.",
    "Uma fotografia não conta toda a história de uma pessoa.",
    "Não existe problema em procurar apoio quando precisar.",
    "Você não precisa atender às expectativas irreais de ninguém.",
    "Seu valor não depende da aprovação das redes sociais."
];

const mensagemAcolhimento = document.getElementById("mensagem-acolhimento");
const botaoMensagem = document.getElementById("nova-mensagem");

if (mensagemAcolhimento && botaoMensagem) {
    botaoMensagem.addEventListener("click", function () {
        const indiceAleatorio = Math.floor(Math.random() * mensagens.length);
        mensagemAcolhimento.textContent = mensagens[indiceAleatorio];
    });
}
