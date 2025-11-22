const btn_aside = document.getElementById("btn-aside");
 const aside = document.getElementById("aside");
  btn_aside.addEventListener("click", () => {
    btn_aside.classList.toggle("active");
    aside.classList.toggle("active"); 
});



function criarMensagem(texto, corFundo) {
    const div = document.createElement("div");
    div.style.display = "inline-block";
    div.style.alignSelf = "flex-start";
    div.style.maxWidth = "70%";
    div.style.borderRadius = "10px";
    div.style.background = corFundo;
    div.style.marginTop = "20px";
    div.style.marginLeft = "10px";
    div.style.fontSize = "19px";
    div.style.fontFamily = "Arial, Helvetica, sans-serif";
    div.style.padding = "10px 15px";
    div.style.boxShadow = "0px 2px 6px black";
    div.style.wordBreak = "break-word";
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

    const msgUser = criarMensagem(valor, "lightgray");
    body.appendChild(msgUser);

    input.value = "";

    const carregando = criarMensagem("⌛ Aguardando resposta...", "#d0d0ff");
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
