
const form = document.querySelector("form");
const lista = document.getElementById("lista")

let transacoes = JSON.parse(localStorage.getItem("transacoes")) || [];

function adicionar(event) {
    event.preventDefault();
    const valor = parseFloat(document.getElementById("valor").value);
    var valorFormatado = valor.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'});
    const selected = document.getElementById("selected").value;
    const transacao = {valorFormatado, selected};
    transacoes.push(transacao);
    atualizar();
    mostrar();
    form.reset();
}

function mostrar() {
    lista.innerHTML = "";
    transacoes.forEach((transacao, i) => {
        const itemLista = document.createElement("li");
        itemLista.innerHTML = `${transacao.valorFormatado} - ${transacao.selected}  <button class="deletar" data-i="${i}">
        Excluir</button>`;
        lista.appendChild(itemLista);
        if(transacao.selected == "Receita") {
            itemLista.style.color = "green";
        } else {
            itemLista.style.color = "red";
        }
    })
}

function deletar(event) {
    if(event.target.classList.contains("deletar")) {
        const i = event.target.getAttribute("data-i");
        transacoes.splice(i, 1);
        atualizar();
        mostrar();
    }
}

function atualizar() {
    localStorage.setItem("transacoes", JSON.stringify(transacoes));
}

form.addEventListener("submit", adicionar);
lista.addEventListener("click", deletar);
mostrar();

