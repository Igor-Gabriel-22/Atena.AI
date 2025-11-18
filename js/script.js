const btn_aside = document.getElementById("btn-aside");
const aside = document.getElementById("aside");

btn_aside.addEventListener("click", () =>  {
    btn_aside.classList.toggle("active");
    aside.classList.toggle("active");
});


function digitado() {
    const input = document.getElementById("input");
    const valor = input.value;

    const mensagem_usuario = document.createElement("div");
    mensagem_usuario.style.width = "10%";
    mensagem_usuario.style.height = "10%";
    mensagem_usuario.style.background = "lightgreen";
    mensagem_usuario.style.borderRadius = "10%";

    mensagem_usuario.value = valor.value;
}

