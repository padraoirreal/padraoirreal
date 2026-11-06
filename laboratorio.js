const campoImagem = document.getElementById("imagem-upload");
const imagemPreview = document.getElementById("imagem-preview");
const mensagemLaboratorio = document.getElementById("mensagem-laboratorio");
const brilho = document.getElementById("brilho");
const contraste = document.getElementById("contraste");
const saturacao = document.getElementById("saturacao");
const botaoResetar = document.getElementById("resetar-filtros");

if (campoImagem && imagemPreview) {
    let urlImagemAtual = null;

    campoImagem.addEventListener("change", function () {
        const arquivo = this.files && this.files[0];
        if (!arquivo) return;

        if (!arquivo.type.startsWith("image/")) {
            mensagemLaboratorio.textContent = "Selecione um arquivo de imagem válido.";
            this.value = "";
            return;
        }

        if (urlImagemAtual) URL.revokeObjectURL(urlImagemAtual);
        urlImagemAtual = URL.createObjectURL(arquivo);
        imagemPreview.src = urlImagemAtual;
imagemPreview.hidden = false;

const textoPreview = document.getElementById("texto-preview");
if (textoPreview) {
    textoPreview.hidden = true;
}

mensagemLaboratorio.textContent = "Imagem carregada! Agora você pode experimentar os ajustes.";
    });

    function aplicarFiltros() {
        if (!imagemPreview.src) return;
        imagemPreview.style.filter = `brightness(${brilho.value}%) contrast(${contraste.value}%) saturate(${saturacao.value}%)`;
        document.getElementById("valor-brilho").textContent = `${brilho.value}%`;
        document.getElementById("valor-contraste").textContent = `${contraste.value}%`;
        document.getElementById("valor-saturacao").textContent = `${saturacao.value}%`;
    }

    [brilho, contraste, saturacao].forEach(controle => controle.addEventListener("input", aplicarFiltros));

    botaoResetar.addEventListener("click", () => {
        brilho.value = 100;
        contraste.value = 100;
        saturacao.value = 100;
        aplicarFiltros();
        mensagemLaboratorio.textContent = "Ajustes redefinidos.";
    });
}
