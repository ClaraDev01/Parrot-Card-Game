const imagens = [
    "bobrossparrot.gif",
    "explodyparrot.gif",
    "fiestaparrot.gif",
    "metalparrot.gif",
    "revertitparrot.gif",
    "tripletsparrot.gif",
    "unicornparrot.gif"
];

let numeroCartas = 0;

while (true) {
    numeroCartas = parseInt(prompt("Quantas cartas você quer jogar? (número par de 4 a 14)"));
    
    if (numeroCartas >= 4 && numeroCartas <= 14 && numeroCartas % 2 === 0) {
        break;
    }
    alert("Número inválido! Digite um número par entre 4 e 14.");
}
let imagensSelecionadas = imagens.slice(0, numeroCartas / 2);
let cartasDoJogo = [...imagensSelecionadas, ...imagensSelecionadas];

cartasDoJogo.sort(() => Math.random() - 0.5);

const tabuleiro = document.getElementById("tabuleiro");

cartasDoJogo.forEach((imagem) => {
    const carta = document.createElement("div");
    carta.classList.add("carta");
    carta.dataset.imagem = imagem;

    const imgFrente = document.createElement("img");
    imgFrente.src = `assets/${imagem}`;
    imgFrente.classList.add("frente");

    const imgVerso = document.createElement("img");
    imgVerso.src = "assets/back.png";
    imgVerso.classList.add("verso");

    carta.appendChild(imgVerso);
    carta.appendChild(imgFrente);
    tabuleiro.appendChild(carta);
});

let primeiraCarta = null;
let segundaCarta = null;
let jogadas = 0;
let bloqueado = false;

function virarCarta(carta) {
    if (bloqueado) return;
    if (carta === primeiraCarta) return;
    if (carta.classList.contains("acertada")) return;

    carta.classList.add("aberta");
    jogadas++;

    if (primeiraCarta === null) {
        primeiraCarta = carta;
        return;
    }

    segundaCarta = carta;
    bloqueado = true;

    if (primeiraCarta.dataset.imagem === segundaCarta.dataset.imagem) {
        primeiraCarta.classList.add("acertada");
        segundaCarta.classList.add("acertada");
        primeiraCarta = null;
        segundaCarta = null;
        bloqueado = false;
        verificarVitoria();
    } else {
        setTimeout(() => {
            primeiraCarta.classList.remove("aberta");
            segundaCarta.classList.remove("aberta");
            primeiraCarta = null;
            segundaCarta = null;
            bloqueado = false;
        }, 1000);
    }
}

function verificarVitoria() {
    const cartasAcertadas = document.querySelectorAll(".acertada");
    if (cartasAcertadas.length === numeroCartas) {
        alert(`Você ganhou em ${jogadas} jogadas!`);
    }
}

document.querySelectorAll(".carta").forEach((carta) => {
    carta.addEventListener("click", () => virarCarta(carta));
});