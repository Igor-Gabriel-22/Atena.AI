const btn_aside = document.getElementById("btn-aside");
 const aside = document.getElementById("aside");
  btn_aside.addEventListener("click", () => {
    btn_aside.classList.toggle("active");
    aside.classList.toggle("active"); 
});



function criarMensagem(texto, corFundo, lado = "left") {
    const div = document.createElement("div");
    div.style.display = "inline-block";
    div.style.maxWidth = "70%";
    div.style.borderRadius = "10px";
    div.style.background = corFundo;
    div.style.marginTop = "20px";
    div.style.fontSize = "19px";
    div.style.fontFamily = "Arial, Helvetica, sans-serif";
    div.style.padding = "10px 15px";
    div.style.boxShadow = "0px 2px 6px black";
    div.style.wordBreak = "break-word";

    if (lado === "right") {
        div.style.alignSelf = "flex-end";
        div.style.marginRight = "10px";
    } else {
        div.style.alignSelf = "flex-start";
        div.style.marginLeft = "10px";
    }

    div.textContent = texto;
    return div;
}


async function digitado() {
    const input = document.getElementById("input");
    const body = document.getElementById("body");
    const valor = input.value;

    if (valor === "") {
        alert("Você precisa digitar algo 😊");
        return;
    }

    const msgUser = criarMensagem(valor, "#ececec", "left");
    body.appendChild(msgUser);

    input.value = "";

    const carregando = criarMensagem("⌛ Aguardando resposta...", "#e2e2fcff", "right");
    carregando.id = "carregando";
    body.appendChild(carregando);

    const resposta = await fetch("/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pergunta: valor })
    });

    const json = await resposta.json();

    carregando.textContent = json.resposta;
}


const chat1 = document.getElementById("chat1");
const c1 = document.querySelectorAll(".c1");

chat1.addEventListener("click", () =>
     {
    c1.forEach(item => {
        item.style.display =
            item.style.display === "none" || item.style.display === ""
            ? "flex"
            : "none";
    });
});


const chat2 = document.getElementById("chat2");
const c2 = document.querySelectorAll(".c2");

chat2.addEventListener("click", () => {
    c2.forEach(item => {
        item.style.display =
            item.style.display === "none" || item.style.display === ""
            ? "flex"
            : "none";
    });
});


const chat3 = document.getElementById("chat3");
const c3 = document.querySelectorAll(".c3");

chat3.addEventListener("click", () => {
    c3.forEach(item => {
        item.style.display =
            item.style.display === "none" || item.style.display === ""
            ? "flex"
            : "none";
    });
});


const chat4 = document.getElementById("chat4");
const c4 = document.querySelectorAll(".c4");

chat4.addEventListener("click", () => {
    c4.forEach(item => {
        item.style.display =
            item.style.display === "none" || item.style.display === ""
            ? "flex"
            : "none";
    });
});


const chat5 = document.getElementById("chat5");
const c5 = document.querySelectorAll(".c5");

chat5.addEventListener("click", () => {
    c5.forEach(item => {
        item.style.display =
            item.style.display === "none" || item.style.display === ""
            ? "flex"
            : "none";
    });
});

function enviarAtalho(texto) {

    const body = document.getElementById("body");

    const msgUser = criarMensagem(texto, "#ececec", "left");
    body.appendChild(msgUser);

    const carregando = criarMensagem("⌛ Aguardando resposta...", "#e2e2fcff", "right");
    body.appendChild(carregando);

    fetch("/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pergunta: texto })
    })
    .then(res => res.json())
    .then(json => {
        carregando.textContent = json.resposta;
    });
}

document.querySelectorAll(".c1, .c2, .c3, .c4, .c5").forEach(item => {
    item.addEventListener("click", () => {
        enviarAtalho(item.textContent);
    });
});


const btn_apresentacao = document.getElementById("btn-apresentacao");
const apresentacao = document.getElementById("apresentacao");

btn_apresentacao.addEventListener("click", () => {
    apresentacao.style.display = "none";
});