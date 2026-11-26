// cria um elemento com classes CSS e texto opcionais
export function criarElemento(tag, classes, texto) {
    const elemento = document.createElement(tag);

    if (classes) {
        elemento.className = classes;
    }

    if (texto !== undefined) {
        elemento.textContent = texto;
    }

    return elemento;
}

// "fire" -> "Fire"
export function capitalizar(texto) {
    return texto.charAt(0).toUpperCase() + texto.slice(1);
}

// "inner-focus" -> "Inner Focus"
export function formatarNome(texto) {
    return texto.split(/[-\s]+/).map(capitalizar).join(" ");
}

// "porygon-z" -> "Porygon-Z" (mantém o hífen)
export function formatarNomePokemon(nome) {
    return nome.split("-").map(capitalizar).join("-");
}

// 448 -> "0448"
export function formatarId(id) {
    return String(id).padStart(4, "0");
}