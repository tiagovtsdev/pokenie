import { criarCard } from "../components/cards.js";
import { mostrarLoader, esconderLoader, mostrarErro, esconderErro } from "../components/interface.js";
import { criarElemento } from "../utils/formatacao.js";
import { filtrarPokemons, piscarErro } from "../utils/pesquisa.js";

const POKEMONS_POR_PAGINA = 10;
const PONTOS_VISIVEIS = 7; // com muitas páginas, só alguns pontinhos aparecem
const ESPERA_DIGITACAO = 300; // milissegundos de espera depois de digitar, antes de pesquisar

// carregar: função assíncrona que devolve a lista (id e nome) e mostra a tela de carregamento
// preparar: função assíncrona opcional que recebe os pokémon da página e devolve os dados completos para os cards (na home, busca os tipos na PokéAPI)
// lerAgora: função opcional que devolve a lista atual na hora (usada nos favoritos)
// mensagemSemItens: texto mostrado quando a lista está vazia
export function iniciarPaginaDeLista(opcoes) {
    const container = document.getElementById("listaDePokemons");
    const campoPesquisa = document.getElementById("pesquisaPokemon");
    const barraPesquisa = document.querySelector(".barra-de-pesquisa");
    const paginacao = document.getElementById("paginacao");
    const botaoVoltar = document.getElementById("botaoVoltar");
    const botaoProximo = document.getElementById("botaoProximo");
    const pontos = document.getElementById("paginacaoPontos");

    let todos = [];       // tudo o que a página pode mostrar
    let filtrados = [];   // resultado da pesquisa
    let paginaAtual = 0;  // começa em 0
    let numeroDoDesenho = 0; // identifica o desenho mais recente (ignora respostas atrasadas)
    let relogioPesquisa = null;

    function totalDePaginas() {
        return Math.max(1, Math.ceil(filtrados.length / POKEMONS_POR_PAGINA));
    }

    // mostra no máximo PONTOS_VISIVEIS pontinhos, sempre em volta da página atual
    function desenharPontos() {
        const total = totalDePaginas();
        const quantidade = Math.min(total, PONTOS_VISIVEIS);
        const primeiro = Math.min(Math.max(0, paginaAtual - Math.floor(quantidade / 2)), total - quantidade);

        pontos.replaceChildren();
        pontos.setAttribute("aria-label", "Page " + (paginaAtual + 1) + " of " + total);

        for (let i = 0; i < quantidade; i++) {
            const indice = primeiro + i;
            pontos.appendChild(criarElemento("span", indice === paginaAtual ? "ponto ativo" : "ponto"));
        }
    }

    function atualizarPaginacao() {
        paginacao.hidden = filtrados.length === 0;
        botaoVoltar.disabled = paginaAtual === 0;
        botaoProximo.disabled = paginaAtual >= totalDePaginas() - 1;
        desenharPontos();
    }

    function mostrarMensagemVazia() {
        // lista vazia: caixa com o ícone de alerta, a frase e só o botão "Go back"
        if (todos.length === 0) {
            mostrarErro(opcoes.mensagemSemItens);
            return;
        }

        container.appendChild(criarElemento("p", "mensagem-vazia", "No Pokémon found."));
    }

    // desenha os cards da página atual
    async function desenharPagina(comAnimacao) {
        const meuNumero = ++numeroDoDesenho;

        container.replaceChildren();
        esconderErro();

        if (filtrados.length === 0) {
            mostrarMensagemVazia();
            atualizarPaginacao();
            return;
        }

        const inicio = paginaAtual * POKEMONS_POR_PAGINA;
        let pagina = filtrados.slice(inicio, inicio + POKEMONS_POR_PAGINA);

        // home: busca os dados completos da página na PokéAPI
        if (opcoes.preparar) {
            mostrarLoader();

            try {
                pagina = await opcoes.preparar(pagina);
            } catch (erro) {
                esconderLoader();

                if (meuNumero === numeroDoDesenho) {
                    mostrarErro("We couldn't load the Pokémon. Please try again.", function () {
                        desenharPagina(comAnimacao);
                    });
                }
                return;
            }

            esconderLoader();

            // enquanto esperava, o usuário pediu outra página ou outra pesquisa
            if (meuNumero !== numeroDoDesenho) {
                return;
            }
        }

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

    // aplica o texto da pesquisa e volta para a primeira página
    function pesquisar() {
        filtrados = filtrarPokemons(todos, campoPesquisa.value);
        paginaAtual = 0;
        desenharPagina(true);
    }

    // chamada depois que um favorito é adicionado ou removido
    function aoMudarFavorito() {
        // na home os cards já se atualizam sozinhos; Só a página de favoritos precisa redesenhar
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

    // pesquisa enquanto digita
    campoPesquisa.addEventListener("input", function () {
        clearTimeout(relogioPesquisa);
        relogioPesquisa = setTimeout(pesquisar, ESPERA_DIGITACAO);
    });

    // o vermelho só aparece ao apertar Enter quando nenhum Pokémon corresponde ao texto
    campoPesquisa.addEventListener("keydown", function (evento) {
        if (evento.key !== "Enter") {
            return;
        }

        clearTimeout(relogioPesquisa);
        pesquisar();

        if (campoPesquisa.value.trim() !== "" && filtrados.length === 0) {
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