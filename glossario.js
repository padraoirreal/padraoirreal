const campoPesquisa = document.getElementById("pesquisa-glossario");
const termos = document.querySelectorAll(".glossary-item");
const mensagemPesquisa = document.getElementById("mensagem-pesquisa");

if (campoPesquisa && mensagemPesquisa) {
    campoPesquisa.addEventListener("input", function () {
        const pesquisa = campoPesquisa.value.toLocaleLowerCase("pt-BR").trim();
        let resultados = 0;

        termos.forEach(termo => {
            const conteudo = termo.textContent.toLocaleLowerCase("pt-BR");
            const corresponde = conteudo.includes(pesquisa);
            
            // Gerencia visibilidade e compatibilidade com grid/flex
            if (corresponde) {
                termo.style.display = "block";
                termo.hidden = false;
                resultados++;
            } else {
                termo.style.display = "none";
                termo.hidden = true;
            }
        });

        if (!pesquisa) mensagemPesquisa.textContent = "";
        else if (resultados === 0) mensagemPesquisa.textContent = "Nenhum termo encontrado. Tente outra palavra.";
        else mensagemPesquisa.textContent = `${resultados} termo(s) encontrado(s).`;
    });
}