const btn_aside = document.getElementById("btn-aside");
const aside = document.getElementById("aside");

btn_aside.addEventListener("click", () => {
    btn_aside.classList.toggle("active");
    aside.classList.toggle("active");
});


function digitado() {
    const input = document.getElementById("input");
    const valor = input.value;

    if (valor === "") {
        alert("Você precisa digitar algo antes de enviar😊.");
    } else {
        const mensagem_usuario = document.createElement("div");
        mensagem_usuario.style.display = "inline-block";
        mensagem_usuario.style.alignSelf = "flex-start";
        mensagem_usuario.style.maxWidth = "70%";
        mensagem_usuario.style.borderRadius = "10px";
        mensagem_usuario.style.background = "lightgray";
        mensagem_usuario.style.marginTop = "20px";
        mensagem_usuario.style.marginLeft = "10px"
        mensagem_usuario.style.fontSize = "19px";
        mensagem_usuario.style.fontFamily = "Arial, Helvetica, sans-serif";
        mensagem_usuario.style.padding = "10px 15px";
        mensagem_usuario.style.boxShadow = "0px 2px 6px black";
        mensagem_usuario.style.wordBreak = "break-word";

        mensagem_usuario.textContent = valor;

        const body = document.getElementById("body");
        body.appendChild(mensagem_usuario);

        input.value = "";

    }

}

