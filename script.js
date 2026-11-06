// QUIZ INTERATIVO — página Desafios
const perguntas = [
    {
        categoria: "LEITURA CRÍTICA",
        pergunta: "Por que é importante questionar imagens muito perfeitas nas redes sociais?",
        alternativas: ["Porque toda imagem é falsa", "Porque imagens podem ter sido selecionadas, editadas ou preparadas", "Porque não devemos olhar fotografias"],
        correta: 1,
        explicacao: "Uma imagem pode mostrar apenas um recorte da realidade e passar por diferentes ajustes."
    },
    {
        categoria: "FERRAMENTAS DIGITAIS",
        pergunta: "O que um filtro digital pode fazer?",
        alternativas: ["Alterar cores, luzes e aparência visual", "Garantir que uma fotografia seja verdadeira", "Mostrar tudo o que aconteceu antes da foto"],
        correta: 0,
        explicacao: "Filtros podem modificar características visuais, mas não revelam o contexto completo da imagem."
    },
    {
        categoria: "REDES SOCIAIS",
        pergunta: "Uma publicação representa a vida inteira de alguém?",
        alternativas: ["Sim, sempre", "Somente quando tem muitas curtidas", "Não. Ela mostra um recorte escolhido para compartilhar"],
        correta: 2,
        explicacao: "Publicações são recortes. Momentos comuns, dificuldades e bastidores podem não aparecer."
    },
    {
        categoria: "AUTOPERCEPÇÃO",
        pergunta: "Qual atitude pode ajudar diante de conteúdos que provocam comparações desconfortáveis?",
        alternativas: ["Continuar olhando mesmo sem se sentir bem", "Fazer uma pausa e conversar com alguém de confiança", "Acreditar que todos vivem como nas fotos"],
        correta: 1,
        explicacao: "Fazer pausas, selecionar conteúdos e buscar apoio são atitudes válidas."
    },
    {
        categoria: "ALFABETIZAÇÃO MIDIÁTICA",
        pergunta: "O que significa desenvolver um olhar crítico para a mídia?",
        alternativas: ["Aceitar toda publicação como verdade", "Compartilhar sem verificar", "Analisar contexto, intenção e possíveis edições"],
        correta: 2,
        explicacao: "O olhar crítico ajuda a interpretar mensagens em vez de aceitá-las automaticamente."
    }
];

let perguntaAtual = 0;
let pontuacao = 0;
let respondeu = false;

const quizContainer = document.getElementById("quiz-container");
if (quizContainer) {
    const numeroPergunta = document.getElementById("numero-pergunta");
    const pontuacaoAtual = document.getElementById("pontuacao-atual");
    const barraProgresso = document.getElementById("barra-progresso");
    const categoriaPergunta = document.getElementById("categoria-pergunta");
    const textoPergunta = document.getElementById("texto-pergunta");
    const alternativasQuiz = document.getElementById("alternativas-quiz");
    const resultadoQuiz = document.getElementById("resultado-quiz");
    const botaoContinuar = document.getElementById("botao-continuar");
    const telaFinalQuiz = document.getElementById("tela-final-quiz");

    function mostrarPergunta() {
        respondeu = false;
        const item = perguntas[perguntaAtual];
        numeroPergunta.textContent = `PERGUNTA ${perguntaAtual + 1} DE ${perguntas.length}`;
        pontuacaoAtual.textContent = `PONTOS: ${pontuacao}`;
        barraProgresso.style.width = `${(perguntaAtual / perguntas.length) * 100}%`;
        categoriaPergunta.textContent = item.categoria;
        textoPergunta.textContent = item.pergunta;
        resultadoQuiz.textContent = "";
        botaoContinuar.hidden = true;
        alternativasQuiz.innerHTML = "";

        item.alternativas.forEach((alternativa, indice) => {
            const botao = document.createElement("button");
            botao.className = "answer-option";
            botao.textContent = alternativa;
            botao.addEventListener("click", () => selecionarResposta(indice, botao));
            alternativasQuiz.appendChild(botao);
        });
    }

    function selecionarResposta(indice, botaoSelecionado) {
        if (respondeu) return;
        respondeu = true;
        const item = perguntas[perguntaAtual];
        const botoes = alternativasQuiz.querySelectorAll("button");
        botoes.forEach((botao, i) => {
            botao.disabled = true;
            if (i === item.correta) botao.classList.add("correct");
        });

        if (indice === item.correta) {
            pontuacao++;
            resultadoQuiz.textContent = `Correto! ${item.explicacao}`;
        } else {
            botaoSelecionado.classList.add("incorrect");
            resultadoQuiz.textContent = `Vamos aprender: ${item.explicacao}`;
        }
        pontuacaoAtual.textContent = `PONTOS: ${pontuacao}`;
        botaoContinuar.hidden = false;
        botaoContinuar.textContent = perguntaAtual === perguntas.length - 1 ? "VER RESULTADO" : "PRÓXIMA PERGUNTA";
    }

    function mostrarResultadoFinal() {
        quizContainer.hidden = true;
        telaFinalQuiz.hidden = false;
        barraProgresso.style.width = "100%";
        document.getElementById("pontuacao-final").textContent = `${pontuacao} de ${perguntas.length}`;
        let mensagem = "Continue praticando seu olhar crítico. Aprender é um processo!";
        if (pontuacao === perguntas.length) mensagem = "Excelente! Você demonstrou um ótimo olhar crítico.";
        else if (pontuacao >= 3) mensagem = "Muito bem! Você já reconhece várias maneiras de analisar conteúdos digitais.";
        document.getElementById("mensagem-final").textContent = mensagem;
    }

    botaoContinuar.addEventListener("click", () => {
        perguntaAtual++;
        if (perguntaAtual < perguntas.length) mostrarPergunta();
        else mostrarResultadoFinal();
    });

    document.getElementById("reiniciar-quiz").addEventListener("click", () => {
        perguntaAtual = 0;
        pontuacao = 0;
        quizContainer.hidden = false;
        telaFinalQuiz.hidden = true;
        mostrarPergunta();
    });

    mostrarPergunta();
}

// CONTROLE DO COMPARADOR — página Antes × Depois
const controleComparacao = document.getElementById("controle-comparacao");
const imagemAlterada = document.getElementById("imagem-alterada");
if (controleComparacao && imagemAlterada) {
    controleComparacao.addEventListener("input", function () {
        const valor = this.value;
        imagemAlterada.style.clipPath = `inset(0 0 0 ${valor}%)`;
        const recipiente = document.querySelector(".comparison-container");
        if (recipiente) recipiente.style.setProperty("--posicao-comparacao", `${valor}%`);
    });
}
