let saldo = document.getElementById("saldo");
let receitas = document.getElementById("receitas");
let despesas = document.getElementById("despesas");
let transacoes = [];

function atualizar(item){

}

const adicionar = document.getElementById("adicionar");
adicionar.addEventListener('click', ()=>{    
    let nome = document.getElementById("nome").value;
    let valor = document.getElementById("valor").value;


    let transacao = novaTransacao(nome, valor)
    AddTransacao(transacao)
    atualizar(valor);
    InsertTransacoes(transacoes);
})
function AddTransacao(transacao){
    transacoes.push(transacao);
    
}


function novaTransacao(nome, valor){
    let transacao = {};
    transacao.Id = Math.floor(Math.random()*19 + 1);
    transacao.nome = nome;
    transacao.valor = valor;

    return transacao;
}
    

function InsertTransacoes(transacoes){
    let negativo = document.getElementById("transacoes-negativas");
    let positivo = document.getElementById("transacoes-positivas");
    negativo.innerText = '';
    positivo.innerText = '';
    for(let i = 0; i < transacoes.length; i++){
        let newDiv = document.createElement("div");
        let newPN = document.createElement("p");
        let newPV = document.createElement("p");
        let textNome = document.createTextNode(`${transacoes[i].nome}`);
        let textValor = document.createTextNode(`${transacoes[i].valor}`);
        newPN.appendChild(textNome)
        newPV.appendChild(textValor)

        newDiv.classList.add('card')
        if(transacoes[i].valor < 0){
                negativo.appendChild(newDiv)
                newDiv.appendChild(newPN)
                newDiv.appendChild(newPV)
            }else{
                positivo.appendChild(newDiv)
                newDiv.appendChild(newPN)
                newDiv.appendChild(newPV)
            }
        }
    }
atualizar()