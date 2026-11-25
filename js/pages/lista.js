import { criarCard } from "../components/cards.js";
import { mostrarLoader, esconderLoader, mostrarErro, esconderErro } from "../components/interface.js";
import { criarElemento } from "../utils/formatacao.js";
import { filtrarPokemons, piscarErro } from "../utils/pesquisa.js";

const POKEMONS_POR_PAGINA = 10;

// carregar: função assíncrona que devolve a lista (mostra a tela de carregamento)
// lerAgora: função opcional que devolve a lista atual na hora
// mensagemSemItens: texto mostrado quando a lista está vazia
export function iniciarPaginaDeLista(opcoes) {
    const container = document.getElementById("listaDePokemons");
    const campoPesquisa = document.getElementById("pesquisaPokemon");
    const barraPesquisa = document.querySelector(".barra-de-pesquisa");
    const paginacao = document.getElementById("paginacao");
    const botaoVoltar = document.getElementById("botaoVoltar");
    const botaoProximo = document.getElementById("botaoProximo");
    const pontos = document.getElementById("paginacaoPontos");

    let todos = []; // tudo o que a página pode mostrar
    let filtrados = []; // resultado da pesquisa
    let paginaAtual = 0; // começa em 0

    function totalDePaginas() {
        return Math.max(1, Math.ceil(filtrados.length / POKEMONS_POR_PAGINA));
    }

    function desenharPontos() {
        pontos.replaceChildren();

        for (let i = 0; i < totalDePaginas(); i++) {
            const ponto = criarElemento("span", i === paginaAtual ? "ponto ativo" : "ponto");
            pontos.appendChild(ponto);
        }
    }

    function atualizarPaginacao() {
        paginacao.hidden = filtrados.length === 0;
        botaoVoltar.disabled = paginaAtual === 0;
        botaoProximo.disabled = paginaAtual >= totalDePaginas() - 1;
        desenharPontos();
    }

    function mostrarMensagemVazia() {
        // lista vazia: caixa com o ícone de alerta, a frase e o botão de "go back"
        if (todos.length === 0) {
            mostrarErro(opcoes.mensagemSemItens);
            return;
        }

        container.appendChild(criarElemento("p", "mensagem-vazia", "No Pokémon found."));
    }

    // desenha os cards da página atual
    function desenharPagina(comAnimacao) {
        container.replaceChildren();
        esconderErro();

        if (filtrados.length === 0) {
            mostrarMensagemVazia();
            atualizarPaginacao();
            return;
        }

        const inicio = paginaAtual * POKEMONS_POR_PAGINA;
        const pagina = filtrados.slice(inicio, inicio + POKEMONS_POR_PAGINA);

        pagina.forEach(function (pokemon, indice) {
            const card = criarCard(pokemon, aoMudarFavorito);

            if (comAnimacao) {
                card.classList.add("entrada");
                card.style.animationDelay = indice * 60 + "ms";
            }

            container.appendChild(card);
        });

        atualizarPaginacao();
    }

    // aplica o texto da pesquisa e volta para a primeira pagina
    function pesquisar() {
        filtrados = filtrarPokemons(todos, campoPesquisa.value);
        paginaAtual = 0;
        desenharPagina(true);
    }

    // Chamada depois que um favorito é adicionado ou removido
    function aoMudarFavorito() {
        // na home os cards já se atualizam sozinhos, só pagina de favs precisa redesenhar
        if (!opcoes.lerAgora) {
            return;
        }

        todos = opcoes.lerAgora();

        filtrados = filtrarPokemons(todos, campoPesquisa.value);
        paginaAtual = Math.min(paginaAtual, totalDePaginas() - 1);
        desenharPagina(false);
    }


    // carrega os dados e cuida dos estados de carregamento e de erro
    async function carregarDados() {
        esconderErro();
        mostrarLoader();

        try {
            todos = await opcoes.carregar();
        } catch (erro) {
            esconderLoader();
            mostrarErro("We couldn't load the Pokémon. Please try again.", carregarDados);
            return;
        }

        esconderLoader();
        pesquisar();
    }

    campoPesquisa.addEventListener("input", pesquisar);


    // o pisca-pisca vermelho só vai aparecer quando ao apertar o Enter
    campoPesquisa.addEventListener("keydown", function (evento) {
        if (evento.key === "Enter" && campoPesquisa.value.trim() !== "" && filtrados.length === 0) {
            piscarErro(barraPesquisa);
        }
    });

    botaoVoltar.addEventListener("click", function () {
        paginaAtual--;
        desenharPagina(true);
    });

    botaoProximo.addEventListener("click", function () {
        paginaAtual++;
        desenharPagina(true);
    });

    carregarDados();
}