const loader = document.getElementById("loader");
const principal = document.querySelector("main");
const caixaErro = document.getElementById("caixaErro");
const textoErro = document.getElementById("textoErro");
const botaoTentar = document.getElementById("botaoTentarDeNovo");
const linkInicio = document.getElementById("linkInicio");

// mostra a imagem girando por cima da página
export function mostrarLoader() {
    loader.classList.remove("some");
}

export function esconderLoader() {
    loader.classList.add("some");
}

// mostra uma mensagem de erro;
// Com uma função em aoTentarDeNovo, mostra o botão "Try again".
// Sem ela, mostra um link para voltar à página inicial.
export function mostrarErro(mensagem, aoTentarDeNovo) {
    textoErro.textContent = mensagem;
    botaoTentar.hidden = !aoTentarDeNovo;
    linkInicio.hidden = Boolean(aoTentarDeNovo);
    botaoTentar.onclick = aoTentarDeNovo || null;

    principal.classList.add("com-erro");
    caixaErro.hidden = false;
}

export function esconderErro() {
    principal.classList.remove("com-erro");
    caixaErro.hidden = true;
}