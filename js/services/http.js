// Tudo o que fala com a internet passa por aqui (fetch + async/await);
// Métodos HTTP:
//   GET    = ler dados            (a PokéAPI só aceita este)
//   POST   = criar um dado novo
//   PUT    = substituir um dado que já existe
//   DELETE = apagar um dado
// A função requisitar() sabe fazer os quatro, mas a PokéAPI é somente leitura;
// Então no projeto ela usa apenas o GET; Os outros três ficam na API de favoritos (favoritosApi.js)

const TEMPO_LIMITE = 10000; // milissegundos

let chamadas = 0;

// coloque ?simularErro=1 no endereço da página para a PRIMEIRA chamada falhar,
// assim dá para ver a mensagem de erro e o botão "Try again".
function deveSimularErro() {
    const pediuErro = new URLSearchParams(window.location.search).get("simularErro") === "1";
    return pediuErro && chamadas === 1;
}

// faz a requisição e devolve o JSON da resposta,
// se o servidor responder com erro (404, 500...) ou a internet cair, mandará um erro
export async function requisitar(metodo, url, corpo) {
    chamadas++;

    if (deveSimularErro()) {
        throw new Error("Simulated network error");
    }

    // cancela a requisição se ela demorar demais
    const controle = new AbortController();
    const relogio = setTimeout(function () {
        controle.abort();
    }, TEMPO_LIMITE);

    const opcoes = {
        method: metodo,
        signal: controle.signal,
        headers: { "Accept": "application/json" }
    };

    // post e put mandam um corpo em JSON
    if (corpo !== undefined) {
        opcoes.headers["Content-Type"] = "application/json";
        opcoes.body = JSON.stringify(corpo);
    }

    try {
        const resposta = await fetch(url, opcoes);

        // fetch só dá erro se a rede cair, códigos 404/500 precisamos conferir na mão
        if (!resposta.ok) {
            const erro = new Error("HTTP error " + resposta.status);
            erro.status = resposta.status;
            throw erro;
        }

        // 204 = deu certo, mas sem conteúdo (comum no delete)
        if (resposta.status === 204) {
            return null;
        }

        return await resposta.json();
    } finally {
        clearTimeout(relogio);
    }
}

export function get(url) {
    return requisitar("GET", url);
}

export function post(url, corpo) {
    return requisitar("POST", url, corpo);
}

export function put(url, corpo) {
    return requisitar("PUT", url, corpo);
}

export function apagar(url) {
    return requisitar("DELETE", url);
}