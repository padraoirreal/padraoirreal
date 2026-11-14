const campoImagem = document.getElementById("imagem-upload");
const imagemPreview = document.getElementById("imagem-preview");
const mensagemLaboratorio = document.getElementById("mensagem-laboratorio");
const brilho = document.getElementById("brilho");
const contraste = document.getElementById("contraste");
const saturacao = document.getElementById("saturacao");
const botaoResetar = document.getElementById("resetar-filtros");

if (campoImagem && imagemPreview) {
    let urlImagemAtual = null;

    // Garante transição suave ao mexer nos controles
    imagemPreview.style.transition = "filter 0.15s ease, opacity 0.4s ease";

    campoImagem.addEventListener("change", function () {
        const arquivo = this.files && this.files[0];
        if (!arquivo) return;

        if (!arquivo.type.startsWith("image/")) {
            mensagemLaboratorio.textContent = "Selecione um arquivo de imagem válido (JPG, PNG, WebP).";
            this.value = "";
            return;
        }

        if (urlImagemAtual) URL.revokeObjectURL(urlImagemAtual);
        urlImagemAtual = URL.createObjectURL(arquivo);
        
        imagemPreview.src = urlImagemAtual;
        imagemPreview.hidden = false;
        imagemPreview.style.display = "block"; // Garante que a imagem apareça mesmo se o CSS interferir

        const textoPreview = document.getElementById("texto-preview");
        if (textoPreview) {
            textoPreview.hidden = true;
            textoPreview.style.display = "none";
        }

        // Reseta os filtros visualmente ao carregar uma nova foto
        brilho.value = 100;
        contraste.value = 100;
        saturacao.value = 100;
        aplicarFiltros();

        mensagemLaboratorio.textContent = "Imagem carregada! Experimente os ajustes abaixo.";
    });

    function aplicarFiltros() {
        if (!imagemPreview.src || imagemPreview.hidden) return;
        imagemPreview.style.filter = `brightness(${brilho.value}%) contrast(${contraste.value}%) saturate(${saturacao.value}%)`;
        
        const valBrilho = document.getElementById("valor-brilho");
        const valContraste = document.getElementById("valor-contraste");
        const valSaturacao = document.getElementById("valor-saturacao");

        if (valBrilho) valBrilho.textContent = `${brilho.value}%`;
        if (valContraste) valContraste.textContent = `${contraste.value}%`;
        if (valSaturacao) valSaturacao.textContent = `${saturacao.value}%`;
    }

    [brilho, contraste, saturacao].forEach(controle => {
        if (controle) controle.addEventListener("input", aplicarFiltros);
    });

    if (botaoResetar) {
        botaoResetar.addEventListener("click", () => {
            brilho.value = 100;
            contraste.value = 100;
            saturacao.value = 100;
            aplicarFiltros();
            if (!imagemPreview.hidden) {
                mensagemLaboratorio.textContent = "Ajustes redefinidos para o original.";
            }
        });
    }
}