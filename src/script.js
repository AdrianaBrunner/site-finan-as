
const form = document.querySelector("form");
const lista = document.getElementById("lista")

let totalReceitas = 0;
let totalDespesas = 0;
let total = 0;

let receitas = document.querySelector("#receitas")
let despesas = document.querySelector("#despesas")
let valorTotal = document.querySelector("#total")

let pReceitas = document.querySelector("#pReceitas")
let pDespesas = document.querySelector("#pDespesas")
let pTotal = document.querySelector("#pTotal")

let transacoes = JSON.parse(localStorage.getItem("transacoes")) || [];

function adicionar(event) {
    event.preventDefault();
    let valor = parseFloat(document.getElementById("valor").value);
    let valor1 = Number(valor);
    var valorFormatado = valor.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
    const selected = document.getElementById("selected").value;
    const transacao = { valor1, valorFormatado, selected };
    transacoes.push(transacao);


    if (transacao.selected == "Receita") {
        totalReceitas += transacao.valor1
    } else if (transacao.selected == "Despesa") {
        totalDespesas -= transacao.valor1
    }

    total = totalReceitas + totalDespesas

    pReceitas.innerHTML = `R$ ${totalReceitas}`;
    pDespesas.innerHTML = `R$ ${totalDespesas}`
    pTotal.innerHTML = `R$ ${total}`

    valorTotal.appendChild(pTotal);
    despesas.appendChild(pDespesas);
    receitas.appendChild(pReceitas)

    atualizar();
    mostrar();
    form.reset();
}

function mostrar() {
    lista.innerHTML = "";

    transacoes.forEach((transacao, i) => {
        const itemLista = document.createElement("li");
        itemLista.innerHTML = `${transacao.valorFormatado} - ${transacao.selected}  
        <button class="deletar" data-i="${i}">
        Excluir</button>`;
        lista.appendChild(itemLista);

        if (transacao.selected == "Receita") {
            itemLista.style.color = "green";
        } else {
            itemLista.style.color = "red";
        }
    })

}

function deletar(event) {
    if (event.target.classList.contains("deletar")) {
        const i = event.target.getAttribute("data-i");
        if (transacoes[i].selected == "Receita") {
            totalReceitas -= transacoes[i].valor1
            pReceitas.innerHTML = `R$ ${totalReceitas}`;
        }
        if (transacoes[i].selected == "Despesa") {
            totalDespesas += transacoes[i].valor1
            pDespesas.innerHTML = `R$ ${totalDespesas}`;
        };
        total = totalReceitas + totalDespesas
        pTotal.innerHTML = `R$ ${total}`
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

